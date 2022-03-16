import { GET_HEAT_DATA, GET_HEAT_SUCCESS, GET_HEAT_ERROR } from './types';

const getData = (payload) => {
  return {
    type: GET_HEAT_DATA,
    payload
  };
};

const getDataSuccess = (payload) => {
  return {
    type: GET_HEAT_SUCCESS,
    payload
  };
};

const getDataError = (payload) => {
  return {
    type: GET_HEAT_ERROR,
    payload
  };
};

export { getData, getDataSuccess, getDataError };
