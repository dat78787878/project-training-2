import { call, put, takeLatest } from 'redux-saga/effects';

import { getDataSuccess, getDataError } from './actions';
import { getPieData } from './api';

const GET_PIE_DATA = 'GET_PIE_DATA';
function* getPieChart(action) {
  try {
    const data = yield call(getPieData, ...action.payload);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}

function* pieChartSaga() {
  yield takeLatest(GET_PIE_DATA, getPieChart);
}
export default pieChartSaga;
