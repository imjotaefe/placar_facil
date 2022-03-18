import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
import Close from '../../assets/icons/close.svg';
import styles from './styles';
import ErrorAnimation from '../../assets/lottie/error.json';
import CheckAnimation from '../../assets/lottie/check.json';
import LottieView from 'lottie-react-native';

const MessageModal = ({isvisible, setIsVisible, error}) => {
  return (
    <Modal isVisible={isvisible}>
      <View style={styles.modal}>
        <View style={styles.closeContainer}>
          <TouchableOpacity
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            style={styles.closeButton}
            onPress={() => setIsVisible(false)}>
            <Close />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={{marginTop: 20}}>
            {error ? (
              <LottieView
                source={ErrorAnimation}
                autoPlay
                loop={false}
                style={{width: 200, height: 200}}
              />
            ) : (
              <LottieView
                source={CheckAnimation}
                autoPlay
                loop={false}
                style={{width: 100, height: 100}}
              />
            )}
          </View>
          {error ? (
            <>
              <Text style={styles.modalText}>Seu e-mail não foi enviado.</Text>
              <Text style={styles.modalText}>Tente novamente!</Text>
            </>
          ) : (
            <Text style={styles.modalText}>E-mail enviado com sucesso.</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;
