import { call, put, takeLatest } from 'redux-saga/effects';
import { getHeatData } from './api';
import { getDataSuccess, getDataError } from './actions';

const GET_HEAT_DATA = 'GET_HEAT_DATA';
function* getHeatChart(action) {
  try {
    const data = yield call(getHeatData, ...action.payload);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}

function* heatChartSaga() {
  yield takeLatest(GET_HEAT_DATA, getHeatChart);
}

export default heatChartSaga;
