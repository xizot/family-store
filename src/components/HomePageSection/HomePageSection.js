import { Button, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useCart } from '../../hooks/use-cart';
import ProductItem from '../ProductItem/ProductItem';
import useStyles from './HomePageSection.styles';

const LIMIT_PRODUCT = 8;

function HomePageSection({ cateName, listProduct = [] }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { addNew } = useCart();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {cateName}
      </Typography>
      <Grid container spacing={3}>
        {listProduct.slice(0, page * LIMIT_PRODUCT).map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ProductItem
              id={product.prodId}
              title={product.prodName}
              description={product.prodDescription}
              image={product.prodImage}
              price={product.prodPrice}
              onAddToCart={addNew.bind(null, product, 1)}
            />
          </Grid>
        ))}
      </Grid>
      {listProduct.length > LIMIT_PRODUCT * page && (
        <Button
          variant="text"
          color="primary"
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className={classes.btnMore}>
          Xem thêm {listProduct.length - LIMIT_PRODUCT * page} sản phẩm
        </Button>
      )}
    </div>
  );
}

export default HomePageSection;
