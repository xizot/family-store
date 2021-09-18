import { CardContent, makeStyles, Typography, Card, CardMedia } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket } from '@material-ui/icons';
import { moneyFormat, removeHtmlTag } from '../../helpers';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 2px)',
    boxShadow:
      'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px',
    transition: 'all .5s',
    '&:hover': {
      boxShadow: '0px 2px 8px rgba(0,0,0,.5)',
      '& $title': {
        textDecoration: 'underline',
      },
    },
  },

  link: {
    textDecoration: 'none',
  },

  iconAddToCart: {
    cursor: 'pointer',
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: theme.shape.borderRadius,
    padding: '2px 7px',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.4)',
    background: '#f3f3f3',
    transition: 'color .4s',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  content: {
    padding: '10px !important',
  },
  media: {
    height: 0,
    paddingTop: 'calc((9/16)*100%)',
    objectFit: 'cover',
    backgroundSize: 'contain',
  },
  title: {
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#333',
    fontSize: ({ size }) => (size === 'small' ? 14 : 16),
    marginBottom: 5,
  },
  hasSale: {
    textDecoration: 'line-through',
    color: '#333 !important',
    opacity: 0.9,
    fontSize: '12px !important',
  },
  price: {
    color: theme.palette.primary.main,
  },
  description: {
    display: '-webkit-box',
    '-webkit-line-clamp': ({ size }) => (size === 'small' ? 2 : 4),
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: ({ size }) => (size === 'small' ? 13 : 14),
  },
}));

const ProductItem = ({
  id,
  title,
  image,
  price,
  salePrice,
  description,
  onAddToCart,
  size = 'normal',
}) => {
  const classes = useStyles({ size });

  return (
    <Card className={classes.card}>
      <div onClick={onAddToCart} className={classes.iconAddToCart}>
        <ShoppingBasket fontSize="small" />
      </div>
      <Link to={`/details/${id}`} className={classes.link}>
        <CardMedia
          className={classes.media}
          image={image || process.env.PUBLIC_URL + '/img/no-product.png'}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant="body1">
            {title}
          </Typography>
          <Typography
            variant="body1"
            className={`${classes.price} ${salePrice ? classes.hasSale : ''}`}>
            {price && moneyFormat(price)} VND
          </Typography>
          {salePrice && (
            <Typography variant="body1" className={classes.price}>
              {salePrice && moneyFormat(salePrice)} VND
            </Typography>
          )}

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.description}>
            {description && removeHtmlTag(description)}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
export default ProductItem;
