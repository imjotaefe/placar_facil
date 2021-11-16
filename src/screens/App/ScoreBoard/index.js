/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import firebase from 'firebase';
// import Orientation from 'react-native-orientation';
import styles from './styles';
import GameTime from '../../../assets/icons/gameTime.svg';
import Hamburguer from '../../../assets/icons/hamb.svg';
import PauseGame from '../../../assets/icons/pauseGame.svg';
import Raquet from '../../../assets/icons/raquet.svg';
import FinishGame from '../../../assets/icons/finishGame.svg';
import CastNotConnected from '../../../assets/icons/castNotConnected.svg';
// import SystemNavigationBar from 'react-native-system-navigation-bar';
import Close from '../../../assets/icons/close.svg';
import Play from '../../../assets/icons/play.svg';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {database, auth} from '../../../service/firebase';
dayjs.extend(duration);
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
// var Orientation = require('react-native').NativeModules.Orientation;
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const ScoreBoard = ({route, navigation}) => {
  const {gameId} = route.params;
  const [leftTeamScore, setLeftTeamScore] = useState(0);
  const [rightTeamScore, setRightTeamScore] = useState(0);
  const [modalisVisible, setModalIsVisible] = useState(false);
  const [gameTime, setGameTime] = useState(null);
  const [totalGameTime, setTotalGameTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [dim, setDim] = useState();
  const [isPortrait, setIsPortrait] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [game, setGame] = useState(1);
  const [pointId, setPointId] = useState(1);
  const [countSaque, setCountSaque] = useState(null);
  const [saqueSide, setSaqueSide] = useState(null);
  const [saqueTeamSide, setSaqueTeamSide] = useState(null);
  const [saquePlayerCount, setSaquePlayerCount] = useState(null);
  const [disableToClick, setDisableToClick] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
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
        setGameTime(gameTimeConfig);

        const totalGameTimeFromBD = dayjs(
          data?.val()?.totalGameTime,
          'HH:mm:ss',
        );
        const totalGameTimeConfig = dayjs.duration({
          hour: totalGameTimeFromBD.hour(),
          minute: totalGameTimeFromBD.minute(),
          seconds: totalGameTimeFromBD.second(),
        });
        setTotalGameTime(totalGameTimeConfig);
        setRightTeamScore(data?.val()?.rightPlayers?.finalScore);
        setLeftTeamScore(data?.val()?.leftPlayers?.finalScore);
        setCountSaque(data?.val()?.saqueSettings?.countSaque);
        setSaquePlayerCount(data?.val()?.saqueSettings?.saquePlayerCount);
        setSaqueSide(data?.val()?.saqueSettings?.saqueSide);
        setSaqueTeamSide(data?.val()?.saqueSettings?.saqueTeamSide);
        setLoadingData(false);
      });
  }, []);

  const addSecondOnGameTime = async timer => {
    if (!isPaused) {
      timer = await setTimeout(() => {
        setGameTime(gameTime?.add(1, 'seconds'));
      }, 1000);
    }
  };

  useEffect(() => {
    var timer;
    if (!loadingData && gameData) {
      addSecondOnGameTime(timer);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [gameTime, isPaused]);

  const addSecondOnTotalGameTime = async timer => {
    if (!isPaused) {
      timer = await setTimeout(() => {
        setTotalGameTime(totalGameTime?.add(1, 'seconds'));
      }, 1000);
    }
  };

  useEffect(() => {
    var timer;
    if (!loadingData && gameData) {
      addSecondOnTotalGameTime(timer);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isPaused, totalGameTime]);

  useEffect(async () => {
    if (!loadingData) {
      await updateGameData({
        totalGameTime: totalGameTime?.format('HH:mm:ss'),
      });
      await updateGameData({gameTime: gameTime?.format('mm:ss')});
    }
  }, [gameTime, totalGameTime, loadingData]);

  useEffect(() => {
    StatusBar?.setHidden(true);
  }, []);

  useEffect(() => {
    if (gameData?.gameType !== 'single' && gameData?.startSide === 'right') {
      setSaqueTeamSide('bottom');
    }
    if (gameData?.gameType === 'single') {
      setSaqueTeamSide('bottom');
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

  const updateGameData = async data => {
    const {currentUser} = auth;
    if (gameId) {
      return await firebase
        .database()
        .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
        .update(data)
        .then(() => true)
        .catch(() => false);
    }
  };

  const finishGame = async () => {
    var pastSumula;
    const {currentUser} = auth;
    database
      .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
      .on('value', snapshot => {
        pastSumula = snapshot.val();
      });
    const response = await updateGameData({
      gameFinished: true,
      sumula: {...pastSumula.sumula, gameFinishAt: String(dayjs())},
    });
    if (response) {
      navigation.navigate('Home');
    }
  };

  const updateScore = async (team, score) => {
    if (team === 'right') {
      const newScore = {...gameData?.rightPlayers};
      newScore.finalScore = score;
      await updateGameData({
        rightPlayers: newScore,
      });
    }
    if (team === 'left') {
      const newScore = {...gameData?.leftPlayers};
      newScore.finalScore = score;
      await updateGameData({
        leftPlayers: newScore,
      });
    }
  };

  const saveSumula = async ({leftScore, rightScore, time}) => {
    var pastSumula;
    const {currentUser} = auth;
    database
      .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
      .on('value', snapshot => {
        pastSumula = snapshot.val();
      });
    const data = {
      sumula: {
        ...pastSumula.sumula,
        [`${game}`]: {
          ...pastSumula.sumula[game],
          [`${Number(time.format('HHmmss') * pointId)}`]: {
            rightScore,
            leftScore,
            time: time.format('HH:mm:ss'),
          },
        },
      },
    };
    await updateGameData(data);
  };

  const updateSaqueSettings = async ({
    countSaqueSetting,
    saquePlayerCountSetting,
    saqueSideSetting,
    saqueTeamSideSetting,
  }) => {
    const data = {
      saqueSettings: {
        countSaque: countSaqueSetting,
        saquePlayerCount: saquePlayerCountSetting,
        saqueSide: saqueSideSetting,
        saqueTeamSide: saqueTeamSideSetting,
      },
    };
    await updateGameData(data);
  };

  const handleSaqueSide = type => {
    let countSaqueSetting = countSaque;
    let saquePlayerCountSetting = saquePlayerCount;
    let saqueSideSetting = saqueSide;
    let saqueTeamSideSetting = saqueTeamSide;

    if (type === 'add') {
      setCountSaque(countSaque + 1);
      countSaqueSetting = countSaque + 1;
      if (countSaque % 2 === 0) {
        setSaqueSide(saqueSide === 'left' ? 'right' : 'left');
        saqueSideSetting = saqueSide === 'left' ? 'right' : 'left';
        if (gameData?.gameType !== 'single') {
          setSaquePlayerCount(2);
          saquePlayerCountSetting = 2;
          if (saquePlayerCount === 2) {
            setSaquePlayerCount(1);
            saquePlayerCountSetting = 1;
          } else {
            setSaqueTeamSide(saqueTeamSide === 'top' ? 'bottom' : 'top');
            saqueTeamSideSetting = saqueTeamSide === 'top' ? 'bottom' : 'top';
          }
        }
      }
    } else {
      if (countSaque > 1) {
        setCountSaque(countSaque - 1);
        countSaqueSetting = countSaque - 1;
        if (countSaque % 2 !== 0) {
          setSaqueSide(saqueSide === 'left' ? 'right' : 'left');
          saqueSideSetting = saqueSide === 'left' ? 'right' : 'left';
          if (gameData?.gameType !== 'single') {
            setSaquePlayerCount(1);
            saquePlayerCountSetting = 1;
            if (saquePlayerCount === 1) {
              setSaquePlayerCount(2);
              saquePlayerCountSetting = 2;
            } else {
              setSaqueTeamSide(saqueTeamSide === 'top' ? 'bottom' : 'top');
              saqueTeamSideSetting = saqueTeamSide === 'top' ? 'bottom' : 'top';
            }
          }
        }
      }
    }
    updateSaqueSettings({
      countSaqueSetting,
      saquePlayerCountSetting,
      saqueSideSetting,
      saqueTeamSideSetting,
    });
  };

  const handlePoints = (team, type) => {
    setPointId(pointId + 1);
    const operatorValue = type === 'add' ? +1 : -1;
    if (team === 'left') {
      if (leftTeamScore > 0 || type === 'add') {
        handleSaqueSide(type);
        const newScore = leftTeamScore + operatorValue;
        updateScore(team, newScore);
        saveSumula({
          leftScore: newScore,
          rightScore: rightTeamScore,
          time: totalGameTime,
        });
        return setLeftTeamScore(newScore);
      }
      return null;
    }
    if (rightTeamScore > 0 || type === 'add') {
      handleSaqueSide(type);
      const newScore = rightTeamScore + operatorValue;
      updateScore(team, newScore);
      saveSumula({
        leftScore: leftTeamScore,
        rightScore: newScore,
        time: totalGameTime,
      });
      return setRightTeamScore(newScore);
    }
    return null;
  };

  const renderScore = team => {
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

  const renderModal = () => {
    return (
      <Modal isVisible={modalisVisible} hasBackdrop={false}>
        <View style={styles.modal}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalIsVisible(false)}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.modalTitle}>
              Deseja mesmo finalizar a partida?
            </Text>
            <Text style={styles.modalText}>
              se finalizar, não será mais possível alterar os valores da
              partida!
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.tofileButton}
                onPress={() => setModalIsVisible(false)}>
                <Text style={styles.buttonTextToFile}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => finishGame()}>
                <Text style={styles.buttonTextShare}>FINALIZAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderMenus = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menu}>
          <Hamburguer height={30} width={30} />
        </TouchableOpacity>
        <View style={styles.rightMenu}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => console.log('oi')}
              style={styles.bigButton}>
              <CastNotConnected height={25} width={25} />
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>Transmitir</Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => setIsPaused(!isPaused)}
              style={styles.smallButton}>
              {isPaused ? (
                <Play
                  height={17}
                  width={17}
                  style={{marginLeft: 2, marginRight: -1}}
                />
              ) : (
                <PauseGame height={17} width={17} />
              )}
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>
              {isPaused ? 'Continuar' : 'Pausar'}
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => setModalIsVisible(true)}
              style={styles.smallButton}>
              <FinishGame height={17} width={17} />
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>Finalizar {'\n'} Jogo</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      {!isPortrait && !loadingData ? (
        <View style={styles.container}>
          {renderMenus()}
          <View style={styles.scoreBoard}>
            <View style={styles.infoContainer}>
              <Text style={styles.playerName} numberOfLines={1}>
                {gameData?.leftPlayers.player1}
              </Text>
              {renderScore('left')}
              {gameData?.gameType !== 'single' && (
                <Text style={styles.playerName} numberOfLines={1}>
                  {gameData?.leftPlayers.player2}
                </Text>
              )}
            </View>
            <View style={styles.gameInfoContainer}>
              <Text style={styles.gameInfo}>{`Game ${gameData?.game}`}</Text>
              <Text style={styles.gameInfo}>
                {gameData && gameTime?.format('mm:ss')}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.playerName} numberOfLines={1}>
                {gameData?.rightPlayers.player1}
              </Text>
              {renderScore('right')}
              {gameData?.gameType !== 'single' && (
                <Text style={styles.playerName} numberOfLines={1}>
                  {gameData?.rightPlayers.player2}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.timeContainer}>
            <GameTime height={30} width={30} />
            <Text style={styles.gameTimer}>
              {gameData && totalGameTime?.format('HH:mm:ss')}
            </Text>
          </View>
          {renderModal()}
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
