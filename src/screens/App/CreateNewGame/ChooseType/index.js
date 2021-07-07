/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LeftArrow from '../../../../assets/icons/left_arrow.svg';
import PlayerOne from '../../../../assets/icons/player_1.svg';
import Pair from '../../../../assets/icons/pair.svg';
import DropShadow from 'react-native-drop-shadow';
import Button from './../../../../components/Button/index';
import styles from './styles';

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 12,
};

const ChooseType = ({navigation}) => {
  const [selected, setSelected] = useState('');

  const renderType = type => {
    return (
      <View style={{opacity: type === selected ? 1 : 0.5}}>
        <DropShadow style={shadowStyle}>
          <View
            style={[
              styles.card,
              type === selected
                ? type === 'single'
                  ? styles.selectedBlueCard
                  : styles.selectedOrangeCard
                : styles.normalCard,
            ]}>
            <Text style={[styles.text, styles.title]}>
              {type === 'single' ? 'SIMPLES' : 'DUPLAS'}
            </Text>
            <View style={styles.iconContainer}>
              <View style={styles.icon}>
                {type === 'single' ? (
                  <PlayerOne height={40} width={40} />
                ) : (
                  <Pair height={50} width={50} />
                )}
              </View>
              <Text style={[styles.text, styles.vsText]}>VS</Text>
              <View style={styles.icon}>
                {type === 'single' ? (
                  <PlayerOne height={40} width={40} />
                ) : (
                  <Pair height={50} width={50} />
                )}
              </View>
            </View>
          </View>
        </DropShadow>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.backButton}>
          <LeftArrow />
        </View>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Tipo de partida</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => setSelected('single')}>
          {renderType('single')}
        </TouchableOpacity>
        <View style={styles.orText}>
          <Text style={styles.text}>OU</Text>
        </View>
        <TouchableOpacity onPress={() => setSelected('pair')}>
          {renderType('pair')}
        </TouchableOpacity>
        <View />
        <View style={styles.buttonContainer}>
          <Button
            label="CONTINUAR"
            elevation
            disabled={selected === ''}
            onPress={() => console.log(selected)}
          />
        </View>
      </View>
    </View>
  );
};

export default ChooseType;
