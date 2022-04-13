import { GET_USEDTIME_DATA, GET_USEDTIME_SUCCESS, GET_USEDTIME_ERROR } from './types';

const initState = {
  usedTimeData: [],
  isLoading: false,
  isError: false
};
const usedTimeReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USEDTIME_DATA:
      return {
        ...state,
        isLoading: true
      };
    case GET_USEDTIME_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        usedTimeData: [...data],
        isLoading: false,
        isError: false
      };
    }
    case GET_USEDTIME_ERROR:
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
export default usedTimeReducer;
