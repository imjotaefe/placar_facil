import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const ErrorInput = ({error}) => {
  return (
    <View>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};

export default ErrorInput;
