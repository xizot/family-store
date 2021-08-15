import axios from '../axios/index';

const getAll = () => {
  return axios.get('/api/product/list');
};
const getByPage = (page = 0, limit = 10) => {
  // return axios.post(`/api/product/list?page=${page}&limit=${limit}`);
  return axios.post('/api/product/list', { page, limit });
};

/**
 * @param  {object} data
 * @param {string} data.prodName
 * @param {string} data.prodCategoryID
 * @param {string} data.prodPrice
 * @param {string} data.prodAmount
 * @param {string} data.prodDescription
 * @param {files} data.image
 */
const addNew = (data) => {
  // {prodName, prodCategoryID, prodPrice, prodAmount,prodDescription, image}
  return axios.post('/api/product/add', data);
};

const deleteById = (id) => {
  return axios.post(`/api/product/delete/${id}`);
};

const adminProductApis = {
  getAll,
  getByPage,
  addNew,
  deleteById,
};

export default adminProductApis;
