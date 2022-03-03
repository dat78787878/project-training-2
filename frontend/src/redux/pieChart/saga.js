import { call, put, takeLatest } from "redux-saga/effects";

import { getDataSuccess, getDataError } from "./actions";
import { getPieData } from "./api";

function* getPieChart() {
  try {
    const data = yield call(getPieData);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}

function* pieChartSaga() {
  yield takeLatest("GET_PIE_DATA", getPieChart);
}
export default pieChartSaga;
