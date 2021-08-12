import axios from '../axios/index';

/**
 * @param  {object} data
 * @param {string} data.cateId
 * @param {string} data.cateName
 */
const addCategory = (data) => {
  return axios.post('/api/categories/add-father', data);
};

const adminCategoryApi = {
  addCategory,
};

export default adminCategoryApi;
