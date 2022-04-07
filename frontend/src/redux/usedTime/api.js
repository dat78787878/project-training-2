import axios from 'axios';
import BASE_URL from '../../constant/constant';
const getUsedTimeData = (fromDate, toDate, currentPage) => {
  return axios.get(BASE_URL + '/used_time', {
    params: {
      fromDate,
      toDate,
      currentPage
    }
  });
};

export { getUsedTimeData };
