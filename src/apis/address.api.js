import axios from '../axios/index';

const getListCity = () => axios.get('/api/delivery/list-city');
const getListDistrict = (cityId) => axios.post('/api/delivery/list-districts', { cityId: +cityId });
const getListWard = ({ cityId, districtId }) =>
  axios.get('/api/delivery/list-districts', { cityId: +cityId, districtId: +districtId });

const addressApi = {
  getListCity,
  getListDistrict,
  getListWard,
};
export default addressApi;
