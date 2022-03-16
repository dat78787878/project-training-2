import { all, fork } from 'redux-saga/effects';
import pieChartSaga from './pieChart/saga';
import rankingSaga from './rankingChart/saga';
import heatChartSaga from './heatChart/saga';

function* saga() {
  yield all([fork(pieChartSaga), fork(rankingSaga), fork(heatChartSaga)]);
}

export default saga;
