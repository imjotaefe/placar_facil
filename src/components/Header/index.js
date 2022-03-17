/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import LeftArrow from '../../assets/icons/left_arrow.svg';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';

function Header({navigation, hasBack, text, onClickAddFunction}) {
  return (
    <View style={{paddingTop: 5}}>
      {hasBack && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            onClickAddFunction();
          }}>
          <View style={styles.backButton}>
            <LeftArrow />
          </View>
        </TouchableOpacity>
      )}
      <View style={[styles.header, {marginTop: hasBack ? -23 : 0}]}>
        <Text style={styles.titleHeader}>{text}</Text>
      </View>
    </View>
  );
}

export default Header;
