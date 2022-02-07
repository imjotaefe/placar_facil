import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Close from '../../../../assets/icons/close.svg';
import {finishGame} from '../../../../utils/HandleGame';
import Modal from 'react-native-modal';

const renderModal = ({
  isFinishedGame,
  modalisVisible,
  setModalIsVisible,
  navigation,
  gameId,
}) => {
  if (isFinishedGame) {
    return (
      <>
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
              <Text style={styles.modalTitle}>Fim de partida</Text>
              <Text style={styles.modalText}>
                Os dados desta partida foram salvos com sucesso!
              </Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() => finishGame({navigation, gameId})}>
                  <Text style={styles.buttonTextShare}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
  return (
    <>
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

export default renderModal;
