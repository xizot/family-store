import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userAddToCart, userDeleteCart, userUpdateCartAmount } from '../reducers/cart';

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

  const updateAmount = async (cartId, cartAmount) => {
    if (!isAuthenticated) {
      history.push({
        pathname: '/login',
        state: { from: history.location.pathname },
      });
    }
    try {
      dispatch(userUpdateCartAmount({ cartId: +cartId, cartAmount: +cartAmount }));
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = (cartId) => {
    console.log(cartId);
    if (!isAuthenticated) {
      history.push({
        pathname: '/login',
        state: { from: history.location.pathname },
      });
    }
    try {
      dispatch(userDeleteCart({ cartId: +cartId }));
    } catch (error) {
      console.log(error);
    }
  };
  return {
    addNew,
    updateAmount,
    removeItem,
  };
};
