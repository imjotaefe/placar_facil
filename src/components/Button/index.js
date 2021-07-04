import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Button = ({label, onPress, disabled, elevation, ...props}) => {
  const checkStyle = () => {
    if (disabled) {
      return styles.disabledContainer;
    }
    return [styles.container, {elevation: elevation ? 9 : 0}];
  };
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={checkStyle()}
      disabled={disabled}>
      <Text style={disabled ? styles.disabledText : styles.buttonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
