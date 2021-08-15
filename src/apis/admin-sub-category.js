import axios from '../axios/index';

/**
 * @param  {object} data
 * @param {string} data.cateId
 * @param {string} data.cateName
 */

const getListSubCategory = () => {
    let query = '/api/categories/list-child';
    return axios.get(query);
};
const adminSubCategoryApi = {
    getListSubCategory
};

export default adminSubCategoryApi;
