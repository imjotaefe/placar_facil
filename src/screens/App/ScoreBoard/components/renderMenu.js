/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Hamburguer from '../../../../assets/icons/hamb.svg';
import PauseGame from '../../../../assets/icons/pauseGame.svg';
import FinishGame from '../../../../assets/icons/finishGame.svg';
import CastNotConnected from '../../../../assets/icons/castNotConnected.svg';
import Play from '../../../../assets/icons/play.svg';
import styles from './styles';

const renderMenu = ({
  navigation,
  setIsPaused,
  isPaused,
  setModalIsVisible,
  setPauseModalIsVisible,
  resetTimer,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.menu}>
        <Hamburguer height={30} width={30} />
      </TouchableOpacity>
      <View style={styles.rightMenu}>
        {/* <View style={styles.button}>
          <TouchableOpacity
            onPress={() => console.log('oi')}
            style={styles.bigButton}>
            <CastNotConnected height={25} width={25} />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>Transmitir</Text>
        </View> */}
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              setIsPaused(!isPaused);
              setPauseModalIsVisible(true);
            }}
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

export default renderMenu;
