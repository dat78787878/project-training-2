import { put, call, takeLatest } from 'redux-saga/effects';
import { getRankingData } from './api';
import { getDataSuccess, getDataError } from './actions';

const GET_RANKING_DATA = 'GET_RANKING_DATA';
function* getRanking(action) {
  try {
    const data = yield call(getRankingData, ...action.payload);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}
function* rankingSaga() {
  yield takeLatest(GET_RANKING_DATA, getRanking);
}

export default rankingSaga;
