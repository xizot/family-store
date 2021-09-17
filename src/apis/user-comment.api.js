import axios from '../axios/index';
const getListByProductID = ({ productID, page = 1, limit = 10 }) =>
  axios.post('/api/comment/list', { productID: +productID, page, limit });
const addComment = ({productID,content,vote}) => {
    return axios.post('/api/comment/add',{productID,content,vote})
}

const userCommentApi = {
  getListByProductID,
  addComment
};
export default userCommentApi;
