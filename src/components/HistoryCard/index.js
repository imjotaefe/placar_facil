import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Calender from '../../assets/icons/calendar.svg';
import Timer from '../../assets/icons/timer.svg';
import PlayerOne from '../../assets/icons/player_1.svg';
import PlayerTwo from '../../assets/icons/player_2.svg';
import VerticalDots from '../../assets/icons/verticalDots.svg';

import styles from './styles';
import {colors} from '../../utils';

const HistoryCard = ({isPair, setModalIsVisible}) => {
  const renderPlayerOne = () => {
    return (
      <View style={styles.pairOne}>
        <View style={styles.player}>
          <PlayerOne />
          <Text style={styles.name}>Murilo N.</Text>
        </View>
        {isPair && (
          <>
            <View style={styles.separatorOne} />
            <View style={styles.player}>
              <PlayerOne />
              <Text style={styles.name}>Murilo N.</Text>
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
          <Text style={styles.name}>Fernando K.</Text>
          <PlayerTwo />
        </View>
        {isPair && (
          <>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorTwo} />
            </View>
            <View style={styles.player}>
              <Text style={styles.name}>Fernando K.</Text>
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
          backgroundColor: isPair ? colors.weakBlue : colors.weakOrange,
        },
      ]}>
      <View style={styles.top}>
        <View style={styles.date}>
          <Calender />
          <Text style={styles.textDate}>09/11/2020</Text>
          <Timer style={styles.timer} />
          <Text style={styles.textDate}>12:30 - 13:12</Text>
        </View>
        <TouchableOpacity onPress={() => setModalIsVisible(true)}>
          <View style={styles.verticalDots}>
            <VerticalDots />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.playersContainer}>
        {renderPlayerOne()}
        <Text style={styles.score}>3 X 2</Text>
        {renderPlayerTwo()}
      </View>
    </View>
  );
};

export default HistoryCard;
