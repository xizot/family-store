import { Button, IconButton, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { moneyFormat } from '../../helpers';
import { useCart } from '../../hooks/use-cart';
import { uiActions } from '../../reducers/ui';
import CartModal from '../UI/CartModal/CartModal';
import CartItem from './CartItem/CartItem';
import useStyles from './Cart.styles';
import { useHistory } from 'react-router-dom';

const Cart = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.data);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { addNew, removeItem, updateAmount } = useCart();
  const isOpenCart = useSelector((state) => state.ui.isOpenCart);

  const checkoutHandler = () => {
    history.push('/checkout');
  };
  const toggleCartModalHandler = () => {
    dispatch(uiActions.toggleCartModal());
  };

  return (
    <CartModal onClose={toggleCartModalHandler} isOpen={isOpenCart}>
      <div className={classes.content}>
        <div>
          <div className={classes.title}>
            <Typography variant="h4" component="p">
              {t('cartModal.cart')}
            </Typography>
            <IconButton onClick={toggleCartModalHandler} className={classes.iconClose}>
              <Close fontSize="large" />
            </IconButton>
          </div>
          <div className={`${classes.title} ${classes.title2} `}>
            <Typography variant="body1" component="p">
              {t('cartModal.total')}
            </Typography>
            <Typography variant="h6" component="p" style={{ fontWeight: 'bold' }}>
              {totalAmount && moneyFormat(totalAmount)} VND
            </Typography>
          </div>
        </div>
        <ul className={classes.listItem}>
          {cartItems.length > 0 &&
            cartItems.map((item, index) => (
              <CartItem
                key={index}
                id={item.prodId}
                title={item.prodName}
                image={item.prodImage}
                price={item.prodPrice}
                salePrice={item.salePrice}
                totalPrice={item.totalPrice}
                quantity={item.cartAmount}
                onAdd={addNew.bind(null, item, 1)}
                onRemove={updateAmount.bind(null, item.cartId, item.cartAmount - 1)}
                onClear={removeItem.bind(null, item.cartId)}
              />
            ))}
        </ul>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonCheckout}
          onClick={checkoutHandler}
          disabled={cartItems.length <= 0}>
          {t('cartModal.checkout')}
        </Button>
      </div>
    </CartModal>
  );
};

export default Cart;
