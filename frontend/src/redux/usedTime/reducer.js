import {
  GET_USEDTIME_DATA,
  GET_USEDTIME_SUCCESS,
  GET_USEDTIME_ERROR,
  POST_USEDTIME_DATA,
  POST_USEDTIME_SUCCESS,
  POST_USEDTIME_ERROR,
  PUT_USEDTIME_DATA,
  PUT_USEDTIME_SUCCESS,
  PUT_USEDTIME_ERROR
} from './types';

const initState = {
  usedTimeData: [],
  isLoading: false,
  isError: false,
  loading: false,
  error: false
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
    case POST_USEDTIME_DATA:
      return {
        ...state,
        loading: false
      };
    case POST_USEDTIME_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        usedTimeData: [...data],
        loading: false,
        error: false
      };
    }
    case POST_USEDTIME_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case PUT_USEDTIME_DATA:
      return {
        ...state,
        loading: false
      };
    case PUT_USEDTIME_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        usedTimeData: [...data],
        loading: false,
        error: false
      };
    }
    case PUT_USEDTIME_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return {
        ...state
      };
  }
};
export default usedTimeReducer;
