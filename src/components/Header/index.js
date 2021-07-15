import React from 'react';
import LeftArrow from '../../assets/icons/left_arrow.svg';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';

function Header({navigation, hasBack, text}) {
  return (
    <>
      {hasBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <LeftArrow />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.header}>
        <Text style={styles.titleHeader}>{text}</Text>
      </View>
    </>
  );
}

export default Header;
