import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Eye from '../../assets/icons/eye.svg';
import ClosedEye from '../../assets/icons/closed_eye.svg';
import {useState} from 'react';

const Input = ({label, isPassword, isEmail, ...props}) => {
  const [safe, setSafe] = useState(isPassword);

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <TextInput
          {...props}
          style={styles.input}
          secureTextEntry={safe}
          placeholderTextColor="#CECECE"
          keyboardType={isEmail && 'email-address'}
        />
        {isPassword && (
          <TouchableOpacity style={styles.icon} onPress={() => setSafe(!safe)}>
            {safe ? <Eye /> : <ClosedEye />}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Input;
