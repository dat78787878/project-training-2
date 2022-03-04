/* eslint-disable no-case-declarations */
import { GET_PIE_DATA, GET_PIE_ERROR, GET_PIE_SUCCESS } from './types';

const initState = {
  pieData: {},
  isLoading: false,
  isError: false
};
const pieChartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PIE_DATA:
      return {
        ...state,
        isLoading: true
      };
    case GET_PIE_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        pieData: { ...state.pieData, ...data },
        isLoading: false,
        isError: false
      };
    case GET_PIE_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    default:
      return {
        ...state
      };
  }
};
export default pieChartReducer;
