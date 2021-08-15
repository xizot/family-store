import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Pagination from '@material-ui/lab/Pagination';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../../reducers/ui';
import SearchInput from '../../../../components/UI/SearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Add } from '@material-ui/icons';
import { getListProductByPage } from '../../../../reducers/product';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import TableError from '../../../../components/TableError/TableError';
import TableLoading from '../../../../components/TableLoading/TableLoading';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  topContent: {
    borderRadius: theme.shape.borderRadius,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    margin: 0,
    padding: theme.spacing(1),
  },
  filter: {
    marginTop: theme.spacing(2),
    marginBottom: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
      '&:not(:last-child)': {
        marginRight: 0,
      },
    },
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 70,
    },
  },
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
    marginLeft: theme.spacing(1),
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  addButton: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  search: {
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  pagination: {
    '& > *': {
      justifyContent: 'center',
      display: 'flex',
    },
  },
  tableHead: {
    fontWeight: 'bold',
    color: 'red',
  },
}));

const ProductManager = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [error, setError] = useState('');
  const loading = useSelector((state) => state.product.loading);

  const dispatch = useDispatch();
  // const [optionPrice, setOptionPrice] = useState('Price');
  // const [optionType, setOptionType] = useState('Ascending');

  const openAddModalHandler = () => {
    setOpenAddModal(true);
    setOpenUpdateModal(false);
  };

  const openUpdateModalHandler = () => {
    setOpenUpdateModal(true);
    setOpenAddModal(false);
  };

  const closeModalHandler = () => {
    setOpenUpdateModal(false);
    setOpenAddModal(false);
  };
  // const typeChangeHandler = (event) => {
  //   setOptionType(event.target.value);
  // };
  // const priceChangeHandler = (event) => {
  //   setOptionPrice(event.target.value);
  // };

  const getListProductByPageHandler = useCallback(
    async (page = 1) => {
      try {
        const response = await dispatch(getListProductByPage(page)).unwrap();
        setProductInfo(response);
        console.log(response);
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(uiActions.hideModal());

    getListProductByPageHandler();
  }, [dispatch, getListProductByPageHandler]);

  useEffect(() => {
    document.title = 'Product Admin';
  }, [t]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(productInfo);
  return (
    <>
      <div className={classes.root}>
        <AddProduct isOpen={openAddModal} onClose={closeModalHandler} />
        <UpdateProduct isOpen={openUpdateModal} onClose={closeModalHandler} />

        <div className={classes.section}>
          <Typography variant="h5" className={classes.title}>
            PRODUCT MANAGER
          </Typography>
          <div className={classes.filter}>
            <div className={classes.search}>
              <SearchInput />
            </div>
            {/* <div className={classes.filterItem}>
              <Typography variant="subtitle2" className={classes.label}>
                CATEGORY
              </Typography>
              <NativeSelect
                className={classes.select}
                value={optionPrice}
                onChange={priceChangeHandler}
                name="price"
                input={<BootstrapInput />}>
                <option style={{ color: '#F39148' }} value="">
                  Vegetables
                </option>
                <option style={{ color: '#F39148' }} value={10}>
                  Milk, Drink
                </option>
                <option style={{ color: '#F39148' }} value={20}>
                  Rice, Bread
                </option>
              </NativeSelect>
            </div>
            <div className={classes.filterItem}>
              <Typography variant="subtitle2" className={classes.label}>
                SUB CATEGORY
              </Typography>
              <NativeSelect
                className={classes.select}
                name="type"
                value={optionType}
                onChange={typeChangeHandler}
                input={<BootstrapInput />}>
                <option style={{ color: '#F39148' }} value="">
                  Milk
                </option>
                <option style={{ color: '#F39148' }} value={10}>
                  Borecole
                </option>
                <option style={{ color: '#F39148' }} value={20}>
                  Fish
                </option>
              </NativeSelect>
            </div> */}
            <div className={classes.addButton}>
              <Button
                startIcon={<Add />}
                variant="contained"
                color="primary"
                className={classes.addButton}
                onClick={openAddModalHandler}>
                Add
              </Button>
            </div>
          </div>
        </div>

        <div className={`${classes.tableSection} `}>
          {loading ? (
            <TableLoading />
          ) : error?.length > 0 ? (
            <TableError message={error} onTryAgain={getListProductByPageHandler} />
          ) : productInfo?.listProduct?.length > 0 ? (
            <>
              <TableContainer component={Paper} className={classes.section}>
                <Table aria-label="a dense table">
                  <TableHead>
                    <TableRow className={classes.tableHead}>
                      <TableCell>Index</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Last Modified</TableCell>
                      <TableCell align="center">Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productInfo?.listProduct &&
                      productInfo.listProduct.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{row.prod_name}</TableCell>
                          <TableCell>
                            <img
                              src={row.images[0]}
                              alt={row.prod_name}
                              style={{ width: 100, height: 80 }}
                            />
                          </TableCell>
                          <TableCell>{row.prod_category_id}</TableCell>
                          <TableCell>{row.prod_amount}</TableCell>
                          <TableCell>{row.prod_price}</TableCell>
                          <TableCell>{row.prod_description}</TableCell>
                          <TableCell>{row.prod_updated_date}</TableCell>
                          <TableCell align="center" style={{ minWidth: 150 }}>
                            <EditIcon
                              onClick={openUpdateModalHandler}
                              fontSize="small"
                              style={{ marginRight: 5, cursor: 'pointer' }}
                            />
                            <DeleteIcon fontSize="small" style={{ cursor: 'pointer' }} />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className={`${classes.pagination} ${classes.section}`}>
                <Pagination count={10} color="primary" variant="outlined" shape="rounded" />
              </div>
            </>
          ) : (
            <TableError message="No data in database" onTryAgain={getListProductByPageHandler} />
          )}
        </div>
      </div>
    </>
  );
};
export default ProductManager;
