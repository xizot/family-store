import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowBackIos } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import ReviewsOrderItem from '../../components/ReviewsOrderItem/ReviewsOrderItem';
import SideBar from '../../components/SideBar/SideBar';
import Footer from '../../components/Layout/Footer';
import Header from '../../components/Layout/Header';
import CategoryMenu from '../../components/CategoriesMenu/CategoriesMenu';
import { useTranslation } from 'react-i18next';
import { getDetailOrder } from '../../reducers/order.reducer';
import { toast } from 'react-toastify';
import { addComment } from '../../reducers/user-comment.reducer';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  main: {
    marginLeft: 'auto',
    width: 'calc(100% - 260px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  mainContent: {
    padding: `80px ${theme.spacing(2)}px 65px`,
    [theme.breakpoints.down('xs')]: {
      padding: `68px ${theme.spacing(2)}px 85px`,
      width: '100%',
    },
  },

  shadow: {
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
  },

  topContent: {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    color: '#F39148',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  topLeftButton: {
    marginLeft: theme.spacing(2),
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      flex: 'auto',
      marginTop: theme.spacing(1),
      marginLeft: 0,
    },
  },

  TopContentDetailsLeft: {
    float: 'left',
    margin: theme.spacing(2),
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      float: 'none',
      width: '100%',
    },
  },

  TopContentDetailRight: {
    float: 'right',
    margin: theme.spacing(2),
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      float: 'none',
      width: '100%',
    },
  },

  ChildPropertiesLabel: {
    float: 'left',
  },

  ChildPropertiesValue: {
    float: 'left',
    marginLeft: theme.spacing(2) + theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      float: 'right',
      marginLeft: '0px',
      marginRight: theme.spacing(2) + theme.spacing(2),
    },
  },

  boldFont: {
    fontWeight: 600,
  },

  commonTitle: {
    textAlign: 'center',
    color: '#F39148',
  },

  bottomContent: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  back: {
    textDecoration: 'none',
    display: 'block',
  },
}));

const ReviewsPage = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [check,setCheck] = useState(false);
  let query = location.pathname.slice(9) || 1; //?id=123
  const detail = useSelector((state) => state.order.detail);


  const getDetailOrderHandler = useCallback(
    async (billId) => {
      try {
        await dispatch(getDetailOrder(billId)).unwrap();
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getDetailOrderHandler(parseInt(query));
  }, [dispatch, getDetailOrderHandler, query]);

  const reviewHandler = async ({ productId, numOfStar, comment }) => {
    try {
      await dispatch(addComment({billID:detail.billId, productID: productId, content: comment, vote: numOfStar })).unwrap();
      setCheck(true);
      toast.success("Comment success")
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    document.title = t('pagesTitle.reviews');
  }, [t]);

  return (
    <>
      <div className={classes.root}>
        <Header showMenu showCart />
        <SideBar>
          <CategoryMenu />
        </SideBar>
        <div className={classes.main}>
          <div className={classes.mainContent}>
            <div className={`${classes.topContent} ${classes.shadow}`}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Link to="/orders" className={classes.back}>
                    <Button variant="outlined" color="primary" className={classes.topLeftButton}>
                      <ArrowBackIos fontSize="small" /> {t("generalButtons.back")}
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <div className={classes.commonTitle}>
                    <Typography variant="h6" className={classes.boldFont}>
                      {t("ordersPage.details.titleTop")}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div className={classes.TopContentDetailsLeft}>
                    <div className={classes.ChildPropertiesLabel}>
                      <Typography variant="body1"> {t("ordersPage.item.orderId")}:  </Typography>
                    </div>
                    <div className={classes.ChildPropertiesValue}>
                      <Typography variant="body1" className={classes.boldFont}>
                        {detail.billId}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div className={classes.TopContentDetailRight}>
                    <div className={classes.ChildPropertiesLabel}>
                      <Typography variant="body1"> {t("ordersPage.item.status")} </Typography>
                    </div>
                    <div className={classes.ChildPropertiesValue}>
                      <Typography variant="body1" className={classes.boldFont}>
                        {detail.billStatus?.toUpperCase()}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={1}>
                  <div className={classes.TopContentDetailsLeft}>
                    <div className={classes.ChildPropertiesLabel}>
                      <Typography variant="body1"> NAME: </Typography>
                      <Typography variant="body1">  {t('profilepage.address')?.toUpperCase()}: </Typography>
                      <Typography variant="body1">  PHONE: </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div className={classes.TopContentDetailsLeft}>
                    <div className={classes.ChildPropertiesValue}>
                      <Typography variant="body1" className={classes.boldFont}>
                        {detail.fullNameReceiver}
                      </Typography>
                      <Typography variant="body1" className={classes.boldFont}>
                        {detail.billAddress}
                      </Typography>
                      <Typography variant="body1" className={classes.boldFont}>
                        {(detail.phoneNumberReceiver)}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.bottomContent}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <div className={classes.commonTitle}>
                    <Typography variant="h6" className={classes.boldFont}>
                      {t("ordersPage.details.titleMid")}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              {detail.billDetailList?.length > 0 &&
                detail.billDetailList.map((item, index) => (
                  <ReviewsOrderItem
                    key={index}
                    id={item.productID}
                    img={item.images}
                    status={detail.status}
                    name={item.prodName}
                    quantity={item.prodQuantity}
                    cmt={check}
                    onReview={reviewHandler}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer hasSideBar />
    </>
  );
};
export default ReviewsPage;
