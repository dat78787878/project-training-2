import { put, call, takeEvery } from 'redux-saga/effects';
import { getUsedTimeData, postUsedTimeData, putUsedTimeData } from './api';
import {
  getDataSuccess,
  getDataError,
  postDataSuccess,
  postDataError,
  putDataSuccess,
  putDataError
} from './actions';

const GET_USEDTIME_DATA = 'GET_USEDTIME_DATA';
function* getUsedTime(action) {
  try {
    const data = yield call(getUsedTimeData, ...action.payload);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}

const POST_USEDTIME_DATA = 'POST_USEDTIME_DATA';
function* postUsedTime(action) {
  try {
    const data = yield call(postUsedTimeData, action.payload);
    yield put(postDataSuccess(data));
  } catch (e) {
    yield put(postDataError());
  }
}

const PUT_USEDTIME_DATA = 'PUT_USEDTIME_DATA';
function* putUsedTime(action) {
  try {
    const data = yield call(putUsedTimeData, ...action.payload);
    yield put(putDataSuccess(data));
  } catch (e) {
    yield put(putDataError());
  }
}

function* usedTimeSaga() {
  yield takeEvery(GET_USEDTIME_DATA, getUsedTime);
  yield takeEvery(POST_USEDTIME_DATA, postUsedTime);
  yield takeEvery(PUT_USEDTIME_DATA, putUsedTime);
}

export default usedTimeSaga;
