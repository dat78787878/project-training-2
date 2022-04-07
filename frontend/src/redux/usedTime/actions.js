import { GET_USEDTIME_DATA, GET_USEDTIME_SUCCESS, GET_USEDTIME_ERROR } from './types';

const getData = (payload) => {
  return {
    type: GET_USEDTIME_DATA,
    payload
  };
};
const getDataSuccess = (payload) => {
  return {
    type: GET_USEDTIME_SUCCESS,
    payload
  };
};
const getDataError = (payload) => {
  return {
    type: GET_USEDTIME_ERROR,
    payload
  };
};
export { getData, getDataSuccess, getDataError };
