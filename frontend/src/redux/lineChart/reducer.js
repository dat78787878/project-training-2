import { GET_LINE_DATA, GET_LINE_SUCCESS, GET_LINE_ERROR } from './types';

const initState = {
  lineData: [],
  isLoading: false,
  isError: false
};

const lineChartReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LINE_DATA:
      return {
        ...state,
        isLoading: true
      };
    case GET_LINE_SUCCESS: {
      const { data } = action.payload;
      return {
        lineData: [...data],
        isLoading: false,
        isError: false
      };
    }
    case GET_LINE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return { ...state };
  }
};
export default lineChartReducer;
