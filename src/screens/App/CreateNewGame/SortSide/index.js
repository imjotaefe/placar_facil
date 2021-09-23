/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PlayerOne from '../../../../assets/icons/player_1.svg';
import PlayerTwo from '../../../../assets/icons/player_2.svg';
import Swap from '../../../../assets/icons/swap.svg';
import SwapHorizontal from '../../../../assets/icons/swapHorizontal.svg';
import Raquet from '../../../../assets/icons/raquet.svg';
import Button from '../../../../components/Button';
import styles from './styles';
import Header from '../../../../components/Header';

const SortSide = ({navigation, route}) => {
  const {type} = route.params;
  const [selectedStart, setSelectedStart] = useState('left');
  const [leftPlayers, setLeftPlayers] = useState();
  const [rightPlayers, setRightPlayers] = useState();

  useEffect(() => {
    if (route.params) {
      setLeftPlayers(route.params.team1);
      setRightPlayers(route.params.team2);
    }
  }, [route]);

  const Player = props => {
    return (
      <View style={styles.playerContainer}>
        {props.side === 'bottom' && (
          <Text
            style={[
              styles.text,
              {marginBottom: 5},
              props?.color === 'blue'
                ? styles.textNameBlue
                : styles.textNameOrange,
            ]}>
            {props?.name}
          </Text>
        )}
        {props?.color === 'blue' ? (
          <PlayerOne height={40} width={40} />
        ) : (
          <PlayerTwo height={40} width={40} />
        )}
        {props.side === 'top' && (
          <Text
            style={[
              styles.text,
              {marginTop: 5},
              props?.color === 'blue'
                ? styles.textNameBlue
                : styles.textNameOrange,
            ]}>
            {props?.name}
          </Text>
        )}
      </View>
    );
  };

  const handleSwap = () => {
    setRightPlayers(leftPlayers);
    setLeftPlayers(rightPlayers);
  };

  const Table = () => {
    return (
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          <TouchableOpacity
            onPress={() => setSelectedStart('left')}
            style={[
              styles.startContainer,
              selectedStart === 'left' ? {opacity: 1} : {opacity: 0.3},
            ]}>
            <Raquet height={40} width={40} />
            <Text style={{marginLeft: 10}}>Saque</Text>
          </TouchableOpacity>
          <View style={styles.verticalSeparator} />
          <TouchableOpacity
            style={styles.swapButton}
            onPress={() => handleSwap()}>
            <Swap />
            <Text style={styles.buttonTextSwap}>INVERTER</Text>
          </TouchableOpacity>
          <View style={styles.horizontalSeparator} />
          <TouchableOpacity
            onPress={() => setSelectedStart('right')}
            style={[
              styles.finishContainer,
              selectedStart === 'right' ? {opacity: 1} : {opacity: 0.3},
            ]}>
            <Text style={{marginRight: 10}}>Saque</Text>
            <Raquet height={40} width={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.sideContainer}>
          <Text style={[styles.text, styles.textSide]}>ESQUERDA</Text>
          <Text style={[styles.text, styles.textSide]}>DIREITA</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header hasBack text="SORTEIO" navigation={navigation} />
      <View>
        <View style={styles.playersContainer}>
          <Player color="orange" name={leftPlayers?.player1} side="top" />
          {type === 'pair' && (
            <>
              <TouchableOpacity
                style={{alignItems: 'center', flexDirection: 'row'}}
                onPress={() =>
                  setLeftPlayers({
                    player1: leftPlayers?.player2,
                    player2: leftPlayers?.player1,
                  })
                }>
                <View style={styles.swapHorizontalContainer}>
                  <SwapHorizontal />
                </View>
              </TouchableOpacity>
              <Player color="orange" name={leftPlayers?.player2} side="top" />
            </>
          )}
        </View>
        <Table />
        <View style={styles.playersContainer}>
          <Player color="blue" name={rightPlayers?.player1} side="bottom" />
          {type === 'pair' && (
            <>
              <TouchableOpacity
                style={{alignItems: 'center', flexDirection: 'row'}}
                onPress={() =>
                  setRightPlayers({
                    player1: rightPlayers?.player2,
                    player2: rightPlayers?.player1,
                  })
                }>
                <View style={styles.swapHorizontalContainer}>
                  <SwapHorizontal />
                </View>
              </TouchableOpacity>
              <Player color="blue" name={rightPlayers?.player2} side="bottom" />
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="CONTINUAR"
            elevation
            onPress={() =>
              navigation.navigate('GameConfig', {
                type,
                selectedStart,
                rightPlayers,
                leftPlayers,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default SortSide;
