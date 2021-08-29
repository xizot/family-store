import axios from '../axios/index';

const getList = () => {
  return axios.get('/api/cart/list');
};

const addToCart = ({ prodId, cartAmount }) => {
  return axios.post('/api/cart/add', { prodId: +prodId, cartAmount });
};

const updateAmount = ({ cartId, cartAmount }) => {
  return axios.post('/api/cart/update-amount', { cartId: +cartId, cartAmount });
};

const deleteItem = (cartId) => {
  return axios.post('/api/cart/delete', { cartId: +cartId });
};

const userCartApi = {
  getList,
  addToCart,
  updateAmount,
  deleteItem,
};
export default userCartApi;
