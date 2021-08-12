import axios from '../axios/index';

/**
 * @param  {object} data
 * @param {string} data.cateId
 * @param {string} data.cateName
 */
const addCategory = (data) => {
  return axios.post('/api/categories/add-father', data);
};
const getListCategory = (page, limit = 10) => {
  let query = '/api/categories/list';
  if (!isNaN(page)) {
    query += `?page=${page}&limit=${limit}`;
  }
  return axios.get(query);
};
const adminCategoryApi = {
  addCategory,
  getListCategory
};

export default adminCategoryApi;
