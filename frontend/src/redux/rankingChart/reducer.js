import { GET_RANKING_DATA, GET_RANKING_SUCCESS, GET_RANKING_ERROR } from './types';

const initState = {
  rankingData: [],
  isLoading: false,
  isError: false
};
const rankingChartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_RANKING_DATA:
      return {
        ...state,
        isLoading: true
      };
    case GET_RANKING_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        rankingData: [...data],
        isLoading: false,
        isError: false
      };
    }
    case GET_RANKING_ERROR:
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
export default rankingChartReducer;
