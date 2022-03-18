/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Hamburguer from '../../../../assets/icons/hamb.svg';
import PauseGame from '../../../../assets/icons/pauseGame.svg';
import FinishGame from '../../../../assets/icons/finishGame.svg';
import Expedite from '../../../../assets/icons/expedite.svg';
import Play from '../../../../assets/icons/play.svg';
import styles from './styles';

const renderMenu = ({
  navigation,
  setIsPaused,
  isPaused,
  setModalIsVisible,
  setPauseModalIsVisible,
  resetTimer,
  checkAndStartExpediteSystem,
  isAbleExpediteSystem,
  isExpediteSystem,
}) => {
  return (
    <>
      <TouchableOpacity
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        onPress={() => navigation.openDrawer()}
        style={styles.menu}>
        <Hamburguer height={30} width={30} />
      </TouchableOpacity>

      <View style={styles.rightMenu}>
        {isAbleExpediteSystem && !isExpediteSystem && (
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => checkAndStartExpediteSystem(true)}
              style={styles.bigButton}>
              <Expedite height={25} width={25} />
            </TouchableOpacity>
            <Text style={styles.buttonLabel}>Aceleração</Text>
          </View>
        )}
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
