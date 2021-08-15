import axios from '../axios/index';

/**
 * @param  {object} data
 * @param {string} data.cateId
 * @param {string} data.cateName
 */

const getListSubCategory = (cateFather) => {
    return axios.post('/api/categories/list-child', { cateFather });
};
const deleteCategory = (cateId) => {
    return axios.post('api/categories/delete', { cateId })
}
const addSubCategory = (cateName,cateFather) => {
    return axios.post('/api/categories/add-child', {cateName,cateFather});
  };
const adminSubCategoryApi = {
    getListSubCategory,
    deleteCategory,
    addSubCategory
};

export default adminSubCategoryApi;
