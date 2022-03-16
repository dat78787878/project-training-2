import axios from 'axios';
import BASE_URL from '../../constant/constant';

const getHeatData = () => {
  return axios.get(BASE_URL + '/heat');
};
export { getHeatData };
