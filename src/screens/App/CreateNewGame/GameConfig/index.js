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

const schema = yup.object().shape({
  bestOf: yup.string().required('Campo Obrigatório'),
  stopOn: yup.string().required('Campo Obrigatório'),
  heating: yup.string().required('Campo Obrigatório'),
  pause: yup.string().required('Campo Obrigatório'),
  technicalInterval: yup.string().required('Campo Obrigatório'),
  medicalAssistence: yup.string().required('Campo Obrigatório'),
  intervalAtSix: yup.string().required('Campo Obrigatório'),
  aceleration: yup.string().required('Campo Obrigatório'),
  advantage: yup.string().required('Campo Obrigatório'),
});

const GameConfig = ({navigation, route}) => {
  const {type, selectedStart, rightPlayers, leftPlayers} = route.params;
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bestOf: null,
      stopOn: null,
      heating: null,
      pause: null,
      technicalInterval: null,
      medicalAssistence: null,
      intervalAtSix: null,
      aceleration: null,
      advantage: null,
    },
  });

  const onSubmit = data => {
    console.log('-----------------');
    console.log(type);
    console.log(selectedStart);
    console.log(rightPlayers);
    console.log(leftPlayers);
    console.log('-----------------');
    console.log(data);

    const dateOfTheGame = String(dayjs());

    const newGame = {
      gameType: type,
      startSide: selectedStart,
      rightPlayers: {...rightPlayers, finalScore: 0},
      leftPlayers: {...leftPlayers, finalScore: 0},
      gameStartAt: dateOfTheGame,
      gameFinishAt: dateOfTheGame,
      ...data,
    };
    const {currentUser} = firebase.auth();

    firebase
      .database()
      .ref(`/umpires/${currentUser.uid}/games`)
      .push(newGame)
      .then(() => console.log('foi salvo'))
      .catch(() => console.log('erro ao salvar'));
  };

  return (
    <ScrollView style={styles.container}>
      <Header text="CONFIGURAÇÕES" hasBack navigation={navigation} />
      <Text style={styles.sectionTitle}>Pontuação</Text>
      <SelectInput
        label="Melhor de"
        name="bestOf"
        control={control}
        items={[
          {label: '3', value: '3'},
          {label: '5', value: '5'},
          {label: '7', value: '7'},
          {label: '9', value: '9'},
        ]}
      />
      <SelectInput
        label="Game fecha em"
        name="stopOn"
        control={control}
        items={[
          {label: '10', value: '10'},
          {label: '11', value: '11'},
          {label: '12', value: '12'},
        ]}
      />
      <Text style={styles.sectionTitle}>Intervalos</Text>
      <SelectInput
        label="Aquecimento"
        name="heating"
        control={control}
        items={[
          {label: '100', value: '100'},
          {label: '110', value: '110'},
          {label: '120', value: '120'},
          {label: '125', value: '125'},
          {label: '130', value: '130'},
        ]}
      />
      <SelectInput
        label="Pausa entre games"
        name="pause"
        control={control}
        items={[
          {label: '60', value: '60'},
          {label: '65', value: '65'},
          {label: '70', value: '70'},
          {label: '75', value: '75'},
          {label: '80', value: '80'},
        ]}
      />
      <SelectInput
        label="Intervalo Técnico"
        name="technicalInterval"
        control={control}
        items={[
          {label: '60', value: '60'},
          {label: '65', value: '65'},
          {label: '70', value: '70'},
          {label: '75', value: '75'},
          {label: '80', value: '80'},
        ]}
      />
      <SelectInput
        label="Assistência médica"
        name="medicalAssistence"
        control={control}
        items={[
          {label: '100', value: '100'},
          {label: '110', value: '110'},
          {label: '120', value: '120'},
          {label: '125', value: '125'},
          {label: '130', value: '130'},
        ]}
      />
      <SelectInput
        label="Intervalo a cada 6 pts"
        name="intervalAtSix"
        control={control}
        items={[
          {label: '60', value: '60'},
          {label: '65', value: '65'},
          {label: '70', value: '70'},
          {label: '75', value: '75'},
          {label: '80', value: '80'},
        ]}
      />
      <SelectInput
        label="Sistema de aceleração"
        name="aceleration"
        control={control}
        items={[
          {label: '3500', value: '3500'},
          {label: '3600', value: '3600'},
          {label: '3700', value: '3700'},
          {label: '3800', value: '3800'},
          {label: '3900', value: '3900'},
          {label: '4000', value: '4000'},
        ]}
      />
      <Text style={styles.sectionTitle}>Vantagens</Text>
      <SelectInput
        label="Vantagem"
        name="advantage"
        control={control}
        items={[
          {label: 'No início da partida', value: 'start'},
          {label: 'No meio da partida', value: 'middle'},
          {label: 'No final da partida', value: 'end'},
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
