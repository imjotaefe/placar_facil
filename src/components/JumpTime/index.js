import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const JumpTime = ({action}) => {
  return (
    <View style={styles.nextButtonContainer}>
      <TouchableOpacity onPress={() => action()}>
        <Text style={styles.nextButtonText}>Pular</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JumpTime;
