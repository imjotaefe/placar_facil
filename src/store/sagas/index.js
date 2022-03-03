import {all} from 'redux-saga/effects';
import emailSagas from './email';

export default function* rootSaga() {
  yield all([emailSagas()]);
}
