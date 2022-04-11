import React from 'react';
import {View, Image, StatusBar} from 'react-native';
import Icon from '../../assets/images/icon.png';
import styles from './styles';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image source={Icon} style={{marginTop: StatusBar.currentHeight}} />
    </View>
  );
};

export default Loading;
