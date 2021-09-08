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
import {getAllOrder,getDeliveringOrder,getDeliveredOrder} from '../../reducers/order.reducer';
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

const itemsOrderCancel = [
  {
    id: '000144006',
    img: 'https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png',
    date: '05/02/2021',
    expected: '23/02/2021',
    total: 100000,
    status: 'Cancel',
  },
];
const itemsOrderConfirm = [
  {
    id: '000144008',
    img: 'https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png',
    date: '01/02/2022',
    expected: '25/02/2022',
    total: 500000,
    status: 'Await confirm',
  },
];

const OrderPage = (props) => {
  const img = "https://www.shareicon.net/data/128x128/2015/10/07/113776_packages_512x512.png"
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const {data,delivering,totalPage,delivered} = useSelector((state) => state.order);
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

  useEffect(() => {
    getAllOrderHandler(page);
  }, [dispatch, getAllOrderHandler, page]);

  const handleChange = (event, newValue) => {
    if(newValue === '2'){
      getDeliveringOrderHandler(page);
    }
    if(newValue === "3"){
      getDeliveredOrderHandler(page);
    }
    setValue(newValue);
  };

  useEffect(() => {
    document.title = 'All Order';
  }, []);

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
                  variant="fullWidth"
                  aria-label="full width tabs example">
                  <Tab label="All Order" value="0" />
                  <Tab label="Awaiting confirm" value="1" />
                  <Tab label="Delivering" value="2" />
                  <Tab label="Delivered" value="3" />
                  <Tab label="Cancel" value="4" />
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
                      />
                    ))}
                </TabPanel>
                <TabPanel value="1">
                  {itemsOrderConfirm?.length > 0 &&
                    itemsOrderConfirm.map((item, index) => (
                      <OrderItem
                        key={index}
                        id={item.id}
                        img={item.img}
                        status={item.status}
                        date={item.date}
                        expected={item.expected}
                        total={item.total}
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
                      />
                    ))}
                </TabPanel>
                <TabPanel value="4">
                  {itemsOrderCancel?.length > 0 &&
                    itemsOrderCancel.map((item, index) => (
                      <OrderItem
                        key={index}
                        id={item.id}
                        img={item.img}
                        status={item.status}
                        date={item.date}
                        expected={item.expected}
                        total={item.total}
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
