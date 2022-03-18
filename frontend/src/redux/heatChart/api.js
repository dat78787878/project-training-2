import axios from 'axios';
import BASE_URL from '../../constant/constant';

const getHeatData = (fromDate, toDate) => {
  return axios.get(BASE_URL + '/heat', {
    params: {
      fromDate,
      toDate
    }
  });
};
export { getHeatData };
