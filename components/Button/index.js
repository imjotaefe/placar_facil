import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Button = ({label, onPress, ...props}) => {
  return (
    <TouchableOpacity {...props} onPress={onPress} style={styles.container}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
