import axios from 'axios';
import BASE_URL from '../../constant/constant';
const getPieData = () => {
  return axios.get(BASE_URL + '/device_summary');
};

export { getPieData };
