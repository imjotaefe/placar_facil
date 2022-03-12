import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {Creators as EmailActions, Types as EmailTypes} from '../ducks/email';
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

function* sendEmail({payload}) {
  try {
    const {status, data} = yield call(axios.post, `${API_URL}/sendEmail`, {
      ...payload.game,
      receiver: payload.data.email,
    });
    if (status === 200) {
      yield put(EmailActions.sendEmailSuccess());
    }
  } catch (err) {
    yield put(EmailActions.sendEmailError());
  }
}

function* sendEmailWatcher() {
  yield takeLatest(EmailTypes.SEND_EMAIL, sendEmail);
}

export default function* rootSaga() {
  yield all([fork(sendEmailWatcher)]);
}
