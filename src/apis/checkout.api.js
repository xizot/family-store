import axios from '../axios/index';
export const checkoutApi = {
  addBill: ({ receiverName, receiverPhone, receiverNote, accAddress, priceShip, listProduct }) =>
    axios.post('/api/bill/add', {
      receiverName,
      receiverPhone,
      receiverNote,
      accAddress,
      priceShip,
      listProduct,
    }),
};
