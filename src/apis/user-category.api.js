import axios from '../axios/index';

const getList = () => {
  return axios.get('/api/categories/list');
};

const userCategoryApi = {
  getList,
};
export default userCategoryApi;
