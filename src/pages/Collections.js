import { Box, Breadcrumbs, Grid, makeStyles, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import ProductItem from '../components/ProductItem/ProductItem';
import SideBar from '../components/SideBar/SideBar';
import { uiActions } from '../reducers/ui';
import CategoryMenu from '../components/CategoriesMenu/CategoriesMenu';
import Pagination from '@material-ui/lab/Pagination';
import { getListProductByCateAndPage } from '../reducers/user-product.reducer';
import RequestLoading from '../components/RequestLoading/RequestLoading';
import { useCart } from '../hooks/use-cart';
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
  breadcrumbs: {
    marginBottom: theme.spacing(2),
    '& a': {
      textDecoration: 'none',
      opacity: 0.4,
      color: '#333',
    },
  },
  currentLink: {
    opacity: '1 !important',
  },
  banner: {
    position: 'relative',
    padding: '6.5rem 0',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url(${
      process.env.PUBLIC_URL + '/img/category-banner.jpg'
    }) no-repeat center/cover`,
    [theme.breakpoints.down('xs')]: {
      padding: '4rem 0',
    },
  },
  bannerOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,.3)',
  },
  bannerTitle: {
    position: 'relative',
    zIndex: 1,
    color: '#fff',
    textTransform: 'capitalize',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 38,
    },
  },
  section: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const Collections = (props) => {
  const classes = useStyles();
  const { categoryId: cateID } = useParams();
  const [page, setPage] = useState(1);
  const loading = useSelector((state) => state.userProduct.loading);
  const products = useSelector((state) => state.userProduct.products);
  const totalPage = useSelector((state) => state.userProduct.totalPage);
  const categories = useSelector((state) => state.userCategory.categories);
  const [catName, setCatName] = useState('');

  const dispatch = useDispatch();
  const { addNew } = useCart();

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };
  const getListProductByCateHandler = useCallback(
    async ({ cateID, page }) => {
      try {
        await dispatch(
          getListProductByCateAndPage({
            catID: +cateID,
            page,
          })
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(uiActions.hideModal());

    categories.forEach((category, index) => {
      if (catName.length > 0) {
        return;
      }
      category.subCategories.forEach((sub) => {
        if (sub.cateId === +cateID) {
          setCatName(sub.cateName);
          return;
        }
      });
    });
    setPage(1);
    getListProductByCateHandler({
      cateID,
      page: 1,
    });
  }, [dispatch, cateID, getListProductByCateHandler, categories, catName.length]);
  return (
    <>
      <div className={classes.root}>
        <Header showCart showMenu />
        <SideBar>
          <CategoryMenu />
        </SideBar>
        <div className={classes.main}>
          <div className={classes.mainContent}>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
              <Link color="inherit" to="/">
                Home
              </Link>

              {cateID && (
                <Typography
                  color="textPrimary"
                  style={{ textTransform: 'capitalize' }}
                  className={classes.currentLink}>
                  {catName}
                </Typography>
              )}
            </Breadcrumbs>

            {cateID && (
              <div className={classes.banner}>
                <span className={classes.bannerOverlay}></span>
                <Typography variant="h3" className={classes.bannerTitle}>
                  {catName}
                </Typography>
              </div>
            )}
            <div className={classes.section}>
              {loading && <RequestLoading />}
              {!loading && (
                <Grid container spacing={2}>
                  {products?.length > 0 ? (
                    products.map((item, index) => (
                      <Grid item key={index} xs={12} sm={4} md={3}>
                        <ProductItem
                          id={item.prod_id}
                          title={item.prod_name}
                          description={item.prod_description}
                          image={item.images}
                          price={item.prod_price}
                          salePrice={item.salePrice}
                          onAddToCart={addNew.bind(null, item, 1)}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Box padding={2} textAlign="center" width="100%">
                      <Typography variant="body1">Không có sản phẩm nào</Typography>
                    </Box>
                  )}
                </Grid>
              )}
            </div>
            {(products.length > 0 || page > 1) && (
              <Box display="flex" padding={5} justifyContent="center" className={classes.section}>
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={pageChangeHandler}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Box>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Collections;
