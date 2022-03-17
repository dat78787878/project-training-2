import axios from 'axios';
import BASE_URL from '../../constant/constant';
const getRankingData = (fromDate, toDate) => {
  return axios.get(BASE_URL + '/ranking', {
    params: {
      fromDate,
      toDate
    }
  });
};

export { getRankingData };
