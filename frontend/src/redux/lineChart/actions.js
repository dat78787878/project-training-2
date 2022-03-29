import { GET_LINE_DATA, GET_LINE_SUCCESS, GET_LINE_ERROR } from './types';

const getData = (payload) => {
  return {
    type: GET_LINE_DATA,
    payload
  };
};
const getDataSuccess = (payload) => {
  return {
    type: GET_LINE_SUCCESS,
    payload
  };
};
const getDataError = (payload) => {
  return {
    type: GET_LINE_ERROR,
    payload
  };
};

export { getData, getDataSuccess, getDataError };
