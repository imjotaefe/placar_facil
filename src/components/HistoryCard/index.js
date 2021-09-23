import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Calender from '../../assets/icons/calendar.svg';
import Timer from '../../assets/icons/timer.svg';
import PlayerOne from '../../assets/icons/player_1.svg';
import PlayerTwo from '../../assets/icons/player_2.svg';
import VerticalDots from '../../assets/icons/verticalDots.svg';
import dayjs from 'dayjs';

import styles from './styles';
import {colors} from '../../utils';

const HistoryCard = ({game, setModalIsVisible}) => {
  const {gameType, rightPlayers, leftPlayers, gameStartAt, gameFinishAt} = game;
  const startGame = dayjs(gameStartAt).format('HH:mm');
  const endGame = dayjs(gameFinishAt).format('HH:mm');
  const dateGame = dayjs(gameFinishAt).format('DD/MM/YYYY');
  const renderPlayerOne = () => {
    return (
      <View style={styles.pairOne}>
        <View style={styles.player}>
          <PlayerOne />
          <Text style={styles.name}>{leftPlayers.player1}</Text>
        </View>
        {gameType === 'pair' && (
          <>
            <View style={styles.separatorOne} />
            <View style={styles.player}>
              <PlayerOne />
              <Text style={styles.name}>{leftPlayers.player2}</Text>
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
          <Text style={styles.name}>{rightPlayers.player1}</Text>
          <PlayerTwo />
        </View>
        {gameType === 'pair' && (
          <>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorTwo} />
            </View>
            <View style={styles.player}>
              <Text style={styles.name}>{rightPlayers.player1}</Text>
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
        <TouchableOpacity onPress={() => setModalIsVisible(true)}>
          <View style={styles.verticalDots}>
            <VerticalDots />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.playersContainer}>
        {renderPlayerOne()}
        <Text style={styles.score}>
          {leftPlayers.finalScore} X {rightPlayers.finalScore}
        </Text>
        {renderPlayerTwo()}
      </View>
    </View>
  );
};

export default HistoryCard;
