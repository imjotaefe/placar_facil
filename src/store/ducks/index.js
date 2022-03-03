import {combineReducers} from 'redux';
import auth from './auth';
import scoreBoard from './scoreBoard';
import email from './email';

const rootReducer = combineReducers({
  auth,
  scoreBoard,
  email,
});

export default rootReducer;
