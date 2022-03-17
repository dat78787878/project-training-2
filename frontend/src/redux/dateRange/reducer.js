import { GET_DATE_DATA } from './types';

const initState = {
  fromDate: null,
  toDate: null
};

const dateReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_DATE_DATA:
      return {
        fromDate: action.payload.fromDate,
        toDate: action.payload.toDate
      };
    default:
      return {
        ...state
      };
  }
};

export default dateReducer;
