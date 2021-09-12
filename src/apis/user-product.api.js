import axios from '../axios/index';

const getHomeProduct = () => axios.get('/api/categories/product-with-cate');

const getListByCateIDAndPage = ({ catID, page = 1, limit = 12 }) =>
  axios.post('/api/product/list-by-cat', { catID, page, limit });

const getListSuggest = ({ catID, page = 1, limit = 10 }) =>
  axios.post('/api/product/list-suggestion', { catID, page, limit });

const getDetail = (id) => axios.get(`/api/product/details/${id}`);

const userProductApi = {
  getListByCateIDAndPage,
  getListSuggest,
  getDetail,
  getHomeProduct,
};
export default userProductApi;
