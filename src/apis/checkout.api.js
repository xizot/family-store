import axios from '../axios/index';
export const checkoutApi = {
  addBill: ({ accAddress, priceShip, listProduct }) =>
    axios.post('/api/bill/add', { accAddress, priceShip, listProduct }),
};
