import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
import Close from '../../assets/icons/close.svg';
import styles from './styles';
import ErrorMessage from '../../assets/icons/errorMessage.svg';
import Success from '../../assets/icons/success.svg';

const MessageModal = ({isvisible, setIsVisible, error}) => {
  return (
    <Modal isVisible={isvisible}>
      <View style={styles.modal}>
        <View style={styles.closeContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsVisible(false)}>
            <Close />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.modalTitle}>
            {error ? 'ERRO AO REALIZAR' : 'OPERAÇÃO REALIZADA'}
          </Text>
          <Text style={styles.modalTitle}>
            {error ? 'A AÇÃO!' : 'COM SUCESSO!'}
          </Text>
          <View style={{marginTop: 20}}>
            {error ? <ErrorMessage width={119} /> : <Success width={119} />}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;
