import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
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
import {useDispatch} from 'react-redux';
import {Creators as ScoreBoardActions} from '../../store/ducks/scoreBoard';
import {Creators as EmailActions} from '../../store/ducks/email';

const HistoryCard = ({game, gameId, navigation}) => {
  const {gameType, rightPlayers, leftPlayers, sumula} = game;
  const dispatch = useDispatch();
  const [modalisVisible, setModalIsVisible] = useState(false);
  const startGame = dayjs(sumula?.gameStartAt)
    .subtract(3, 'hours')
    .format('HH:mm');
  const endGame = dayjs(sumula?.gameFinishAt)
    .subtract(3, 'hours')
    .format('HH:mm');
  const dateGame = dayjs(sumula?.gameStartAt)
    .subtract(3, 'hours')
    .format('DD/MM/YYYY');
  const [numberToSendSumula, setNumberToSendSumula] = useState('PHONENUMBER');
  const [sumulaText, setSumulaText] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus risus vel finibus maximus. Nulla molestie vehicula faucibus. Nam mollis lacus eu tortor pulvinar, vel mollis neque bibendum. Quisque porta nulla erat, non sollicitudin nibh molestie nec. Quisque ex magna, porta ut porta vitae, pulvinar nec diam. Fusce vitae magna diam. Praesent ut imperdiet nisi. Cras a dapibus tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus risus vel finibus maximus. Nulla molestie vehicula faucibus. Nam mollis lacus eu tortor pulvinar, vel mollis neque bibendum. Quisque porta nulla erat, non sollicitudin nibh molestie nec. Quisque ex magna, porta ut porta vitae, pulvinar nec diam. Fusce vitae magna diam. Praesent ut imperdiet nisi. Cras a dapibus tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus risus vel finibus maximus. Nulla molestie vehicula faucibus. Nam mollis lacus eu tortor pulvinar, vel mollis neque bibendum. Quisque porta nulla erat, non sollicitudin nibh molestie nec. Quisque ex magna, porta ut porta vitae, pulvinar nec diam. Fusce vitae magna diam. Praesent ut imperdiet nisi. Cras a dapibus tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus risus vel finibus maximus. Nulla molestie vehicula faucibus. Nam mollis lacus eu tortor pulvinar, vel mollis neque bibendum. Quisque porta nulla erat, non sollicitudin nibh molestie nec. Quisque ex magna, porta ut porta vitae, pulvinar nec diam. Fusce vitae magna diam. Praesent ut imperdiet nisi. Cras a dapibus tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus risus vel finibus maximus. Nulla molestie vehicula faucibus. Nam mollis lacus eu tortor pulvinar, vel mollis neque bibendum. Quisque porta nulla erat, non sollicitudin nibh molestie nec. Quisque ex magna, porta ut porta vitae, pulvinar nec diam. Fusce vitae magna diam. Praesent ut imperdiet nisi. Cras a dapibus tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus risus vel finibus maximus. Nulla molestie vehicula faucibus. Nam mollis lacus eu tortor pulvinar, vel mollis neque bibendum. Quisque porta nulla erat, non sollicitudin nibh molestie nec. Quisque ex magna, porta ut porta vitae, pulvinar nec diam. Fusce vitae magna diam. Praesent ut imperdiet nisi. Cras a dapibus tellus. Loremsdfsdf sdfsdfsdfsdfsdf. ',
  );

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
                  dispatch(ScoreBoardActions.setGameId(gameId));
                  navigation.navigate('ScoreBoard', {
                    screen: 'ScoreBoard',
                  });
                }}>
                <Text style={styles.buttonTextToFile}>CONTINUAR</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.contentContainer}>
              <Text style={styles.modalTitle}>
                Deseja exportar essa partida?
              </Text>
              <Text style={styles.modalText}>
                Isso criará uma cópia da súmula.
              </Text>

              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => {
                  dispatch(EmailActions.sendEmail(game));
                }}>
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
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Sumula', {
          gameId,
        })
      }>
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
              {startGame || '00:00'} -{' '}
              {startGame === endGame ? 'XX:XX' : endGame || '00:00'}
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
            {leftPlayers?.finalGame} X {rightPlayers?.finalGame}
          </Text>
          {renderPlayerTwo()}
        </View>
        {renderModal()}
      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;
