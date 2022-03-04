import { GET_PIE_DATA, GET_PIE_ERROR, GET_PIE_SUCCESS } from './types';

const getData = (payload) => {
  return {
    type: GET_PIE_DATA,
    payload
  };
};

const getDataSuccess = (payload) => {
  return {
    type: GET_PIE_SUCCESS,
    payload
  };
};

const getDataError = (payload) => {
  return {
    type: GET_PIE_ERROR,
    payload
  };
};
export { getData, getDataSuccess, getDataError };
