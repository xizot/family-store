import axios from '../axios/index';
/**
 * @param  {object} data
 * @param {string} data.cateId
 * @param {string} data.cateName
 */

const getListSubCategory = ({ cateFather, page = 1, limit = 10 }) => {
  let query = '/api/categories/list-child';
  if (page) {
    query = `/api/categories/list-child?page=${page}&limit=${limit}`;
  }

  return axios.post(query, { cateFather: +cateFather });
};
const deleteCategory = (cateId) => {
  return axios.post('api/auth-categories/delete', { cateId });
};
const addSubCategory = (cateName, cateFather) => {
  return axios.post('/api/auth-categories/add-child', { cateName, cateFather });
};
const updateSubCategory = (cateFather, cateId, cateName) => {
  return axios.post('/api/auth-categories/update', { cateFather, cateId, cateName });
};
const adminSubCategoryApi = {
  getListSubCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
};

export default adminSubCategoryApi;
