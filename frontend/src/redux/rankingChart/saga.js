import { put, call, takeLatest } from 'redux-saga/effects';
import { getRankingData } from './api';
import { getDataSuccess, getDataError } from './actions';

function* getRanking() {
  try {
    const data = yield call(getRankingData);
    yield put(getDataSuccess(data));
  } catch (e) {
    yield put(getDataError());
  }
}
function* rankingSaga() {
  yield takeLatest('GET_RANKING_DATA', getRanking);
}

export default rankingSaga;
