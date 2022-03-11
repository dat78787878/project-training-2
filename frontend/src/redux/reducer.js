import pieChartReducer from './pieChart/reducer';
import rankingChartReducer from './rankingChart/reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  pieChart: pieChartReducer,
  rankingChart: rankingChartReducer
});

export default reducer;
