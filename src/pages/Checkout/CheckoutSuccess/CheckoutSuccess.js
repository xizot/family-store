import { Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../../components/Layout/Footer';
import Header from '../../../components/Layout/Header';
import useStyles from './CheckoutSuccess.styles';
import { useTranslation } from 'react-i18next';

function CheckoutSuccess() {
  const classes = useStyles();
  const history = useHistory();
	const { t } = useTranslation();

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
              {t("checkoutPage.success.thanks")}
            </Typography>
            <Typography variant="h4" className={classes.subtitle1}>
							{t("checkoutPage.success.title")}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
							{t("checkoutPage.success.message")}
            </Typography>
            <Link to="/orders" className={classes.viewOrder}>
							{t("generalButtons.myOrders")}
            </Link>
            <Link to="/">{t("generalButtons.backToMainPage")}g</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CheckoutSuccess;
