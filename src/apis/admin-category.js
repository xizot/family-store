import axios from '../axios/index';

/**
 * @param  {object} data
 * @param {string} data.cateId
 * @param {string} data.cateName
 */
const addCategory = (data) => {
  return axios.post('/api/categories/add-father', data);
};
<<<<<<< HEAD
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
=======

const getListCategory = (page, limit = 10) => {
  return axios.get(`/api/categories/list?page=${page}&limit=${limit}`);
};
const adminCategoryApi = {
  addCategory,
  getListCategory,
>>>>>>> 01d175e76f745f120406f2c657270a727631165a
};

export default adminCategoryApi;
