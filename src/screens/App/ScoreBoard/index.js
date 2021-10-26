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
import FinishGame from '../../../assets/icons/finishGame.svg';
import CastNotConnected from '../../../assets/icons/castNotConnected.svg';
// import SystemNavigationBar from 'react-native-system-navigation-bar';
import Close from '../../../assets/icons/close.svg';
import Play from '../../../assets/icons/play.svg';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {database, auth} from '../../../service/firebase';
dayjs.extend(duration);
// var Orientation = require('react-native').NativeModules.Orientation;

const ScoreBoard = ({route, navigation}) => {
  const {gameId} = route.params;
  const [leftTeamScore, setLeftTeamScore] = useState(0);
  const [rightTeamScore, setRightTeamScore] = useState(0);
  const [modalisVisible, setModalIsVisible] = useState(false);
  const startGame = dayjs.duration({hour: 0, minute: 0, seconds: 0});
  const [gameTime, setGameTime] = useState(startGame);
  const [totalGameTime, setTotalGameTime] = useState(startGame);
  const [isPaused, setIsPaused] = useState(false);
  const [dim, setDim] = useState();
  const [isPortrait, setIsPortrait] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [game, setGame] = useState(1);
  const [pointId, setPointId] = useState(1);

  useEffect(() => {
    if (!isPaused) {
      setTimeout(() => {
        setGameTime(gameTime.add(1, 'seconds'));
      }, 1000);
    }
  }, [gameTime, isPaused]);

  useEffect(() => {
    if (!isPaused) {
      setTimeout(() => {
        setTotalGameTime(totalGameTime.add(1, 'seconds'));
      }, 1000);
    }
  }, [isPaused, totalGameTime]);

  useEffect(() => {
    const {currentUser} = auth;
    database
      .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
      .on('value', snapshot => {
        setGameData(snapshot.val());
      });
  }, []);

  useEffect(() => {
    StatusBar?.setHidden(true);
  }, []);

  useEffect(() => {
    setDim(Dimensions.get('screen'));
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
    const response = await updateGameData({gameFinished: true});
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

  const handlePoints = (team, type) => {
    setPointId(pointId + 1);
    const operatorValue = type === 'add' ? +1 : -1;
    if (team === 'left') {
      if (leftTeamScore > 0 || type === 'add') {
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
    return (
      <View style={styles.numberContainer}>
        <TouchableOpacity
          style={styles.addPoint}
          onPress={() => handlePoints(team, 'add')}
        />
        <TouchableOpacity
          style={styles.removePoint}
          onPress={() => handlePoints(team, 'remove')}
        />
        <Text style={styles.scoreNumber} numberOfLines={1}>
          {team === 'right' ? rightTeamScore : leftTeamScore}
        </Text>
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
      {!isPortrait ? (
        <View style={styles.container}>
          {renderMenus()}
          <View style={styles.scoreBoard}>
            <View style={styles.infoContainer}>
              <Text style={styles.playerName} numberOfLines={1}>
                Fernando
              </Text>
              {renderScore('left')}
              <Text style={styles.playerName} numberOfLines={1}>
                Lucas
              </Text>
            </View>
            <View style={styles.gameInfoContainer}>
              <Text style={styles.gameInfo}>{`Game ${game}`}</Text>
              <Text style={styles.gameInfo}>{gameTime.format('mm:ss')}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.playerName} numberOfLines={1}>
                Pedro
              </Text>
              {renderScore('right')}
              <Text style={styles.playerName} numberOfLines={1}>
                Mateus
              </Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <GameTime height={30} width={30} />
            <Text style={styles.gameTimer}>
              {totalGameTime.format('HH:mm:ss')}
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
