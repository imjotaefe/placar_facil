import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Close from '../../../../assets/icons/close.svg';
import {finishGame} from '../../../../utils/HandleGame';
import Modal from 'react-native-modal';

const pauseModal = ({
  pauseModalIsVisible,
  setPauseModalIsVisible,
  navigation,
  gameId,
  setIsPaused,
}) => {
  const closeModal = () => {
    setIsPaused(false);
    setPauseModalIsVisible(false);
  };
  return (
    <>
      <Modal isVisible={pauseModalIsVisible} hasBackdrop={false}>
        <View style={styles.modal}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => closeModal()}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.modalTitle}>sdfgsdfg?</Text>
            <Text style={styles.modalText}>sdfgsdfg partida!</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.tofileButton}
                onPress={() => closeModal()}>
                <Text style={styles.buttonTextToFile}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => finishGame({navigation, gameId})}>
                <Text style={styles.buttonTextShare}>FINALIZAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default pauseModal;
