/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import LeftArrow from '../../../../assets/icons/left_arrow.svg';
import styles from './styles';
import {LineChart} from 'react-native-chart-kit';
const initialScreenWidth = Dimensions.get('window').width;
import Close from '../../../../assets/icons/close.svg';
import VerticalDots from '../../../../assets/icons/verticalDots.svg';
import Modal from 'react-native-modal';
import colors from './../../../../utils/colors';

const chartConfig = {
  backgroundGradientFrom: colors.weakBlue,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: colors.weakOrange,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 1,
  barPercentage: 0.5,
  useShadowColorFromDataset: true,
};

const Graph = ({navigation, route}) => {
  const {gameData} = route.params;
  const [modalisVisible, setModalIsVisible] = useState(false);
  const [typeSelected, setTypeSelected] = useState('jogo');
  const yLabelIterator = yLabel();
  let count = 0;
  const [leftScoreArray, setLeftScoreArray] = useState([0]);
  const [rightScoreArray, setRightScoreArray] = useState([0]);
  const [screenWidth, setScreenWidth] = useState(initialScreenWidth);
  const [gameSelected, setGameSelected] = useState(1);
  const [games, setGames] = useState([]);

  useEffect(() => {
    let gameArrayLength = null;
    if (typeSelected === 'jogo') {
      gameArrayLength = getInfoAboutGeralGame();
    } else {
      gameArrayLength = getInfoAboutSelectedGame();
    }

    const gamesLocal = new Array(
      gameArrayLength ? Number(gameArrayLength) : Number(gameData?.bestOf),
    )
      .fill(0)
      .map(item => {
        count++;
        return item + count;
      });

    setGames(gamesLocal);
  }, [typeSelected, gameSelected]);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      setScreenWidth(width);
    });
  }, []);

  const getInfoAboutSelectedGame = () => {
    const game = gameData?.sumula[gameSelected];
    if (!game) {
      return null;
    }

    const gameArray = Object.keys(game).flatMap(function (key) {
      return key !== 'gameFinishedAt' && key !== 'expediteSystemWasUsed'
        ? game[key]
        : [];
    });
    const lastPoint = gameArray[gameArray.length - 1];

    const localLength =
      lastPoint.leftScore > lastPoint.rightScore
        ? lastPoint.leftScore
        : lastPoint.rightScore;

    let leftScore = [0];
    let rightScore = [0];

    gameArray.forEach(item => {
      leftScore.push(item.leftScore);
      rightScore.push(item.rightScore);
    });

    setLeftScoreArray(leftScore);
    setRightScoreArray(rightScore);

    return localLength;
  };

  const getInfoAboutGeralGame = () => {
    let leftScore = [0];
    let rightScore = [0];

    const gamesSets = Object.keys(gameData?.sumula).flatMap(function (key) {
      if (key !== 'gameFinishAt' && key !== 'gameStartAt') {
        return Number(key);
      } else {
        return [];
      }
    });

    gamesSets.forEach(game => {
      const gameInfo = gameData?.sumula[game];
      if (!gameInfo) {
        return null;
      }

      const gameArray = Object.keys(gameInfo).flatMap(function (key) {
        return key !== 'gameFinishedAt' && key !== 'expediteSystemWasUsed'
          ? gameInfo[key]
          : [];
      });

      if (
        gameArray[gameArray.length - 1]?.leftScore >
        gameArray[gameArray.length - 1]?.rightScore
      ) {
        leftScore.push(leftScore[leftScore.length - 1] + 1);
        rightScore.push(rightScore[rightScore.length - 1]);
      } else {
        rightScore.push(rightScore[rightScore.length - 1] + 1);
        leftScore.push(leftScore[leftScore.length - 1]);
      }
    });

    setLeftScoreArray(leftScore);
    setRightScoreArray(rightScore);

    return null;
  };

  function* yLabel() {
    yield* [0, ...games];
  }

  const data = {
    labels: [''],
    datasets: [
      {
        data: leftScoreArray || [],
        color: () => colors.blue,
        strokeWidth: 2,
      },
      {
        data: rightScoreArray || [],
        color: () => colors.orange,
        strokeWidth: 2,
      },
    ],
    legend: [
      `${gameData.leftPlayers.player1} ${
        gameData?.leftPlayers?.player2 ? '+' : ''
      } ${gameData?.leftPlayers?.player2 || ''}`,
      `${gameData.rightPlayers.player1} ${
        gameData?.rightPlayers?.player2 ? '+' : ''
      } ${gameData?.rightPlayers?.player2 || ''}`,
    ],
  };

  const renderModal = () => {
    const options = ['jogo', 'game'];
    const gamesOptions = new Array(Number(gameData?.game - 1)).fill(1);
    return (
      <Modal isVisible={modalisVisible}>
        <View style={styles.modal}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalIsVisible(false)}>
              <Close />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.modalTitle}>
              {typeSelected === 'game'
                ? 'Escolha um game'
                : 'Visualizar o gráfico por'}
            </Text>
            {typeSelected !== 'game' ? (
              <View style={styles.gameButtonContainer}>
                {options.map(item => (
                  <TouchableOpacity
                    onPress={() => setTypeSelected(item)}
                    style={{
                      ...styles.optionContainer,
                      backgroundColor:
                        typeSelected === item ? colors.orange : colors.gray,
                    }}>
                    <Text style={styles.option}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setTypeSelected('jogo');
                    setModalIsVisible(false);
                  }}
                  style={{marginVertical: 10}}>
                  <Text>Voltar</Text>
                </TouchableOpacity>
                <View style={styles.gameButtonContainer}>
                  {gamesOptions.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setGameSelected(index + 1);
                        setModalIsVisible(false);
                      }}
                      style={{
                        ...styles.gameButton,
                        backgroundColor:
                          gameSelected === index + 1
                            ? colors.orange
                            : colors.gray,
                      }}>
                      <Text style={styles.gameButtonText}>{index + item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrow />
          </TouchableOpacity>
          <View style={styles.textHeaderContainer}>
            <Text style={styles.title}>
              {typeSelected === 'jogo'
                ? 'GRRÁFICO GERAL'
                : `GRÁFICO DO GAME ${gameSelected}`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalIsVisible(true)}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
            <VerticalDots />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.graphContainer}>
        <LineChart
          data={data}
          width={screenWidth}
          height={games.length > 8 ? games?.length * 40 : 300}
          formatYLabel={() => yLabelIterator.next().value}
          chartConfig={chartConfig}
          yAxisInterval={2}
          fromZero={true}
          segments={games?.length}
          withVerticalLines={true}
        />
        {renderModal()}
      </View>
    </ScrollView>
  );
};

export default Graph;
