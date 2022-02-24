import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colors} from '../../utils';
import styles from './styles';

const Button = ({
  label,
  onPress,
  disabled,
  elevation,
  backgroundColor,
  color,
  ...props
}) => {
  const checkStyle = () => {
    if (disabled) {
      return styles.disabledContainer;
    }
    return [
      styles.container,
      {
        elevation: elevation ? 9 : 0,
        backgroundColor: backgroundColor ? backgroundColor : colors.orange,
      },
    ];
  };
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={checkStyle()}
      disabled={disabled}>
      <Text
        style={{
          ...(disabled ? styles.disabledText : styles.buttonText),
          color: color ? color : colors.dark,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
