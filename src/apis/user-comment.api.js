import axios from '../axios/index';
const getListByProductID = ({ productID, page = 1, limit = 10 }) =>
  axios.post('/api/comment/list', { productID, page, limit });

const userCommentApi = {
  getListByProductID,
};
export default userCommentApi;
