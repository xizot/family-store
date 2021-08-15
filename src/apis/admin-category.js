import axios from '../axios/index';
// import { updateSubCategory } from '../reducers/sub-category';

/**
 * @param  {object} data
 * @param {string} data.cateId
 * @param {string} data.cateName
 */
const addCategory = (data) => {
  return axios.post('/api/categories/add-father', data);
};
const getListCategory = () => {
  let query = '/api/categories/list';
  return axios.get(query);
};
const updateCategory = (cateId, cateName) => {
  return axios.post('/api/categories/update', { cateId, cateName });
};
const deleteCategory = (cateId) => {
  return axios.post('api/categories/delete', { cateId });
};
const adminCategoryApi = {
  addCategory,
  getListCategory,
  updateCategory,
  deleteCategory,
};

export default adminCategoryApi;
