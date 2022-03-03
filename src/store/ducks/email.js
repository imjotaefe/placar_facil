export const Types = {
  SEND_EMAIL: 'SEND_EMAIL',
  SEND_EMAIL_SUCCESS: 'SEND_EMAIL_SUCCESS',
  SEND_EMAIL_ERROR: 'SEND_EMAIL_ERROR',
};

const INITIAL_STATE = {
  emailSuccess: false,
  emailLoading: false,
  emailError: false,
};

export default function email(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SEND_EMAIL:
      return {
        ...state,
        emailSuccess: false,
        emailLoading: true,
        emailError: false,
      };
    case Types.SEND_EMAIL_SUCCESS:
      return {
        ...state,
        emailSuccess: true,
        emailLoading: false,
        emailError: false,
      };
    case Types.SEND_EMAIL_ERROR:
      return {
        ...state,
        emailSuccess: false,
        emailLoading: false,
        emailError: true,
      };
    default:
      return state;
  }
}

export const Creators = {
  sendEmail: payload => ({
    type: Types.SEND_EMAIL,
    payload,
  }),
  sendEmailSuccess: payload => ({
    type: Types.SEND_EMAIL_SUCCESS,
    payload,
  }),
  sendEmailError: payload => ({
    type: Types.SEND_EMAIL_ERROR,
    payload,
  }),
};
