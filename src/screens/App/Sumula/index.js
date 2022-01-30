import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {database, auth} from '../../../service/firebase';
import styles from './styles';
import LeftArrow from '../../../assets/icons/left_arrow.svg';
import colors from './../../../utils/colors';
import PlayerOne from '../../../assets/icons/player_1.svg';
import PlayerTwo from '../../../assets/icons/player_2.svg';
import Graph from '../../../assets/icons/graph.svg';

const Sumula = ({navigation, route}) => {
  const {gameId} = route.params;
  console.log('gameId', gameId);
  const [gameData, setGameData] = useState(null);
  const [gameSelected, setGameSelected] = useState(1);

  useEffect(() => {
    const {currentUser} = auth;
    database
      .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
      .once('value', data => {
        setGameData(data.val());
      });
  }, []);

  const renderPlayers = () => {
    return (
      <View style={styles.playersContainer}>
        <View style={styles.playersTeamContainer}>
          <PlayerOne width={25} height={25} />
          <View style={styles.players}>
            <Text style={styles.playerText}>
              {gameData?.leftPlayers?.player1}
            </Text>
            {gameData?.leftPlayers?.player2 && (
              <Text style={styles.playerText}>
                {gameData?.leftPlayers?.player2}{' '}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.playersTeamContainer}>
          <View style={styles.players}>
            <Text style={styles.playerText}>
              {gameData?.rightPlayers?.player1}
            </Text>
            {gameData?.rightPlayers?.player2 && (
              <Text style={styles.playerText}>
                {gameData?.rightPlayers?.player2}{' '}
              </Text>
            )}
          </View>
          <PlayerTwo width={25} height={25} />
        </View>
      </View>
    );
  };

  const renderGames = () => {
    if (gameData) {
      const games = new Array(Number(gameData?.game - 1)).fill(1);

      return (
        <View style={styles.gameButtonContainer}>
          <Text style={styles.selectGame}>GAME: </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={games}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => setGameSelected(index + 1)}
                style={{
                  ...styles.gameButton,
                  backgroundColor:
                    gameSelected === index + 1 ? colors.orange : colors.gray,
                }}>
                <Text style={styles.gameButtonText}>{index + item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
  };

  const Point = ({item, index}) => {
    return (
      <View style={styles.pointContainer}>
        <View style={styles.pointTextContainer}>
          <Text style={styles.pointTextLeft}>{item.leftScore}</Text>
          <Text style={styles.pointTextX}>X</Text>
          <Text style={styles.pointTextRight}>{item.rightScore}</Text>
        </View>
        <View style={styles.pointTimeContainer}>
          <Text style={styles.pointTimeText}>{item?.time}</Text>
        </View>
      </View>
    );
  };

  const renderSumula = () => {
    const game = gameData?.sumula[gameSelected];
    if (!game) {
      return null;
    }

    const gameArray = Object.keys(game).flatMap(function (key) {
      return key !== 'gameFinishedAt' ? game[key] : [];
    });

    return (
      <View>
        <FlatList
          data={gameArray}
          ListFooterComponent={<View style={{height: 300}} />}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => <Point item={item} index={index} />}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftArrow />
        </TouchableOpacity>
        <View style={styles.textHeaderContainer}>
          <Text style={styles.title}>SUMULA</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Graph', {gameData})}>
          <Graph />
        </TouchableOpacity>
      </View>
      {renderPlayers()}
      {renderGames()}
      {renderSumula()}
    </View>
  );
};

export default Sumula;
