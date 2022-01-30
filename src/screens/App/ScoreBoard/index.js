/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import styles from './styles';
import GameTime from '../../../assets/icons/gameTime.svg';
import Raquet from '../../../assets/icons/raquet.svg';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {database, auth} from '../../../service/firebase';
import {
  checkGameShouldRotate,
  handleSaqueSide,
  handleSide,
  saveSumula,
  updateScore,
  updateTimeConfig,
} from '../../../utils/HandleGame';
import renderMenu from './components/renderMenu';
import renderModal from './components/renderModal';
dayjs.extend(duration);
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const ScoreBoard = ({route, navigation}) => {
  const {gameId} = route.params;
  const [timeConfig, setTimeConfig] = useState({
    gameTime: null,
    totalGameTime: null,
  });
  const [leftTeamScore, setLeftTeamScore] = useState(0);
  const [rightTeamScore, setRightTeamScore] = useState(0);
  const [modalisVisible, setModalIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dim, setDim] = useState();
  const [isPortrait, setIsPortrait] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [game, setGame] = useState(null);
  const [pointId, setPointId] = useState(1);

  const [saqueSettings, setSaqueSettings] = useState({
    countSaque: 1,
    saquePlayerCount: 1,
    saqueSide: 'left',
    saqueTeamSide: 'top',
  });

  const [disableToClick, setDisableToClick] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [isBestOfTwo, setIsBestOfTwo] = useState(false);
  const [isChangingGame, setIsChangingGame] = useState(false);

  useEffect(() => {
    StatusBar?.setHidden(true);

    const {currentUser} = auth;
    database
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
        setGame(data?.val()?.game);
        setRightTeamScore(data?.val()?.rightPlayers?.finalScore);
        setLeftTeamScore(data?.val()?.leftPlayers?.finalScore);
        setSaqueSettings({
          countSaque: data?.val()?.saqueSettings?.countSaque,
          saqueSide: data?.val()?.saqueSettings?.saqueSide,
          saqueTeamSide: data?.val()?.saqueSettings?.saqueTeamSide,
          saquePlayerCount: data?.val()?.saqueSettings?.saquePlayerCount,
        });
        setLoadingData(false);
      });
  }, []);

  useEffect(() => {
    if (
      rightTeamScore === Number(gameData?.stopOn) - 1 &&
      leftTeamScore === Number(gameData?.stopOn) - 1
    ) {
      return setIsBestOfTwo(true);
    }
  }, [pointId, isBestOfTwo]);

  useEffect(() => {
    const {currentUser} = auth;
    console.log(gameData?.rightPlayers?.finalGame);
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
      alert('Fim de jogo');
    }
  }, [game]);

  useEffect(async () => {
    let timer;
    if (isChangingGame) {
      const updateTime = {
        ...timeConfig,
        gameTime: dayjs.duration({hour: 0, minute: 0, seconds: 0}),
      };

      await updateTimeConfig({
        timer,
        setTimeConfig,
        timeConfig: updateTime,
        gameId,
      });

      setTimeout(() => {
        setIsChangingGame(false);
      }, 1000);
    }
  }, [isChangingGame]);

  useEffect(async () => {
    let timer;
    if (!loadingData && gameData && !isChangingGame) {
      if (!isPaused) {
        await updateTimeConfig({
          timer,
          setTimeConfig,
          timeConfig,
          gameId,
        });
      }
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isPaused, timeConfig]);

  useEffect(() => {
    if (gameData?.gameType !== 'single' && gameData?.startSide === 'right') {
      setSaqueSettings({...saqueSettings, saqueTeamSide: 'bottom'});
    }
    if (gameData?.gameType === 'single') {
      setSaqueSettings({...saqueSettings, saqueTeamSide: 'bottom'});
    }
  }, [gameData?.startSide]);

  useEffect(() => {
    var timer = setTimeout(() => {
      setDim(Dimensions.get('screen'));
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    setIsPortrait(dim?.height >= dim?.width);
  }, [dim]);

  const handlePoints = (team, type) => {
    if (isPaused) {
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
        });
        const newScore = leftTeamScore + operatorValue;
        setLeftTeamScore(newScore);
        updateScore({team, score: newScore, gameData, gameId});
        handleSide({
          newScore,
          side: team,
          leftTeamScore,
          rightTeamScore,
          isBestOfTwo,
          setIsBestOfTwo,
          setRightTeamScore,
          setLeftTeamScore,
          gameData,
          setLoadingData,
          game,
          setGame,
          setIsChangingGame,
          gameId,
          timeConfig,
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
      });
      const newScore = rightTeamScore + operatorValue;
      setRightTeamScore(newScore);
      updateScore({team, score: newScore, gameData, gameId});
      handleSide({
        newScore,
        side: team,
        leftTeamScore,
        rightTeamScore,
        isBestOfTwo,
        setIsBestOfTwo,
        setRightTeamScore,
        setLeftTeamScore,
        gameData,
        setLoadingData,
        game,
        setGame,
        setIsChangingGame,
        gameId,
        timeConfig,
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
            console.log('side: ', team);
            handlePoints(team, 'add');
            setDisableToClick(true);
            setTimeout(() => {
              setDisableToClick(false);
            }, 200);
          }}
          disabled={disableToClick}
        />
        <TouchableOpacity
          style={styles.removePoint}
          onPress={() => {
            console.log('side: ', team);
            handlePoints(team, 'remove');
            setDisableToClick(true);
            setTimeout(() => {
              setDisableToClick(false);
            }, 200);
          }}
          disabled={disableToClick}
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

  return (
    <>
      {!isPortrait && !loadingData ? (
        <View style={styles.container}>
          {renderMenu({navigation, setIsPaused, isPaused, setModalIsVisible})}
          <View style={styles.scoreBoard}>
            <View style={styles.infoContainer}>
              <Text style={styles.playerName} numberOfLines={1}>
                {checkGameShouldRotate({
                  game,
                  optionOne: gameData?.rightPlayers?.player1,
                  optionTwo: gameData?.leftPlayers?.player1,
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
                    optionOne: gameData?.rightPlayers?.player2,
                    optionTwo: gameData?.leftPlayers?.player2,
                  })}
                </Text>
              )}
            </View>
            <View style={styles.gameInfoContainer}>
              <Text style={styles.gameInfo}>{`Game ${game}`}</Text>
              <Text style={styles.gameInfo}>
                {gameData && timeConfig?.gameTime?.format('mm:ss')}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.playerName} numberOfLines={1}>
                {checkGameShouldRotate({
                  game,
                  optionOne: gameData?.leftPlayers?.player1,
                  optionTwo: gameData?.rightPlayers?.player1,
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
                    optionOne: gameData?.leftPlayers?.player2,
                    optionTwo: gameData?.rightPlayers?.player2,
                  })}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.timeContainer}>
            <GameTime height={30} width={30} />
            <Text style={styles.gameTimer}>
              {gameData && timeConfig?.totalGameTime?.format('HH:mm:ss')}
            </Text>
          </View>
          {renderModal({modalisVisible, setModalIsVisible, navigation, gameId})}
        </View>
      ) : (
        <View style={styles.portraitContainer}>
          <Text>Use o celular no modo paisagem</Text>
        </View>
      )}
    </>
  );
};

export default ScoreBoard;
