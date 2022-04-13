import axios from 'axios';
import BASE_URL from '../../constant/constant';
const getUsedTimeData = (page, sort, search, date, type) => {
  return axios.get(BASE_URL + '/used_time', {
    params: {
      page,
      sort,
      search,
      date,
      type
    }
  });
};

export { getUsedTimeData };
