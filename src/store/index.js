import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSagas from './sagas';
import rootReducers from './ducks';

const sagaMiddleware = createSagaMiddleware({});

const middlewares = [];
middlewares.push(sagaMiddleware);

const composer = compose(applyMiddleware(...middlewares));

const store = createStore(rootReducers, composer);

sagaMiddleware.run(rootSagas);

export default store;
