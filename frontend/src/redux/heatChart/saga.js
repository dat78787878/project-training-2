import { call, put, takeLatest } from 'redux-saga/effects';
import { getHeatData } from './api';
import { getDataSuccess, getDataError } from './actions';

function* getHeatChart() {
  try {
    const data = yield call(getHeatData);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}

function* heatChartSaga() {
  yield takeLatest('GET_HEAT_DATA', getHeatChart);
}

export default heatChartSaga;
