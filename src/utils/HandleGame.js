import dayjs from 'dayjs';
import {database, auth} from '../service/firebase';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
import {Creators as ScoreBoardActions} from '../store/ducks/scoreBoard';

const changeGame = (setPauseBetweenGames, setIsExpediteSystem) => {
  setPauseBetweenGames(true);
  setIsExpediteSystem(false);
};

const updateTimeConfig = async ({timeConfig, gameId}) => {
  await updateGameData({
    data: {
      totalGameTime: timeConfig?.totalGameTime?.format('HH:mm:ss'),
      gameTime: timeConfig?.gameTime?.format('mm:ss'),
    },
    gameId,
  });
};

const handleSide = ({
  newScore,
  side,
  leftTeamScore,
  rightTeamScore,
  isBestOfTwo,
  gameData,
  setIsBestOfTwo,
  setLoadingData,
  game,
  setGame,
  setIsChangingGame,
  gameId,
  timeConfig,
  resetTimer,
  setPauseBetweenGames,
  setIsExpediteSystem,
  isExpediteSystem,
  dispatch,
}) => {
  if (!isBestOfTwo) {
    console.log('newScore: ', newScore);
    console.log('stop on', gameData?.stopOn);
    if (newScore === Number(gameData?.stopOn)) {
      changeGame(setPauseBetweenGames, setIsExpediteSystem);
      return changeSides({
        game,
        setGame,
        setLoadingData,
        setIsChangingGame,
        gameId,
        side,
        timeConfig,
        resetTimer,
        isExpediteSystem,
        dispatch,
      });
    }
  }
  if (isBestOfTwo) {
    if (gameData && side === 'right' && newScore - 2 === leftTeamScore) {
      changeGame(setPauseBetweenGames, setIsExpediteSystem);
      setIsBestOfTwo(false);
      return changeSides({
        gameId,
        game,
        setGame,
        side: 'right',
        setLoadingData,
        setIsChangingGame,
        timeConfig,
        resetTimer,
        isExpediteSystem,
        dispatch,
      });
    }
    if (gameData && side === 'left' && newScore - 2 === rightTeamScore) {
      changeGame(setPauseBetweenGames, setIsExpediteSystem);
      setIsBestOfTwo(false);
      return changeSides({
        gameId,
        game,
        setGame,
        side: 'left',
        setLoadingData,
        setIsChangingGame,
        timeConfig,
        resetTimer,
        isExpediteSystem,
        dispatch,
      });
    }
  }
  return false;
};

const changeSides = async ({
  setGame,
  game,
  setLoadingData,
  gameId,
  timeConfig,
  side,
  resetTimer,
  isExpediteSystem,
  dispatch,
}) => {
  dispatch(ScoreBoardActions.setRightScore(0));
  dispatch(ScoreBoardActions.setLeftScore(0));
  resetTimer();

  var pastGame;
  const {currentUser} = auth;
  database
    .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
    .on('value', snapshot => {
      pastGame = snapshot.val();
    });
  setLoadingData(true);
  const data = {
    gameTime: '00:00',
    game: pastGame.game + 1,
    sumula: {
      ...pastGame.sumula,
      [`${game}`]: {
        ...pastGame.sumula[game],
        gameFinishedAt: timeConfig?.gameTime?.format('mm:ss'),
        expediteSystemWasUsed: isExpediteSystem,
      },
    },
    leftPlayers: {
      ...pastGame.leftPlayers,
      finalScore: 0,
      finalGame:
        side === 'left'
          ? Number(pastGame.leftPlayers.finalGame + 1)
          : Number(pastGame.leftPlayers.finalGame),
    },
    rightPlayers: {
      ...pastGame.rightPlayers,
      finalScore: 0,
      finalGame:
        side === 'right'
          ? Number(pastGame.rightPlayers.finalGame + 1)
          : Number(pastGame.rightPlayers.finalGame),
    },
  };

  await updateGameData({data, gameId});

  setGame(game + 1);
  setLoadingData(false);
};

const updateGameData = async ({data, gameId}) => {
  const {currentUser} = auth;
  if (gameId) {
    return await database
      .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
      .update(data)
      .then(() => true)
      .catch(() => false);
  }
};

const saveSumula = async ({
  leftScore,
  rightScore,
  time,
  game,
  gameId,
  pointId,
}) => {
  var pastSumula;
  const {currentUser} = auth;
  database
    .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
    .on('value', snapshot => {
      pastSumula = snapshot.val();
    });
  const data = {
    sumula: {
      ...pastSumula.sumula,
      [`${game}`]: {
        ...pastSumula.sumula[game],
        [`${Number(time.format('HHmmss') * pointId)}`]: {
          rightScore,
          leftScore,
          time: time.format('HH:mm:ss'),
        },
      },
    },
  };
  await updateGameData({data, gameId});
};

