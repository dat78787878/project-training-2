import axios from 'axios';
import BASE_URL from '../../constant/constant';
const getUsedTimeData = (page, sort) => {
  return axios.get(BASE_URL + '/used_time', {
    params: {
      page,
      sort
    }
  });
};

export { getUsedTimeData };
