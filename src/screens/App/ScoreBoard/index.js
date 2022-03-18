/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import styles from './styles';
import GameTime from '../../../assets/icons/gameTime.svg';
import Raquet from '../../../assets/icons/raquet.svg';
import RotateAnimation from '../../../assets/lottie/rotate.json';
import LoadingAnimation from '../../../assets/lottie/loading.json';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {database, auth} from '../../../service/firebase';
import {
  checkGameShouldRotate,
  handleSaqueSide,
  handleSide,
  saveSumula,
  updateGameData,
  updateScore,
  updateTimeConfig,
} from '../../../utils/HandleGame';
import renderMenu from './components/renderMenu';
import renderModal from './components/renderModal';
import LottieView from 'lottie-react-native';
import pauseModal from './components/pauseModal';
import expediteModal from './components/expediteModal';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as ScoreBoardActions} from '../../../store/ducks/scoreBoard';
dayjs.extend(duration);
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const ScoreBoard = ({navigation}) => {
  const [timeConfig, setTimeConfig] = useState({
    gameTime: null,
    totalGameTime: null,
  });
  const [modalisVisible, setModalIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const [gameData, setGameData] = useState(null);
  const [game, setGame] = useState(null);
  const [pointId, setPointId] = useState(1);
  const [isFinishedGame, setIsFinishedGame] = useState(false);
  const [pauseModalIsVisible, setPauseModalIsVisible] = useState(false);
  const [pauseBetweenGames, setPauseBetweenGames] = useState(false);
  const [pauseBetweenGamesNumber, setPauseBetweenGamesNumber] = useState(false);
  const [pauseNumber, setPauseNumber] = useState(false);
  const [technicalBreak, setTechnicalBreak] = useState(0);
  const [healthCare, setHealthCare] = useState(0);
  const [showTechnicalBreak, setShowTechnicalBreak] = useState(0);
  const [showHealthCare, setShowHealthCare] = useState(0);
  const [saqueSettings, setSaqueSettings] = useState({
    countSaque: 1,
    saquePlayerCount: 1,
    saqueSide: 'left',
    saqueTeamSide: 'top',
  });
  const [loadingData, setLoadingData] = useState(false);
  const [isBestOfTwo, setIsBestOfTwo] = useState(false);
  const [isChangingGame, setIsChangingGame] = useState(false);
  const [isExpediteSystem, setIsExpediteSystem] = useState(false);
  const [isAbleExpediteSystem, setIsAbleExpediteSystem] = useState(true);
  const [showExpediteModal, setShowExpediteModal] = useState(false);
  const dispatch = useDispatch();
  const {leftTeamScore, rightTeamScore, gameId, alteringNames, playersName} =
    useSelector(({scoreBoard}) => scoreBoard);
  const {currentUser} = auth;

  //load all data from the database once
  useEffect(async () => {
    setLoadingData(true);
    StatusBar?.setHidden(true);

    const response = await database
      .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
      .once('value', data => {
        setGameData(data.val());
        const gameTimeFromBD = dayjs(data?.val()?.gameTime, 'mm:ss');
        const gameTimeConfig = dayjs.duration({
          hour: gameTimeFromBD.hour(),
          minute: gameTimeFromBD.minute(),
          seconds: gameTimeFromBD.second(),
        });

        const totalGameTimeFromBD = dayjs(
          data?.val()?.totalGameTime,
          'HH:mm:ss',
        );
        const totalGameTimeConfig = dayjs.duration({
          hour: totalGameTimeFromBD.hour(),
          minute: totalGameTimeFromBD.minute(),
          seconds: totalGameTimeFromBD.second(),
        });
        setTimeConfig({
          gameTime: gameTimeConfig,
          totalGameTime: totalGameTimeConfig,
        });

        const leftPlayers = data?.val()?.leftPlayers;
        delete leftPlayers.finalGame;
        delete leftPlayers.finalScore;

        const rightPlayers = data?.val()?.rightPlayers;
        delete rightPlayers.finalGame;
        delete rightPlayers.finalScore;

        dispatch(
          ScoreBoardActions.setPlayersName({
            left: leftPlayers,
            right: rightPlayers,
          }),
        );

        setIsExpediteSystem(data?.val()?.expediteSystem);
        setPauseBetweenGamesNumber(data?.val()?.pause);
        setPauseNumber(data?.val()?.pause);
        setTechnicalBreak(data?.val()?.technicalInterval);
        setHealthCare(data?.val()?.medicalAssistence);
        setGame(data?.val()?.game);
        dispatch(
          ScoreBoardActions.setRightScore(
            data?.val()?.rightPlayers?.finalScore,
          ),
        );
        dispatch(
          ScoreBoardActions.setLeftScore(data?.val()?.leftPlayers?.finalScore),
        );
        setSaqueSettings({
          countSaque: data?.val()?.saqueSettings?.countSaque,
          saqueSide: data?.val()?.saqueSettings?.saqueSide,
          saqueTeamSide: data?.val()?.saqueSettings?.saqueTeamSide,
          saquePlayerCount: data?.val()?.saqueSettings?.saquePlayerCount,
        });
      });

    if (response) {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    setIsPaused(alteringNames);
  }, [alteringNames]);

  //set best of two
  useEffect(() => {
    if (
      rightTeamScore === Number(gameData?.stopOn) - 1 &&
      leftTeamScore === Number(gameData?.stopOn) - 1
    ) {
      return setIsBestOfTwo(true);
    }
  }, [pointId, isBestOfTwo]);

  //set pause between games
  useEffect(() => {
    if (gameData && pauseBetweenGames) {
      if (pauseBetweenGamesNumber === 1) {
        setPauseBetweenGames(false);
        setPauseBetweenGamesNumber(pauseNumber);
      } else {
        setTimeout(() => {
          setPauseBetweenGamesNumber(pauseBetweenGamesNumber - 1);
        }, 1000);
      }
    }
  }, [pauseBetweenGames, pauseBetweenGamesNumber]);

  //check if the ended
  useEffect(() => {
    let gameDataOfThisGame;
    database
      .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
      .on('value', snapshot => {
        gameDataOfThisGame = snapshot.val();
      });
    if (
      Number(gameDataOfThisGame?.rightPlayers?.finalGame) ===
        Number(gameData?.bestOf) ||
      Number(gameDataOfThisGame?.leftPlayers?.finalGame) ===
        Number(gameData?.bestOf)
    ) {
      setPauseBetweenGames(false);
      setIsPaused(true);
      setIsFinishedGame(true);
      setModalIsVisible(true);
    }
  }, [game]);

  //update the game time
  useEffect(() => {
    if (gameData) {
      if (
        !loadingData &&
        gameData &&
        !isChangingGame &&
        !pauseBetweenGames &&
        !isPaused &&
        !isFinishedGame
      ) {
        setTimeout(() => {
          setTimeConfig({
            gameTime: timeConfig?.gameTime?.add(1, 'seconds'),
            totalGameTime: timeConfig?.totalGameTime?.add(1, 'seconds'),
          });
        }, 1000);
        setIsChangingGame(false);
        updateTimeConfig({gameId, timeConfig});
        if (!isExpediteSystem) {
          checkAndStartExpediteSystem(false);
        }
      }
    }
  }, [
    timeConfig,
    isChangingGame,
    loadingData,
    gameData,
    isPaused,
    pauseBetweenGames,
    isExpediteSystem,
  ]);

  useEffect(async () => {
    await updateGameData({
      data: {
        expediteSystem: isExpediteSystem,
      },
      gameId,
    });
  }, [isExpediteSystem]);

  //check if is able to start expedite system
  useEffect(() => {
    if (leftTeamScore >= 9 && rightTeamScore >= 9) {
      setIsAbleExpediteSystem(false);
    } else {
      setIsAbleExpediteSystem(true);
    }
  }, [leftTeamScore, rightTeamScore]);

  //update health care time
  useEffect(async () => {
    if (pauseModalIsVisible && showHealthCare) {
      if (healthCare === 1) {
        setPauseModalIsVisible(false);
        setShowHealthCare(false);
        setIsPaused(false);
      }
      if (healthCare > 0) {
        setTimeout(() => {
          setHealthCare(healthCare - 1);
        }, 1000);
        await updateGameData({
          data: {
            medicalAssistence: healthCare,
            usedMedicalAssistence:
              gameData?.totalMedicalAssistence - healthCare,
          },
          gameId,
        });
      }
    }
  }, [pauseModalIsVisible, showHealthCare, healthCare]);

  //update technical break time
  useEffect(async () => {
    if (pauseModalIsVisible && showTechnicalBreak) {
      if (technicalBreak === 1) {
        setPauseModalIsVisible(false);
        setShowTechnicalBreak(false);
        setIsPaused(false);
      }
      if (technicalBreak > 0) {
        setTimeout(() => {
          setTechnicalBreak(technicalBreak - 1);
        }, 1000);
        await updateGameData({
          data: {
            technicalInterval: technicalBreak,
            usedThecnicalInterval:
              gameData?.totalThecnicalInterval - technicalBreak,
          },
          gameId,
        });
      }
    }
  }, [pauseModalIsVisible, showTechnicalBreak, technicalBreak]);

  //update start side
  useEffect(() => {
    if (gameData?.gameType !== 'single' && gameData?.startSide === 'right') {
      setSaqueSettings({...saqueSettings, saqueTeamSide: 'bottom'});
    }
    if (gameData?.gameType === 'single') {
      setSaqueSettings({...saqueSettings, saqueTeamSide: 'bottom'});
    }
  }, [gameData?.startSide]);

  //update dimensions
  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      setIsPortrait(height >= width);
    });
  }, []);

  //check if it is portrait
  useEffect(() => {
    if (isPortrait) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  }, [isPortrait]);

  const checkAndStartExpediteSystem = isFromTheBothPlayers => {
    const time = dayjs(timeConfig.gameTime.format('mm:ss'), 'mm:ss');
    const tenMinutes = dayjs('10:00', 'mm:ss');

    if (time.isAfter(tenMinutes) || isFromTheBothPlayers) {
      if (leftTeamScore <= 9 && rightTeamScore <= 9) {
        setIsExpediteSystem(true);
        setShowExpediteModal(true);
      } else {
        Alert.alert('Ação não permitida', 'Cada jogador já atingiu 9 pontos');
      }
    }
  };

  const resetTimer = () => {
    setIsChangingGame(true);
    setTimeout(() => {
      setTimeConfig({
        ...timeConfig,
        gameTime: dayjs.duration({hour: 0, minute: 0, seconds: 0}),
      });
      setIsChangingGame(false);
      updateTimeConfig({gameId, timeConfig});
    }, 2000);
  };

  const handlePoints = (team, type) => {
    if (isPaused || isChangingGame || isFinishedGame) {
      return false;
    }
    setPointId(pointId + 1);
    const operatorValue = type === 'add' ? +1 : -1;
    if (team === 'left') {
      if (leftTeamScore > 0 || type === 'add') {
        handleSaqueSide({
          type,
          setSaqueSettings,
          saqueSettings,
          gameId,
          gameData,
          isExpediteSystem,
        });
        const newScore = leftTeamScore + operatorValue;
        dispatch(ScoreBoardActions.setLeftScore(newScore));
        updateScore({team, score: newScore, gameData, gameId});
        handleSide({
          newScore,
          side: team,
          leftTeamScore,
          rightTeamScore,
          isBestOfTwo,
          setIsBestOfTwo,
          gameData,
          setLoadingData,
          game,
          setGame,
          setIsChangingGame,
          gameId,
          timeConfig,
          resetTimer,
          setPauseBetweenGames,
          setIsExpediteSystem,
          isExpediteSystem,
          dispatch,
          saqueSettings,
          setSaqueSettings,
        });
        return saveSumula({
          leftScore: newScore,
          rightScore: rightTeamScore,
          time: timeConfig?.totalGameTime,
          game,
          gameId,
          pointId,
        });
      }
      return null;
    }
    if (rightTeamScore > 0 || type === 'add') {
      handleSaqueSide({
        type,
        setSaqueSettings,
        saqueSettings,
        gameId,
        gameData,
        isExpediteSystem,
      });
      const newScore = rightTeamScore + operatorValue;
      dispatch(ScoreBoardActions.setRightScore(newScore));
      updateScore({team, score: newScore, gameData, gameId});
      handleSide({
        newScore,
        side: team,
        leftTeamScore,
        rightTeamScore,
        isBestOfTwo,
        setIsBestOfTwo,
        gameData,
        setLoadingData,
        game,
        setGame,
        setIsChangingGame,
        gameId,
        timeConfig,
        resetTimer,
        setPauseBetweenGames,
        setIsExpediteSystem,
        isExpediteSystem,
        dispatch,
        saqueSettings,
        setSaqueSettings,
      });
      return saveSumula({
        leftScore: leftTeamScore,
        rightScore: newScore,
        time: timeConfig?.totalGameTime,
        game,
        gameId,
        pointId,
      });
    }
    return null;
  };

  const renderRotate = () => {
    return (
      <View style={styles.lottieContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            height: 300,
          }}>
          <LottieView
            source={loadingData ? LoadingAnimation : RotateAnimation}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.rotateText}>
          {loadingData ? 'Carregando' : 'Rotacione o seu dispositivo'}
        </Text>
      </View>
    );
  };

  const renderScore = team => {
    const {saqueSide, saqueTeamSide} = saqueSettings;
    let topSide;

    let bottomSide;

    if (gameData?.gameType === 'single') {
      bottomSide =
        saqueSide === team ||
        (saqueSide?.length === 0 && gameData?.startSide === team);
    } else {
      topSide =
        saqueSide === team ||
        (saqueSide?.length === 0 && gameData?.startSide === team);
      bottomSide =
        saqueSide === team ||
        (saqueSide?.length === 0 && gameData?.startSide === team);
    }

    return (
      <View style={styles.numberContainer}>
        <View style={styles.topRaquetContainer}>
          {topSide && saqueTeamSide === 'top' && <Raquet />}
        </View>
        <TouchableOpacity
          style={styles.addPoint}
          onPress={() => {
            handlePoints(team, 'add');
          }}
        />
        <TouchableOpacity
          style={styles.removePoint}
          onPress={() => {
            handlePoints(team, 'remove');
          }}
        />
        <Text style={styles.scoreNumber} numberOfLines={1}>
          {team === 'right' ? rightTeamScore : leftTeamScore}
        </Text>
        <View style={styles.bottomRaquetContainer}>
          {bottomSide && saqueTeamSide === 'bottom' && <Raquet />}
        </View>
      </View>
    );
  };

  const handleRender = () => {
    if (pauseBetweenGames) {
      return (
        <View style={styles.pauseContainer}>
          <Text style={styles.pauseCounter}>{pauseBetweenGamesNumber}</Text>
          <Text style={styles.pauseLabel}>Pausa entre os games</Text>
        </View>
      );
    }
    if (!isPortrait && !loadingData) {
      return (
        <View style={styles.container}>
          {isExpediteSystem && (
            <View style={styles.acelerationContainer}>
              <Text style={styles.acelerationText}>GAME ACELERADO</Text>
            </View>
          )}
          {renderMenu({
            navigation,
            setIsPaused,
            isPaused,
            setModalIsVisible,
            setPauseModalIsVisible,
            resetTimer,
            checkAndStartExpediteSystem,
            isAbleExpediteSystem,
            isExpediteSystem,
          })}
          <View style={styles.scoreBoard}>
            <View style={styles.infoContainer}>
              <Text style={styles.playerName} numberOfLines={1}>
                {checkGameShouldRotate({
                  game,
                  optionOne: playersName?.right?.player1,
                  optionTwo: playersName?.left?.player1,
                })}
              </Text>
              {renderScore(
                checkGameShouldRotate({
                  game,
                  optionOne: 'right',
                  optionTwo: 'left',
                }),
              )}
              {gameData?.gameType !== 'single' && (
                <Text style={styles.playerName} numberOfLines={1}>
                  {checkGameShouldRotate({
                    game,
                    optionOne: playersName?.right?.player2,
                    optionTwo: playersName?.left?.player2,
                  })}
                </Text>
              )}
            </View>
            <View style={styles.gameInfoContainer}>
              <Text style={styles.gameInfo}>{`Game ${game}`}</Text>
              <Text style={styles.gameInfo}>
                {timeConfig?.gameTime
                  ? timeConfig?.gameTime?.format('mm:ss')
                  : '00:00'}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.playerName} numberOfLines={1}>
                {checkGameShouldRotate({
                  game,

                  optionOne: playersName?.left?.player1,
                  optionTwo: playersName?.right?.player1,
                })}
              </Text>
              {renderScore(
                checkGameShouldRotate({
                  game,
                  optionOne: 'left',
                  optionTwo: 'right',
                }),
              )}
              {gameData?.gameType !== 'single' && (
                <Text style={styles.playerName} numberOfLines={1}>
                  {checkGameShouldRotate({
                    game,
                    optionOne: playersName?.left?.player2,
                    optionTwo: playersName?.right?.player2,
                  })}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.timeContainer}>
            <GameTime height={30} width={30} />
            <Text style={styles.gameTimer}>
              {timeConfig?.totalGameTime
                ? timeConfig?.totalGameTime?.format('HH:mm:ss')
                : '00:00:00'}
            </Text>
          </View>
          {renderModal({
            isFinishedGame,
            modalisVisible,
            setModalIsVisible,
            navigation,
            gameId,
          })}
          {pauseModal({
            pauseModalIsVisible,
            setPauseModalIsVisible,
            navigation,
            setIsPaused,
            technicalBreak,
            healthCare,
            showTechnicalBreak,
            showHealthCare,
            setShowTechnicalBreak,
            setShowHealthCare,
          })}
          {expediteModal({
            showExpediteModal,
            setShowExpediteModal,
          })}
        </View>
      );
    } else {
      return renderRotate();
    }
  };

  return <>{handleRender()}</>;
};

export default ScoreBoard;
