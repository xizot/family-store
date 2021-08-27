import axios from '../axios/index';

const getListByCateIDAndPage = ({ catID, page = 1, limit = 10 }) =>
  axios.post('/api/product/list-by-cat', { catID, page, limit });

const getDetail = (id) => axios.post(`/api/product/detail/${id}`, { id });

const userProductApi = {
  getListByCateIDAndPage,
  getDetail,
};
export default userProductApi;
