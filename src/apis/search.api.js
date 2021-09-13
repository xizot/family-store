import axios from '../axios/index';
export const searchApi = {
  search: ({ prodName, limit, page, sortBy, filter }) =>
    axios.post('/api/product/search', { prodName, limit, page, sortBy, filter }),
};
