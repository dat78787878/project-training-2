import { createStore, applyMiddleware } from 'redux';
import pieChartReducer from './pieChart/reducer';
import saga from './pieChart/saga';
import createSagaMiddleware from '@redux-saga/core';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  pieChart: pieChartReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);
export default store;
