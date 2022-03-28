import { all, fork } from 'redux-saga/effects';
import pieChartSaga from './pieChart/saga';
import rankingSaga from './rankingChart/saga';
import heatChartSaga from './heatChart/saga';
import lineChartSaga from './lineChart/saga';

function* saga() {
  yield all([fork(pieChartSaga), fork(rankingSaga), fork(heatChartSaga), fork(lineChartSaga)]);
}

export default saga;
