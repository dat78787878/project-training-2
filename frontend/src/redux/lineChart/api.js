import axios from 'axios';
import BASE_URL from '../../constant/constant';

const getLineChartData = (fromDate, toDate) => {
  return axios.get(BASE_URL + '/line', {
    params: {
      fromDate,
      toDate
    }
  });
};
export { getLineChartData };
