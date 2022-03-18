/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Close from '../../../../assets/icons/close.svg';
import Modal from 'react-native-modal';

const expediteModal = ({showExpediteModal, setShowExpediteModal}) => {
  return (
    <>
      <Modal isVisible={showExpediteModal} hasBackdrop={false}>
        <View style={styles.modal}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              style={styles.closeButton}
              onPress={() => {
                setShowExpediteModal(false);
              }}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.modalTitle}>
              Esta partida está em aceleração!
            </Text>
            <Text style={styles.modalText}>
              Isso significa que os jogadores realizarão saques alternados. Se
              quem está recebendo o saque fizer 13 devoluções durante a troca de
              bolas ele é o vencedor do ponto.
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default expediteModal;
