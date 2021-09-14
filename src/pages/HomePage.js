import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../components/Layout/Footer';
import ProductItem from '../components/ProductItem/ProductItem';
import SideBar from '../components/SideBar/SideBar';
import Header from './../components/Layout/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoriesMenu from '../components/CategoriesMenu/CategoriesMenu';
import { getHomeProduct } from '../reducers/user-product.reducer';
import { useCart } from '../hooks/use-cart';
import RequestLoading from '../components/RequestLoading/RequestLoading';
import { Link } from 'react-router-dom';
import { ChevronRight } from '@material-ui/icons';

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

  topContent: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    padding: 45,
    backgroundImage: 'URL(img/home-banner.png)',
    backgroundPosition: 'right bottom',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      backgroundPosition: '60% 100%',
    },
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: 30,
    },
  },

  topContentTitle: {
    position: 'relative',
    zIndex: 1,
    width: '60%',
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '38px',
    },
  },

  topContentQuotes: {
    position: 'relative',
    zIndex: 1,
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px',
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,.1)',
  },
  saleContent: {
    marginBottom: theme.spacing(1),
  },
  section: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2, 0),
    backgroundColor: '#FFF',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
  },

  topSaleTitle: {
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    color: '#F39148',
    fontWeight: '500',
    textTransform: 'uppercase',
    position: 'relative',
    margin: theme.spacing(2),
    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      right: 0,
      width: 5,
      height: '100%',
      background: theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.4rem',
    },
  },

  listSale: {
    width: '100%',
    margin: 0,
    padding: theme.spacing(1),
  },
  viewMore: {
    background: '#fff',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    margin: '20px auto 0',
    textDecoration: 'none',
    fontWeight: 'bold',
    textAlign: 'center',
    fonttFamily: 'Roboto, Helvetica, Arial, sans-serif',
    color: theme.palette.primary.main,
    transition: 'all .5s',
    '&:hover': {
      color: '#fff',
      background: theme.palette.primary.main,
    },
  },
}));

const HomePage = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [homeProducts, setHomeProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addNew } = useCart();

  const getHomeProductHandler = useCallback(async () => {
    setLoading(true);
    try {
      const response = await dispatch(getHomeProduct()).unwrap();
      setHomeProducts(response.information);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('🚀 ~ file: HomePage.js ~ line 581 ~ getHomeProductHandler ~ error', error);
    }
  }, [dispatch]);

  useEffect(() => {
    document.title = t('pagesTitle.landing');
  }, [t]);

  useEffect(() => {
    getHomeProductHandler();
  }, [getHomeProductHandler]);
  return (
    <>
      <div className={classes.root}>
        <Header showMenu showCart />
        <SideBar>
          <CategoriesMenu />
        </SideBar>
        <div className={classes.main}>
          <div className={classes.mainContent}>
            <div className={classes.topContent}>
              <span className={classes.overlay}></span>
              <Typography variant="h3" className={classes.topContentTitle}>
                {t('homepage.bannerTitle')}
              </Typography>
              <Typography variant="h5" className={classes.topContentQuotes}>
                {t('homepage.bannerDescription')}
              </Typography>
            </div>
            {loading ? (
              <RequestLoading />
            ) : (
              homeProducts?.length > 0 &&
              homeProducts
                .filter((item) => item.listProducts.length > 0)
                .map((item, index) => (
                  <div className={classes.section} key={index}>
                    <Typography variant="h5" className={classes.topSaleTitle}>
                      {item.cateName}
                    </Typography>
                    <Grid container spacing={3} className={classes.listSale}>
                      {item.listProducts.map((product, index) => (
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
                    <Link to={`/collections/${item.cateId}`} className={classes.viewMore}>
												{t("generalButtons.viewMore")}
                      <ChevronRight />
                    </Link>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <Footer hasSideBar />
    </>
  );
};
export default HomePage;
