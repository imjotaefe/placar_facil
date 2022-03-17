/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {database, auth} from '../../../service/firebase';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {ScrollView} from 'react-native';
import Header from './../../../components/Header/index';
import styles from './styles';
import ErrorInput from './../../../components/ErrorInput/index';
import Input from './../../../components/Input/index';
import Button from './../../../components/Button/index';
import {updateGameData} from '../../../utils/HandleGame';
import {useDispatch} from 'react-redux';
import {Creators as ScoreBoardActions} from '../../../store/ducks/scoreBoard';

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

const AlterNames = ({navigation}) => {
  const {gameId, playersName} = useSelector(({scoreBoard}) => scoreBoard);
  const [gameData, setGameData] = useState({});
  const [type, setType] = useState('');
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: {errors},
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(type === 'single' ? singleSchema : pairSchema),
    defaultValues:
      type === 'single'
        ? {player1: '', player2: ''}
        : {player1: '', player2: '', player3: '', player4: ''},
  });

  useEffect(async () => {
    dispatch(ScoreBoardActions.setAlteringNames(true));
    const {currentUser} = auth;
    await database
      .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
      .once('value', data => {
        setGameData(data.val());
        setType(data.val().gameType);
      });
  }, []);

  useEffect(() => {
    if (gameData) {
      setValue('player1', playersName?.left?.player1);
      setValue('player2', playersName?.left?.player2);
      if (type === 'pair') {
        setValue('player3', playersName?.right?.player1);
        setValue('player4', playersName?.right?.player2);
      }
    }
  }, [gameData]);

  const onSubmit = data => {
    let team1;
    let team2;
    if (type === 'pair') {
      team1 = {
        player1: data.player1.toUpperCase(),
        player2: data.player2.toUpperCase(),
      };
      team2 = {
        player1: data.player3.toUpperCase(),
        player2: data.player4.toUpperCase(),
      };
    } else {
      team1 = {player1: data.player1.toUpperCase()};
      team2 = {player1: data.player2.toUpperCase()};
    }
    var game;
    const {currentUser} = auth;
    database
      .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
      .on('value', snapshot => {
        game = snapshot.val();
      });

    updateGameData({
      data: {
        leftPlayers: {...game.leftPlayers, ...team1},
        rightPlayers: {...game.rightPlayers, ...team2},
      },
      gameId,
    });
    dispatch(
      ScoreBoardActions.setPlayersName({
        left: team1,
        right: team2,
      }),
    );
    dispatch(ScoreBoardActions.setAlteringNames(false));
    navigation.goBack();
  };

  const renderInputs = type => {
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
      <Header
        hasBack
        text="JOGADORES"
        navigation={navigation}
        onClickAddFunction={() =>
          dispatch(ScoreBoardActions.setAlteringNames(false))
        }
      />
      <View>
        {renderInputs(type)}
        <View style={styles.buttonContainer}>
          <Button label="ALTERAR" elevation onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScrollView>
  );
};

export default AlterNames;
