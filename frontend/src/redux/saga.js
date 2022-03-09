import { all, fork } from 'redux-saga/effects';
import pieChartSaga from './pieChart/saga';
import rankingSaga from './rankingChart/saga';

function* saga() {
  yield all([fork(pieChartSaga), fork(rankingSaga)]);
}

export default saga;
