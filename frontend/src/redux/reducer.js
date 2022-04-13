import pieChartReducer from './pieChart/reducer';
import rankingChartReducer from './rankingChart/reducer';
import heatChartReducer from './heatChart/reducer';
import dateRangeReducer from './dateRange/reducer';
import lineChartReducer from './lineChart/reducer';
import usedTimeReducer from './usedTime/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  pieChart: pieChartReducer,
  rankingChart: rankingChartReducer,
  heatChart: heatChartReducer,
  dateRange: dateRangeReducer,
  lineChart: lineChartReducer,
  usedTime: usedTimeReducer
});

export default reducer;
