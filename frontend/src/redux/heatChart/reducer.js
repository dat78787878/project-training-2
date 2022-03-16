import { GET_HEAT_DATA, GET_HEAT_SUCCESS, GET_HEAT_ERROR } from './types';

const initState = {
  heatData: [],
  isLoading: false,
  isError: false
};
const heatChartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_HEAT_DATA:
      return {
        ...state,
        isLoading: true
      };
    case GET_HEAT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        heatData: [...data],
        isLoading: false,
        isError: false
      };
    }
    case GET_HEAT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return {
        ...state
      };
  }
};

export default heatChartReducer;
