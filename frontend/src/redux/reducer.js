import pieChartReducer from './pieChart/reducer';
import rankingChartReducer from './rankingChart/reducer';
import heatChartReducer from './heatChart/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  pieChart: pieChartReducer,
  rankingChart: rankingChartReducer,
  heatChart: heatChartReducer
});

export default reducer;
