import dayjs from 'dayjs';
import {database, auth} from '../service/firebase';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const updateTimeConfig = async ({timer, setTimeConfig, timeConfig, gameId}) => {
  timer = setTimeout(async () => {
    await updateGameData({
      data: {
        totalGameTime: timeConfig?.totalGameTime?.format('HH:mm:ss'),
        gameTime: timeConfig?.gameTime?.format('mm:ss'),
      },
      gameId,
    });
    setTimeConfig({
      gameTime: timeConfig?.gameTime?.add(1, 'seconds'),
      totalGameTime: timeConfig?.totalGameTime?.add(1, 'seconds'),
    });
  }, 1000);

  return timer && true;
};

const handleSide = ({
  newScore,
  side,
  leftTeamScore,
  rightTeamScore,
  isBestOfTwo,
  gameData,
  setIsBestOfTwo,
  setRightTeamScore,
  setLeftTeamScore,
  setLoadingData,
  game,
  setGame,
  setIsChangingGame,
  gameId,
  timeConfig,
}) => {
  if (!isBestOfTwo) {
    if (newScore === Number(gameData?.stopOn)) {
      return changeSides({
        game,
        setGame,
        setRightTeamScore,
        setLeftTeamScore,
        setLoadingData,
        setIsChangingGame,
        gameId,
        side,
        timeConfig,
      });
    }
  }
  if (isBestOfTwo) {
    if (gameData && side === 'right' && newScore - 2 === leftTeamScore) {
      setIsBestOfTwo(false);
      return changeSides({
        gameId,
        game,
        setGame,
        setRightTeamScore,
        setLeftTeamScore,
        side: 'right',
        setLoadingData,
        setIsChangingGame,
        timeConfig,
      });
    }
    if (gameData && side === 'left' && newScore - 2 === rightTeamScore) {
      setIsBestOfTwo(false);
      return changeSides({
        gameId,
        game,
        setGame,
        setRightTeamScore,
        setLeftTeamScore,
        side: 'left',
        setLoadingData,
        setIsChangingGame,
        timeConfig,
      });
    }
  }
  return false;
};

const changeSides = async ({
  setGame,
  setLeftTeamScore,
  setRightTeamScore,
  game,
  setLoadingData,
  setIsChangingGame,
  gameId,
  timeConfig,
  side,
}) => {
  setLeftTeamScore(0);
  setRightTeamScore(0);
  setIsChangingGame(true);

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
}) => {
  let countSaqueSetting = saqueSettings?.countSaque;
  let saquePlayerCountSetting = saqueSettings?.saquePlayerCount;
  let saqueSideSetting = saqueSettings?.saqueSide;
  let saqueTeamSideSetting = saqueSettings?.saqueTeamSide;

  if (type === 'add') {
    countSaqueSetting = saqueSettings?.countSaque + 1;
    if (saqueSettings?.countSaque % 2 === 0) {
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
      if (saqueSettings?.countSaque % 2 !== 0) {
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
