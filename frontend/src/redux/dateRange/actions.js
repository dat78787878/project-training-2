import { GET_DATE_DATA } from './types';

const getData = (payload) => {
  return {
    type: GET_DATE_DATA,
    payload
  };
};
export { getData };
