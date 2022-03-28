import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import Header from './../../../../components/Header/index';
import SelectInput from '../../../../components/SelectInput';
import Button from './../../../../components/Button/index';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import firebase from 'firebase';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(duration);
dayjs.extend(relativeTime);
import {useDispatch} from 'react-redux';
import {Creators as ScoreBoardActions} from '../../../../store/ducks/scoreBoard';

const schema = yup.object().shape({
  bestOf: yup.string().required('Campo Obrigatório').nullable(),
  stopOn: yup.string().required('Campo Obrigatório').nullable(),
  heating: yup.string().required('Campo Obrigatório').nullable(),
  pause: yup.string().required('Campo Obrigatório').nullable(),
  technicalInterval: yup.string().required('Campo Obrigatório').nullable(),
  medicalAssistence: yup.string().required('Campo Obrigatório').nullable(),
});

const GameConfig = ({navigation, route}) => {
  const {type, selectedStart, rightPlayers, leftPlayers} = route.params;
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bestOf: '3',
      stopOn: '11',
      heating: '100',
      pause: '60',
      technicalInterval: '60',
      medicalAssistence: '100',
    },
  });

  const onSubmit = data => {
    const dateOfTheGame = String(dayjs());

    const newGame = {
      gameType: type,
      startSide: selectedStart,
      rightPlayers: {...rightPlayers, finalScore: 0, finalGame: 0},
      leftPlayers: {...leftPlayers, finalScore: 0, finalGame: 0},
      gameFinished: false,
      saqueSettings: {
        countSaque: 1,
        saquePlayerCount: 1,
        saqueSide: selectedStart,
        saqueTeamSide: 'top',
      },
      gameTime: dayjs
        .duration({hour: 0, minute: 0, seconds: 0})
        .format('mm:ss'),
      totalGameTime: dayjs
        .duration({hour: 0, minute: 0, seconds: 0})
        .format('HH:mm:ss'),
      game: 1,
      totalThecnicalInterval: data?.technicalInterval,
      totalMedicalAssistence: data?.medicalAssistence,
      usedThecnicalInterval: 0,
      usedMedicalAssistence: 0,
      expediteSystem: false,
      sumula: {
        gameStartAt: dateOfTheGame,
        gameFinishAt: dateOfTheGame,
      },
      ...data,
    };
    const {currentUser} = firebase.auth();

    firebase
      .database()
      .ref(`/umpires/${currentUser.uid}/games`)
      .push(newGame)
      .then(response => {
        dispatch(ScoreBoardActions.setGameId(response.getKey()));
        navigation.navigate('WarmUp', {
          warmUp: data.heating,
        });
      })
      .catch(() => console.log('erro ao salvar'));
  };

  return (
    <ScrollView style={styles.container}>
      <Header text="CONFIGURAÇÕES" hasBack navigation={navigation} />
      <Text style={styles.sectionTitle}>Pontuação</Text>
      <SelectInput
        label="Melhor de"
        name="bestOf"
        defaultValue={'3'}
        control={control}
        errors={errors}
        items={[
          {label: '3 games', value: '3'},
          {label: '5 games', value: '5'},
          {label: '7 games', value: '7'},
          {label: '9 games', value: '9'},
        ]}
      />
      <SelectInput
        label="Game fecha em"
        name="stopOn"
        control={control}
        errors={errors}
        items={[
          {label: '5 pontos', value: '5'},
          {label: '10 pontos', value: '10'},
          {label: '11 pontos', value: '11'},
          {label: '12 pontos', value: '12'},
        ]}
      />
      <Text style={styles.sectionTitle}>Intervalos</Text>
      <SelectInput
        label="Aquecimento"
        name="heating"
        control={control}
        errors={errors}
        items={[
          {label: '5 segundos', value: '5'},
          {label: '100 segundos', value: '100'},
          {label: '110 segundos', value: '110'},
          {label: '120 segundos', value: '120'},
          {label: '125 segundos', value: '125'},
          {label: '130 segundos', value: '130'},
        ]}
      />
      <SelectInput
        label="Pausa entre games"
        name="pause"
        control={control}
        errors={errors}
        items={[
          {label: '5 segundos', value: '5'},
          {label: '60 segundos', value: '60'},
          {label: '65 segundos', value: '65'},
          {label: '70 segundos', value: '70'},
          {label: '75 segundos', value: '75'},
          {label: '80 segundos', value: '80'},
        ]}
      />
      <SelectInput
        label="Intervalo Técnico"
        name="technicalInterval"
        control={control}
        errors={errors}
        items={[
          {label: '10 segundos', value: '10'},
          {label: '60 segundos', value: '60'},
          {label: '65 segundos', value: '65'},
          {label: '70 segundos', value: '70'},
          {label: '75 segundos', value: '75'},
          {label: '80 segundos', value: '80'},
        ]}
      />
      <SelectInput
        label="Assistência médica"
        name="medicalAssistence"
        control={control}
        errors={errors}
        items={[
          {label: '10 segundos', value: '10'},
          {label: '100 segundos', value: '100'},
          {label: '110 segundos', value: '110'},
          {label: '120 segundos', value: '120'},
          {label: '125 segundos', value: '125'},
          {label: '130 segundos', value: '130'},
        ]}
      />
      <View style={styles.buttonContainer}>
        <Button
          label="CRIAR PARTIDA"
          elevation
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
};

export default GameConfig;
