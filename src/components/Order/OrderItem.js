import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { moneyFormat } from '../../helpers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../reducers/order.reducer'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1),
    minHeight: '110px',
    borderBottom: `1px solid #D3D3D3`,
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    marginRight: theme.spacing(2),
  },
  name: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  status: {
    fontWeight: 'bold',
    // position: 'absolute',
    // right: '30px',
    // margin
  },
  content: {
    flex: 1,
  },
  top: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: '20px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  body: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  total: {
    // position: 'absolute',
    // right: '30px',
  },
  confirm: {
    color: '#F3DA90',
  },
  canceled: {
    color: '#ED8B84',
  },
  delivering: {
    color: '#5081AB',
  },
  delivered: {
    color: '#348c3a',
  },
  seeDetail: {
    color: theme.palette.primary.main,
    textAlign: 'right',
    display: 'block',
    fontWeight: 'bold',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  cdc: {
    textAlign: 'right',
    display: 'block',
    fontWeight: 'bold',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  }
}));

const ProductItem = ({ id, date, expected, status, total, img, detail }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(true);
  const [disablec, setDis] = useState(false)

  useEffect(() => {
    if (status === "shipping") {
      setCheck(false);
    }
  }, [status])

  const clickHanlder = async () => {
    setDis(true);
    try {
      await dispatch(updateStatus({ billId: id, status:'delivered' })).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={classes.root}>
      <img src={img} alt="" className={classes.image} />
      <div className={classes.content}>
        <div className={classes.top}>
          <Typography variant="body1" className={classes.name}>
            {t('ordersPage.item.orderId')} {id}
          </Typography>
          <Typography variant="caption" className={classes.status}>
            {t('ordersPage.item.status')}{' '}
            <span className={classes[status?.toLowerCase()]}>{status?.toUpperCase()}</span>
          </Typography>
        </div>
        <div className={classes.body}>
          <div>
            <Typography variant="body2">
              {t('ordersPage.item.createdDate')} {date}
            </Typography>
            <Typography variant="body2">
              {t('ordersPage.item.deliveryDate')} {expected}
            </Typography>
          </div>
          <div className={classes.total}>
            <Typography variant="body2">
              <b>{t('ordersPage.item.totalPayment')}</b> {total && moneyFormat(total)} VNĐ
            </Typography>
            <Link to={`/reviews/${id}/`} className={classes.seeDetail}>
              {t('generalButtons.seeDetails')}
            </Link>
            <div className={classes.cdc}>
              <button hidden={check} disabled={disablec} onClick={clickHanlder}> {t('generalButtons.receivedProduct')} </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductItem;
