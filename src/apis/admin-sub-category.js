import axios from '../axios/index';

/**
 * @param  {object} data
 * @param {string} data.cateId
 * @param {string} data.cateName
 */

const getListSubCategory = (cateFather) => {
    return axios.post('/api/categories/list-child',{cateFather});
};
const adminSubCategoryApi = {
    getListSubCategory
};

export default adminSubCategoryApi;
