/* eslint-disable no-sparse-arrays */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Search from '../../../assets/icons/search.svg';
import Hamburguer from '../../../assets/icons/hamb.svg';
import Logo from '../../../assets/icons/logo.svg';
import styles from './styles';
import HistoryCard from '../../../components/HistoryCard';
import Button from '../../../components/Button';

import {database, auth} from '../../../service/firebase';
import colors from './../../../utils/colors';

const Home = ({navigation}) => {
  const [games, setGames] = useState(null);
  const [showType, setShowType] = useState('FINISHED');

  useEffect(() => {
    const {currentUser} = auth;
    database.ref(`/umpires/${currentUser.uid}/games`).on('value', snapshot => {
      setGames(snapshot.val());
    });
  }, []);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity>
          <Search />
        </TouchableOpacity>
        <Logo />
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Hamburguer />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={styles.historyContainer}>
        <Text style={styles.title}>
          {showType === 'FINISHED'
            ? 'Historico de partidas'
            : 'Partidas em andamento'}
        </Text>
        <View style={styles.switchButtonContainer}>
          <TouchableOpacity
            onPress={() => setShowType('FINISHED')}
            style={[
              {
                backgroundColor:
                  showType === 'FINISHED' ? colors.orange : colors.gray,
              },
              styles.switchButton,
              ,
            ]}>
            <Text
              style={{
                fontWeight: '700',
                color: showType === 'INPROGRESS' ? colors.darkgray : '#000',
              }}>
              FINALIZADAS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowType('INPROGRESS')}
            style={[
              {
                backgroundColor:
                  showType === 'INPROGRESS' ? colors.orange : colors.gray,
              },
              styles.switchButton,
              ,
            ]}>
            <Text
              style={{
                fontWeight: '700',
                color: showType === 'FINISHED' ? colors.darkgray : '#000',
              }}>
              EM ANDAMENTO
            </Text>
          </TouchableOpacity>
        </View>

        {showType === 'INPROGRESS' ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flat}
            data={games ? Object.values(games) : []}
            renderItem={({item, index}) => {
              if (!item.gameFinished) {
                return index === 6 ? (
                  <View style={styles.spacer} />
                ) : (
                  <HistoryCard
                    game={item}
                    gameId={Object.keys(games)[index]}
                    navigation={navigation}
                  />
                );
              }
            }}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flat}
            data={games ? Object.values(games) : []}
            renderItem={({item, index}) => {
              if (item.gameFinished) {
                return index === 6 ? (
                  <View style={styles.spacer} />
                ) : (
                  <HistoryCard
                    game={item}
                    gameId={Object.keys(games)[index]}
                    navigation={navigation}
                  />
                );
              }
            }}
          />
        )}
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <View style={styles.centerButton}>
            <Button
              label="NOVA PARTIDA"
              elevation
              onPress={() => navigation.navigate('ChooseType')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;
