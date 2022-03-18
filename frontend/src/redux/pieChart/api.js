import axios from 'axios';
import BASE_URL from '../../constant/constant';
const getPieData = (fromDate, toDate) => {
  return axios.get(BASE_URL + '/device_summary', {
    params: {
      fromDate,
      toDate
    }
  });
};

export { getPieData };
