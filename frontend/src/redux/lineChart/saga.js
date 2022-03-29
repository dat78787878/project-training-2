import { put, call, takeLatest } from 'redux-saga/effects';
import { getLineChartData } from './api';
import { getDataSuccess, getDataError } from './actions';

const GET_LINE_DATA = 'GET_LINE_DATA';
function* getLineChart(action) {
  try {
    const data = yield call(getLineChartData, ...action.payload);
    yield put(getDataSuccess(data));
  } catch {
    yield put(getDataError());
  }
}
function* lineChartSaga() {
  yield takeLatest(GET_LINE_DATA, getLineChart);
}

export default lineChartSaga;
