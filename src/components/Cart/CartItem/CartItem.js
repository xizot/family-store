import { Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { moneyFormat } from '../../../helpers';
import NumericUpDown from '../../UI/NumericUpDown';
import useStyles from './CartItem.styles';

const CartItem = ({
  id,
  image,
  title,
  price,
  salePrice,
  totalPrice,
  quantity,
  onAdd,
  onRemove,
  onClear,
}) => {
  const classes = useStyles();

  return (
    <li className={classes.root} id={id}>
      <div className={classes.image}>
        <span onClick={onClear} className={classes.remove}>
          <Close style={{ color: '#fff' }} />
        </span>
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className={classes.description}>
        <div className={classes.detail}>
          <Typography variant="body1">{title}</Typography>
          <Typography
            variant="caption"
            className={`${classes.price} ${salePrice ? classes.hasSale : ''}`}>
            Unit Price {price && moneyFormat(price)} VND
          </Typography>
          {salePrice && (
            <Typography variant="subtitle2" className={classes.price}>
              Sale {salePrice && moneyFormat(salePrice)} VND
            </Typography>
          )}
        </div>
        <div className={classes.actions}>
          <Typography variant="body1" className={classes.totalPrice}>
            {totalPrice && moneyFormat(totalPrice)} VND
          </Typography>

          <NumericUpDown
            quantity={quantity}
            onAdd={onAdd}
            onRemove={onRemove}
            alignSelf="flex-end"
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
