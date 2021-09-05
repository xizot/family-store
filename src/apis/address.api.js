import axios from '../axios/index';
export const addressApi = {
  getListCity: () => axios.get('/api/delivery/list-cities'),
  getListDistrict: (cityId) => axios.post('/api/delivery/list-districts', { cityId: +cityId }),
  getListWard: ({ cityId, districtId }) =>
    axios.post('/api/delivery/list-ward', { cityId: +cityId, districtId: +districtId }),
};
