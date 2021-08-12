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
  return axios.get(`/api/categories/list?page=${page}&limit=${limit}`);
};
const adminCategoryApi = {
  addCategory,
  getListCategory,
};

export default adminCategoryApi;
