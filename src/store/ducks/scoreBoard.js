export const Types = {
  SET_LEFT_SCORE: 'SET_LEFT_SCORE',
  SET_RIGHT_SCORE: 'SET_RIGHT_SCORE',
  SET_GAME_ID: 'SET_GAME_ID',
  ALTERING_NAMES: 'ALTERING_NAMES',
  SET_PLAYERS: 'SET_PLAYERS',
};

const INITIAL_STATE = {
  leftTeamScore: 0,
  rightTeamScore: 0,
  gameId: null,
  alteringNames: false,
  playersName: {
    left: {
      player1: '',
      player2: '',
    },
    right: {
      player1: '',
      player2: '',
    },
  },
};

export default function scoreBoard(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_LEFT_SCORE:
      return {
        ...state,
        leftTeamScore: action.payload,
      };
    case Types.SET_RIGHT_SCORE:
      return {
        ...state,
        rightTeamScore: action.payload,
      };
    case Types.SET_GAME_ID:
      return {
        ...state,
        gameId: action.payload,
      };
    case Types.ALTERING_NAMES:
      return {
        ...state,
        alteringNames: action.payload,
      };
    case Types.SET_PLAYERS:
      return {
        ...state,
        playersName: action.payload,
      };
    default:
      return state;
  }
}

export const Creators = {
  setLeftScore: payload => ({
    type: Types.SET_LEFT_SCORE,
    payload,
  }),
  setRightScore: data => ({
    type: Types.SET_RIGHT_SCORE,
    payload: data,
  }),
  setGameId: data => ({
    type: Types.SET_GAME_ID,
    payload: data,
  }),
  setAlteringNames: data => ({
    type: Types.ALTERING_NAMES,
    payload: data,
  }),
  setPlayersName: data => ({
    type: Types.SET_PLAYERS,
    payload: data,
  }),
};
