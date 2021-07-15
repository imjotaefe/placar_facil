/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import PlayerOne from '../../../../assets/icons/player_1.svg';
import Pair from '../../../../assets/icons/pair.svg';
import DropShadow from 'react-native-drop-shadow';
import Button from '../../../../components/Button';
import styles from './styles';
import {Controller} from 'react-hook-form';
import ErrorInput from '../../../../components/ErrorInput';
import Input from '../../../../components/Input';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Header from '../../../../components/Header/index';
import {Text} from 'react-native';
import {ScrollView} from 'react-native';

const singleSchema = yup.object().shape({
  player1: yup.string().required('Campo Obrigatório'),
  player2: yup.string().required('Campo Obrigatório'),
});

const pairSchema = yup.object().shape({
  player1: yup.string().required('Campo Obrigatório'),
  player2: yup.string().required('Campo Obrigatório'),
  player3: yup.string().required('Campo Obrigatório'),
  player4: yup.string().required('Campo Obrigatório'),
});

const TypeNames = ({navigation, route}) => {
  const {type} = route.params;
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({
    resolver: yupResolver(type === 'single' ? singleSchema : pairSchema),
    defaultValues:
      type === 'single'
        ? {player1: '', player2: ''}
        : {player1: '', player2: '', player3: '', player4: ''},
  });

  const onSubmit = data => {
    let team1;
    let team2;
    if (type === 'pair') {
      team1 = {player1: data.player1, player2: data.player2};
      team2 = {player1: data.player3, player2: data.player4};
    } else {
      team1 = {player1: data.player1};
      team2 = {player1: data.player2};
    }
    navigation.navigate('SortSide', {team1, team2, type});
  };

  const renderSingleInput = type => {
    const singleType = [
      {
        label: 'Jogador 1',
        name: 'player1',
      },
      {
        label: 'Jogador 2',
        name: 'player2',
      },
    ];
    const pairType = [
      {
        label: 'Jogador 1',
        name: 'player1',
      },
      {
        label: 'Jogador 2',
        name: 'player2',
      },
      {
        label: 'Jogador 3',
        name: 'player3',
      },
      {
        label: 'Jogador 4',
        name: 'player4',
      },
    ];
    return (
      <>
        {(type === 'single' ? singleType : pairType).map((item, index) => (
          <>
            {type === 'single' && index === 1 && (
              <View style={styles.orText}>
                <Text style={styles.text}>VS</Text>
              </View>
            )}
            {type === 'pair' && index === 2 && (
              <View style={styles.orText}>
                <Text style={styles.text}>VS</Text>
              </View>
            )}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name={item.name}
                defaultValue=""
                render={({field: {onChange, value}}) => (
                  <Input
                    onChangeText={text => onChange(text)}
                    name={item.name}
                    value={value}
                    placeholder="Nome do jogador"
                    label={item.label}
                    isEmail
                  />
                )}
              />
              <ErrorInput error={errors?.[item.name]?.message} />
            </View>
          </>
        ))}
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Header hasBack text="JOGADORES" navigation={navigation} />
      <View>
        {renderSingleInput(type)}
        <View style={styles.buttonContainer}>
          <Button
            label="CONTINUAR"
            elevation
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TypeNames;
