import React from 'react';
import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '../../assets/lottie/loadingBall.json';
import styles from './styles';

const Loading = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        source={LoadingAnimation}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
};

export default Loading;
