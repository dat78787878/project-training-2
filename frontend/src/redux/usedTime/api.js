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

const postUsedTimeData = (newUsedTimeData) => {
  return axios.post(BASE_URL + '/used_time', {
    params: {
      newUsedTimeData
    }
  });
};

const putUsedTimeData = (newUsedTimeData, positonEdit) => {
  return axios.put(BASE_URL + '/used_time', {
    params: {
      newUsedTimeData,
      positonEdit
    }
  });
};

export { getUsedTimeData, postUsedTimeData, putUsedTimeData };
