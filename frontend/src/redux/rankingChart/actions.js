import { GET_RANKING_DATA, GET_RANKING_SUCCESS, GET_RANKING_ERROR } from './types';

const getData = (payload) => {
  return {
    type: GET_RANKING_DATA,
    payload
  };
};
const getDataSuccess = (payload) => {
  return {
    type: GET_RANKING_SUCCESS,
    payload
  };
};
const getDataError = (payload) => {
  return {
    type: GET_RANKING_ERROR,
    payload
  };
};
export { getData, getDataSuccess, getDataError };
