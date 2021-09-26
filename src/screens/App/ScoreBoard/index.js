/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import Modal from 'react-native-modal';
import Orientation from 'react-native-orientation';
import styles from './styles';
import GameTime from '../../../assets/icons/gameTime.svg';
import Hamburguer from '../../../assets/icons/hamb.svg';
import PauseGame from '../../../assets/icons/pauseGame.svg';
import FinishGame from '../../../assets/icons/finishGame.svg';
import CastNotConnected from '../../../assets/icons/castNotConnected.svg';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Close from '../../../assets/icons/close.svg';
import Play from '../../../assets/icons/play.svg';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const ScoreBoard = ({navigation}) => {
  const [leftTeamScore, setLeftTeamScore] = useState(0);
  const [rightTeamScore, setRightTeamScore] = useState(0);
  const [modalisVisible, setModalIsVisible] = useState(false);
  const startGame = dayjs.duration({hour: 0, minute: 0, seconds: 0});
  const [gameTime, setGameTime] = useState(startGame);
  const [totalGameTime, setTotalGameTime] = useState(startGame);
  const [isPaused, setIsPaused] = useState(false);

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
    Orientation.lockToLandscape();
    SystemNavigationBar.navigationHide();
    StatusBar.setHidden(true);
  });

  const handlePoints = (team, type) => {
    const newType = type === 'add' ? +1 : -1;
    if (team === 'left') {
      if (leftTeamScore > 0 || type === 'add') {
        return setLeftTeamScore(leftTeamScore + newType);
      }
      return null;
    }
    if (rightTeamScore > 0 || type === 'add') {
      return setRightTeamScore(rightTeamScore + newType);
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

              <TouchableOpacity style={styles.shareButton}>
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
          <Text style={styles.gameInfo}>Game 3</Text>
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
        <Text style={styles.gameTimer}>{totalGameTime.format('HH:mm:ss')}</Text>
      </View>
      {renderModal()}
    </View>
  );
};

export default ScoreBoard;
