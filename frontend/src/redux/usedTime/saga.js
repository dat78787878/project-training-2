import { put, call, takeLatest } from 'redux-saga/effects';
import { getUsedTimeData } from './api';
import { getDataSuccess, getDataError } from './actions';

const GET_USEDTIME_DATA = 'GET_USEDTIME_DATA';
function* getUsedTime(action) {
  try {
    const data = yield call(getUsedTimeData, ...action.payload);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}
function* usedTimeSaga() {
  yield takeLatest(GET_USEDTIME_DATA, getUsedTime);
}

export default usedTimeSaga;
