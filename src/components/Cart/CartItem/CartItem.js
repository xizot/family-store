import { Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { moneyFormat } from '../../../helpers';
import NumericUpDown from '../../UI/NumericUpDown';
import useStyles from './CartItem.styles';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation();

  return (
    <li className={classes.root} id={id}>
      <div className={classes.image}>
        <span onClick={onClear} className={classes.remove}>
          <Close style={{ color: '#fff' }} />
        </span>
        <img
          src={image || process.env.PUBLIC_URL + '/img/no-product.png'}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className={classes.description}>
        <div className={classes.detail}>
          <Typography variant="body1">{title}</Typography>
          <Typography
            variant="caption"
            className={`${classes.price} ${salePrice ? classes.hasSale : ''}`}>
            {t('cartModal.unitPrice')} {price && moneyFormat(price)} VNĐ
          </Typography>
          {salePrice && (
            <Typography variant="subtitle2" className={classes.price}>
              {t('cartModal.salePrice')} {salePrice && moneyFormat(salePrice)} VNĐ
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
