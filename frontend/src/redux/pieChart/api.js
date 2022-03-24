import axios from 'axios';
import BASE_URL from '../../constant/constant';
const getPieData = (fromDate, toDate, device_types) => {
  return axios.get(BASE_URL + '/device_summary', {
    params: {
      fromDate,
      toDate,
      device_types
    }
  });
};

export { getPieData };
