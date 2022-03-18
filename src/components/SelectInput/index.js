import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import {colors} from '../../utils';
import {Controller} from 'react-hook-form';
import ErrorInput from './../ErrorInput/index';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.darkgray,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const SelectInput = ({label, items, halfItem, control, name, errors}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({field: {onChange, value}}) => (
        <>
          <View
            style={[
              styles.container,
              {maxWidth: halfItem && 130, marginRight: halfItem && 15},
            ]}>
            <Text style={styles.label}>{label}</Text>
            <RNPickerSelect
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              onValueChange={value => onChange(value)}
              items={items}
            />
          </View>
          <ErrorInput error={errors?.[name]?.message} />
        </>
      )}
    />
  );
};

export default SelectInput;
