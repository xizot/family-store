import { Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../../components/Layout/Footer';
import Header from '../../../components/Layout/Header';
import useStyles from './CheckoutSuccess.styles';
function CheckoutSuccess() {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const flag = localStorage.getItem('checkout');
    if (!flag) {
      //history.push('/');
    } else {
      localStorage.removeItem('checkout');
    }
  }, [history]);
  return (
    <>
      <div className={classes.root}>
        <Header />
        <div className={classes.main}>
          <div className={classes.content}>
            <Done className={classes.icon} />
            <Typography variant="h3" color="primary" className={classes.thank}>
              THANK YOU!
            </Typography>
            <Typography variant="h4" className={classes.subtitle1}>
              Your Order Has Been Processed
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              We'll email you order details
            </Typography>
            <Link to="/orders" className={classes.viewOrder}>
              View orders
            </Link>
            <Link to="/">Back to Shopping</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CheckoutSuccess;
