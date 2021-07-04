export const Types = {
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',
};

const INITIAL_STATE = {
  user: null,
  error: null,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case Types.AUTH_ERROR:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const Creators = {
  authSuccess: payload => ({
    type: Types.AUTH_SUCCESS,
    payload,
  }),
  authError: data => ({
    type: Types.AUTH_ERROR,
    payload: data,
  }),
};
