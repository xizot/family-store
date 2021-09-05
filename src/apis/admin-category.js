import axios from '../axios/index';

const CATEGORY_LIMIT = 10;

// import { updateSubCategory } from '../reducers/sub-category';

/**
 * @param  {object} data
 * @param {string} data.cateId
 * @param {string} data.cateName
 */
const addCategory = (data) => {
  return axios.post('/api/auth-categories/add-fathers', data);
};

const getListCategory = (page = null) => {
  let query = '/api/categories/list';
  if (page) {
    query = `/api/categories/list?page=${page}&limit=${CATEGORY_LIMIT}`;
  }
  return axios.get(query);
};

const updateCategory = (cateId, cateName) => {
  return axios.post('/api/auth-categories/update', { cateId, cateName });
};
const deleteCategory = (cateId) => {
  return axios.post('api/auth-categories/delete', { cateId });
};
const adminCategoryApi = {
  addCategory,
  getListCategory,
  updateCategory,
  deleteCategory,
};

export default adminCategoryApi;
