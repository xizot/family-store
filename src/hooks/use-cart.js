import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userAddToCart } from '../reducers/cart';

export const useCart = () => {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const addNew = async (item, quantity) => {
    if (!isAuthenticated) {
      history.push({
        pathname: '/login',
        state: { from: history.location.pathname },
      });
    }
    try {
      dispatch(
        userAddToCart({
          quantity,
          prodId: item.prod_id || item.prodId,
          item,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateAmount = (cartId, cartAmount) => {};
  const removeItem = (cartId) => {};
  return {
    addNew,
    updateAmount,
    removeItem,
  };
};
