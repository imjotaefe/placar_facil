export const Types = {
  SET_LEFT_SCORE: 'SET_LEFT_SCORE',
  SET_RIGHT_SCORE: 'SET_RIGHT_SCORE',
  SET_GAME_ID: 'SET_GAME_ID',
};

const INITIAL_STATE = {
  leftTeamScore: 0,
  rightTeamScore: 0,
  gameId: null,
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
};
