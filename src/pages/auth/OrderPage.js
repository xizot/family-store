import { makeStyles, Tab } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import Footer from '../../components/Layout/Footer';
import Header from './../../components/Layout/Header';
import SideBar from '../../components/SideBar/SideBar';
import OrderItem from './../../components/Order/OrderItem';
import CategoryMenu from '../../components/CategoriesMenu/CategoriesMenu';
import {
  getAllOrder,
  getDeliveringOrder,
  getDeliveredOrder,
  getCancelOrder,
} from '../../reducers/order.reducer';
import { useTranslation } from 'react-i18next';

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
  shadow: {
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
  },

  mainContent: {
    padding: `80px ${theme.spacing(2)}px 65px`,
    [theme.breakpoints.down('xs')]: {
      padding: `68px ${theme.spacing(2)}px 85px`,
      width: '100%',
    },
  },
  topContent: {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },

  listItem: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
  },
}));

const OrderPage = () => {
  const { t } = useTranslation();
  // const img = "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png";
  const img =
    'https://icons.veryicon.com/png/o/system/crm-android-app-icon/app-icon-sales-order.png';
  const classes = useStyles();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const { data, delivering, totalPage, delivered, confirm, cancel } = useSelector(
    (state) => state.order
  );
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('0');

  const getAllOrderHandler = useCallback(
    async (selectedPage) => {
      try {
        await dispatch(getAllOrder(selectedPage)).unwrap();
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  const getDeliveringOrderHandler = useCallback(
    async (selectedPage) => {
      try {
        await dispatch(getDeliveringOrder(selectedPage)).unwrap();
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  const getDeliveredOrderHandler = useCallback(
    async (selectedPage) => {
      try {
        await dispatch(getDeliveredOrder(selectedPage)).unwrap();
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );



  const getCancelOrderHandler = useCallback(
    async (selectedPage) => {
      try {
        await dispatch(getCancelOrder(selectedPage)).unwrap();
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getAllOrderHandler(page);
  }, [dispatch, getAllOrderHandler, page]);

  const handleChange = (event, newValue) => {
    if (newValue === '2') {
      getDeliveringOrderHandler(page);
    }
    if (newValue === '3') {
      getDeliveredOrderHandler(page);
    }
    if (newValue === '4') {
      getCancelOrderHandler(page);
    }
    setValue(newValue);
  };

  useEffect(() => {
    document.title = t('pagesTitle.orders');
  }, [t]);

  useEffect(() => {
    if (page > totalPage) {
      setPage(totalPage || 1);
    }
  }, [page, totalPage]);

  return (
    <>
      <div className={classes.root}>
        <Header showMenu showCart />
        <SideBar>
          <CategoryMenu />
        </SideBar>
        <div className={classes.main}>
          <div className={classes.mainContent}>
            <TabContext value={value}>
              <div className={`${classes.topContent} ${classes.shadow}`}>
                <TabList
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  variant="fullWidth">
                  <Tab label={t('ordersPage.all')} value="0" />
                  <Tab label={t('ordersPage.delivering')} value="2" />
                  <Tab label={t('ordersPage.delivered')} value="3" />
                  <Tab label={t('ordersPage.canceled')} value="4" />
                </TabList>
              </div>
              <div className={classes.listItem}>
                <TabPanel value="0">
                  {data?.length > 0 &&
                    data.map((item, index) => (
                      <OrderItem
                        key={index}
                        id={item.billId}
                        img={img}
                        status={item.billStatus}
                        date={item.createDate}
                        expected={item.expectedDate}
                        total={item.totalPrice}
                        detail={item.billDetailList}
                      />
                    ))}
                </TabPanel>
                <TabPanel value="2">
                  {delivering?.length > 0 &&
                    delivering.map((item, index) => (
                      <OrderItem
                        key={index}
                        id={item.billId}
                        img={img}
                        status={item.billStatus}
                        date={item.createDate}
                        expected={item.expectedDate}
                        total={item.totalPrice}
                        detail={item.billDetailList}
                      />
                    ))}
                </TabPanel>
                <TabPanel value="3">
                  {delivered?.length > 0 &&
                    delivered.map((item, index) => (
                      <OrderItem
                        key={index}
                        id={item.billId}
                        img={img}
                        status={item.billStatus}
                        date={item.createDate}
                        expected={item.expectedDate}
                        total={item.totalPrice}
                        detail={item.billDetailList}
                      />
                    ))}
                </TabPanel>
                <TabPanel value="4">
                  {cancel?.length > 0 &&
                    cancel.map((item, index) => (
                      <OrderItem
                        key={index}
                        id={item.billId}
                        img={img}
                        status={item.billStatus}
                        date={item.createDate}
                        expected={item.expectedDate}
                        total={item.totalPrice}
                        detail={item.billDetailList}
                      />
                    ))}
                </TabPanel>
              </div>
            </TabContext>
          </div>
        </div>
      </div>
      <Footer hasSideBar />
    </>
  );
};
export default OrderPage;
