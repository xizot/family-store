import axios from '../axios/index';
const SUBCATEGORY_LIMIT = 10;
/**
 * @param  {object} data
 * @param {string} data.cateId
 * @param {string} data.cateName
 */

const getListSubCategory = (cateFather, page = null) => {
  let query = '/api/categories/list-child';
  if (page) {
    query = `/api/categories/list-child?page=${page}&limit=${SUBCATEGORY_LIMIT}`;
  }

  return axios.post(query, { cateFather });
};
const deleteCategory = (cateId) => {
  return axios.post('api/categories/delete', { cateId });
};
const addSubCategory = (cateName, cateFather) => {
  return axios.post('/api/categories/add-child', { cateName, cateFather });
};
const updateSubCategory = (cateFather, cateId, cateName) => {
  return axios.post('/api/categories/update', { cateFather, cateId, cateName });
};
const adminSubCategoryApi = {
  getListSubCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
};

export default adminSubCategoryApi;
