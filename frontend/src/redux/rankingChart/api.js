import axios from 'axios';
import BASE_URL from '../../constant/constant';
const getRankingData = () => {
  return axios.get(BASE_URL + '/ranking', {});
};

export { getRankingData };
