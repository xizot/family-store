import { Grid, NativeSelect, withStyles, InputBase, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Pagination from '@material-ui/lab/Pagination';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Layout/Footer';
import SideBar from '../components/SideBar/SideBar';
import Header from './../components/Layout/Header';
import ProductItem from './../components/ProductItem/ProductItem';
import { uiActions } from '../reducers/ui';
import CategoryMenu from '../components/CategoriesMenu/CategoriesMenu';
import useStyles from './SearchPage.styles';
import { searchActions, searchProduct } from '../reducers/search.reducer';
import { toast } from 'react-toastify';
import { useCart } from '../hooks/use-cart';
import RequestLoading from '../components/RequestLoading/RequestLoading';
import TableError from '../components/TableError/TableError';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 14,
    color: '#FFF',
    height: 17,
    maxWidth: 150,
    padding: '10px 26px 7px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: ['Arial'].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.down('xs')]: {},
  },
}))(InputBase);

const SearchPage = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const urlQuery = decodeURIComponent(location.search.slice(3));
  const query = useSelector((state) => state.search.query);
  const dispatch = useDispatch();
  const [filterBy, setFilterBy] = useState('prod_created_date');
  const [sortBy, setSortBy] = useState('asc');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsSearch, setItemsSearch] = useState([]);
  const { addNew } = useCart();

  const filterChangeHandler = (event) => {
    setFilterBy(event.target.value);
  };
  const sortChangeHandler = (event) => {
    setSortBy(event.target.value);
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  const searchProductHandler = useCallback(async () => {
    try {
      setPageLoading(true);
      if (query && query.length <= 0) {
        setPageLoading(false);
        return;
      }
      const response = await dispatch(
        searchProduct({
          prodName: query,
          limit: 10,
          page,
          sortBy,
          filter: filterBy,
        })
      ).unwrap();
      setTotalPage(response.numberOfPage);
      setItemsSearch(response.listProduct);
      setPageLoading(false);
    } catch (error) {
      toast.error(error);
      setError(error);
      setPageLoading(false);
    }
  }, [dispatch, query, page, sortBy, filterBy]);

  useEffect(() => {
    dispatch(uiActions.hideModal());
    document.title = t('pagesTitle.search');
  }, [dispatch, t]);

  useEffect(() => {
    searchProductHandler();
  }, [searchProductHandler]);

  useEffect(() => {
    dispatch(searchActions.setQuery(urlQuery));
  }, [dispatch, urlQuery]);

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
              <Typography variant="h5">
                {t('searchPage.topContent')} "{query}"
              </Typography>
              <div className={classes.filter}>
                <div className={classes.filterItem}>
                  <Typography variant="subtitle2" className={classes.label}>
										{t('searchPage.sortBy.title')}
                  </Typography>
                  <NativeSelect
                    className={classes.select}
                    value={filterBy}
                    onChange={filterChangeHandler}
                    name="price"
                    input={<BootstrapInput />}>
                    <option style={{ color: '#F39148' }} value="prod_name">
											{t('searchPage.sortBy.name')}
                    </option>
                    <option style={{ color: '#F39148' }} value="prod_amount">
											{t('searchPage.sortBy.quantity')}
                    </option>
                    <option style={{ color: '#F39148' }} value="prod_price">
											{t('searchPage.sortBy.price')}
                    </option>
                    <option style={{ color: '#F39148' }} value="prod_created_date">
											{t('searchPage.sortBy.createdDate')}
                    </option>
                  </NativeSelect>
                </div>
                <div className={classes.filterItem}>
                  <Typography vvariant="subtitle2" className={classes.label}>
										{t('searchPage.sortType.title')}
                  </Typography>
                  <NativeSelect
                    className={classes.select}
                    name="type"
                    value={sortBy}
                    onChange={sortChangeHandler}
                    input={<BootstrapInput />}>
                    <option style={{ color: '#F39148' }} value="asc">
											{t('searchPage.sortType.asc')}
                    </option>
                    <option style={{ color: '#F39148' }} value="desc">
											{t('searchPage.sortType.desc')}
                    </option>
                  </NativeSelect>
                </div>
              </div>
            </div>
            <div className={classes.section}>
              {pageLoading ? (
                <RequestLoading />
              ) : error ? (
                <TableError message={error} onTryAgain={searchProductHandler(query)} />
              ) : itemsSearch?.length > 0 ? (
                <>
                  <Grid container spacing={2}>
                    {itemsSearch.map((item, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
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
                    ))}
                  </Grid>
                  {totalPage > 0 && (
                    <div className={`${classes.pagination} ${classes.shadow}`}>
                      <Pagination
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        page={page}
                        onChange={pageChangeHandler}
                        count={totalPage}
                      />
                    </div>
                  )}
                </>
              ) : (
                <Typography> {t('searchPage.emptyMessage')} </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer hasSideBar />
    </>
  );
};
export default SearchPage;
