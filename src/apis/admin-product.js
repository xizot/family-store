import axios from '../axios/index';

const getAll = () => {
  return axios.get('/api/product/list');
};
const getByPage = (page, limit) => {
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
  return axios.post('/api/auth-product/add', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteById = (id) => {
  return axios.post(`/api/auth-product/delete/${id}`);
};

const updateImages = (id, data) => {
  return axios.post(`/api/auth-product/update-image/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const updateInformation = (id, data) => {
  return axios.post(`/api/auth-product/update/${id}`, data);
};

const getByCate = ({ catID, page, limit }) =>
  axios.post('/api/product/list-by-cat', { catID: +catID, page, limit });

const getDetails = (id) => axios.get(`/api/product/details/${id}`);
const adminProductApis = {
  getAll,
  getByPage,
  addNew,
  deleteById,
  updateImages,
  updateInformation,
  getByCate,
  getDetails,
};

export default adminProductApis;
