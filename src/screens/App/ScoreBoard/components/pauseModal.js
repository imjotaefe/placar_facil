/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Close from '../../../../assets/icons/close.svg';
import Modal from 'react-native-modal';

const pauseModal = ({
  pauseModalIsVisible,
  setPauseModalIsVisible,
  setIsPaused,
  technicalBreak,
  healthCare,
  showTechnicalBreak,
  showHealthCare,
  setShowTechnicalBreak,
  setShowHealthCare,
}) => {
  const closeModal = () => {
    setIsPaused(false);
    setPauseModalIsVisible(false);
    setShowHealthCare(false);
    setShowTechnicalBreak(false);
  };

  const renderContent = () => {
    if (showHealthCare) {
      return (
        <>
          <Text style={styles.modalTitle}>Assistência médica</Text>
          <Text style={styles.modalText}>
            Feche a janela para acabar com a pausa
          </Text>
          <View style={styles.buttonsContainer}>
            <View>
              <Text style={styles.bigNumber}>{healthCare}</Text>
            </View>
          </View>
        </>
      );
    }
    if (showTechnicalBreak) {
      return (
        <>
          <Text style={styles.modalTitle}>Intervalo técnico</Text>
          <Text style={styles.modalText}>
            Feche a janela para acabar com a pausa
          </Text>
          <View style={styles.buttonsContainer}>
            <View>
              <Text style={styles.bigNumber}>{technicalBreak}</Text>
            </View>
          </View>
        </>
      );
    }
    return (
      <>
        <Text style={styles.modalTitle}>Qual tipo de pause você deseja?</Text>
        <Text style={styles.modalText}>Selecione uma opção</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={{
              opacity: technicalBreak === 1 ? 0.5 : 1,
              ...styles.tofileButton,
            }}
            disabled={technicalBreak === 1}
            onPress={() => setShowTechnicalBreak(true)}>
            <Text style={styles.buttonTextToFile}>PAUSA TÉCNICA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              opacity: healthCare === 1 ? 0.5 : 1,
              ...styles.shareButton,
            }}
            disabled={healthCare === 1}
            onPress={() => setShowHealthCare(true)}>
            <Text style={styles.buttonTextShare}>ASSISTÊNCIA MÉDICA</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal isVisible={pauseModalIsVisible} hasBackdrop={false}>
        <View style={styles.modal}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                closeModal();
              }}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>{renderContent()}</View>
        </View>
      </Modal>
    </>
  );
};

export default pauseModal;