const checkGameShouldRotate = ({game, optionOne, optionTwo}) => {
  if (game !== 1) {
    return game % 2 === 0 ? optionOne : optionTwo;
  }
  return optionTwo;
};

const updateSaqueSettings = async ({
  countSaqueSetting,
  saquePlayerCountSetting,
  saqueSideSetting,
  saqueTeamSideSetting,
  gameId,
}) => {
  const data = {
    saqueSettings: {
      countSaque: countSaqueSetting,
      saquePlayerCount: saquePlayerCountSetting,
      saqueSide: saqueSideSetting,
      saqueTeamSide: saqueTeamSideSetting,
    },
  };
  await updateGameData({data, gameId});
};

const handleSaqueSide = ({
  type,
  setSaqueSettings,
  saqueSettings,
  gameId,
  gameData,
  isExpediteSystem,
}) => {
  let countSaqueSetting = saqueSettings?.countSaque;
  let saquePlayerCountSetting = saqueSettings?.saquePlayerCount;
  let saqueSideSetting = saqueSettings?.saqueSide;
  let saqueTeamSideSetting = saqueSettings?.saqueTeamSide;
  const saqueValueDivisor = isExpediteSystem ? 1 : 2;

  if (type === 'add') {
    countSaqueSetting = saqueSettings?.countSaque + 1;
    if (saqueSettings?.countSaque % saqueValueDivisor === 0) {
      saqueSideSetting = saqueSettings?.saqueSide === 'left' ? 'right' : 'left';
      if (gameData?.gameType !== 'single') {
        saquePlayerCountSetting = 2;
        if (saqueSettings?.saquePlayerCount === 2) {
          saquePlayerCountSetting = 1;
        } else {
          saqueTeamSideSetting =
            saqueSettings?.saqueTeamSide === 'top' ? 'bottom' : 'top';
        }
      }
    }
  } else {
    if (saqueSettings?.countSaque > 1) {
      countSaqueSetting = saqueSettings?.countSaque - 1;
      if (saqueSettings?.countSaque % saqueValueDivisor !== 0) {
        saqueSideSetting =
          saqueSettings?.saqueSide === 'left' ? 'right' : 'left';
        if (gameData?.gameType !== 'single') {
          saquePlayerCountSetting = 1;
          if (saqueSettings?.saquePlayerCount === 1) {
            saquePlayerCountSetting = 2;
          } else {
            saqueTeamSideSetting =
              saqueSettings?.saqueTeamSide === 'top' ? 'bottom' : 'top';
          }
        }
      }
    }
  }

  setSaqueSettings({
    ...saqueSettings,
    countSaque: countSaqueSetting,
    saqueSide: saqueSideSetting,
    saquePlayerCount: saquePlayerCountSetting,
    saqueTeamSide: saqueTeamSideSetting,
  });

  updateSaqueSettings({
    countSaqueSetting,
    saquePlayerCountSetting,
    saqueSideSetting,
    saqueTeamSideSetting,
    gameId,
  });
};

const updateScore = async ({team, score, gameId}) => {
  var pastGame;
  const {currentUser} = auth;
  database
    .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
    .on('value', snapshot => {
      pastGame = snapshot.val();
    });

  if (team === 'right') {
    const newScore = {...pastGame.rightPlayers};
    newScore.finalScore = score;
    await updateGameData({
      data: {
        rightPlayers: newScore,
      },
      gameId,
    });
  }
  if (team === 'left') {
    const newScore = {...pastGame.leftPlayers};
    newScore.finalScore = score;
    await updateGameData({
      data: {
        leftPlayers: newScore,
      },
      gameId,
    });
  }
};

const finishGame = async ({gameId, navigation}) => {
  var pastSumula;
  const {currentUser} = auth;
  database
    .ref(`/umpires/${currentUser.uid}/games/${gameId}`)
    .on('value', snapshot => {
      pastSumula = snapshot.val();
    });
  const response = await updateGameData({
    data: {
      gameFinished: true,
      sumula: {...pastSumula.sumula, gameFinishAt: String(dayjs())},
    },
    gameId,
  });
  if (response) {
    navigation.navigate('Home');
  }
};

export {
  updateTimeConfig,
  changeSides,
  updateGameData,
  saveSumula,
  checkGameShouldRotate,
  handleSaqueSide,
  updateScore,
  finishGame,
  handleSide,
};
