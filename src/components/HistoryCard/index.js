import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Calender from '../../assets/icons/calendar.svg';
import Timer from '../../assets/icons/timer.svg';
import PlayerOne from '../../assets/icons/player_1.svg';
import PlayerTwo from '../../assets/icons/player_2.svg';
import VerticalDots from '../../assets/icons/verticalDots.svg';
import dayjs from 'dayjs';
import Modal from 'react-native-modal';
import Close from '../../assets/icons/close.svg';
import Share from '../../assets/icons/share.svg';
import ToFile from '../../assets/icons/toFile.svg';
import styles from './styles';
import {colors} from '../../utils';

const HistoryCard = ({game, gameId, navigation}) => {
  const {gameType, rightPlayers, leftPlayers, gameStartAt, gameFinishAt} = game;
  const [modalisVisible, setModalIsVisible] = useState(false);
  const startGame = dayjs(gameStartAt).format('HH:mm');
  const endGame = dayjs(gameFinishAt).format('HH:mm');
  const dateGame = dayjs(gameFinishAt).format('DD/MM/YYYY');

  const renderModal = () => {
    return (
      <Modal isVisible={modalisVisible}>
        <View style={styles.modal}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalIsVisible(false)}>
              <Close />
            </TouchableOpacity>
          </View>
          {!game.gameFinished ? (
            <View style={styles.contentContainer}>
              <Text style={styles.modalTitle}>
                Deseja continuar esta partida?
              </Text>
              <TouchableOpacity
                style={styles.tofileButton}
                onPress={() => {
                  navigation.navigate('ScoreBoard', {
                    screen: 'ScoreBoard',
                    params: {gameId},
                  });
                }}>
                <Text style={styles.buttonTextToFile}>CONTINUAR</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.contentContainer}>
              <Text style={styles.modalTitle}>O QUE DESEJA FAZER?</Text>
              <Text style={styles.modalText}>Lorem ipsum dolor sit</Text>
              <TouchableOpacity style={styles.tofileButton}>
                <ToFile />
                <Text style={styles.buttonTextToFile}>ARQUIVAR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareButton}>
                <Share />
                <Text style={styles.buttonTextShare}>EXPORTAR</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    );
  };

  const renderPlayerOne = () => {
    return (
      <View style={styles.pairOne}>
        <View style={styles.player}>
          <PlayerOne />
          <Text style={styles.name}>{leftPlayers?.player1}</Text>
        </View>
        {gameType === 'pair' && (
          <>
            <View style={styles.separatorOne} />
            <View style={styles.player}>
              <PlayerOne />
              <Text style={styles.name}>{leftPlayers?.player2}</Text>
            </View>
          </>
        )}
      </View>
    );
  };

  const renderPlayerTwo = () => {
    return (
      <View style={styles.pairTwo}>
        <View style={styles.player}>
          <Text style={styles.name}>{rightPlayers?.player1}</Text>
          <PlayerTwo />
        </View>
        {gameType === 'pair' && (
          <>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorTwo} />
            </View>
            <View style={styles.player}>
              <Text style={styles.name}>{rightPlayers?.player2}</Text>
              <PlayerTwo />
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            gameType === 'pair' ? colors.weakBlue : colors.weakOrange,
        },
      ]}>
      <View style={styles.top}>
        <View style={styles.date}>
          <Calender />
          <Text style={styles.textDate}>{dateGame || '00/00/0000'}</Text>
          <Timer style={styles.timer} />
          <Text style={styles.textDate}>
            {startGame || '00:00'} - {endGame || '00:00'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalIsVisible(true);
          }}>
          <View style={styles.verticalDots}>
            <VerticalDots />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.playersContainer}>
        {renderPlayerOne()}
        <Text style={styles.score}>
          {leftPlayers?.finalScore} X {rightPlayers?.finalScore}
        </Text>
        {renderPlayerTwo()}
      </View>
      {renderModal()}
    </View>
  );
};

export default HistoryCard;
