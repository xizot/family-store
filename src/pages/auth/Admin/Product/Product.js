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
  Box,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Pagination from '@material-ui/lab/Pagination';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../../reducers/ui';
import { Add, Delete, Edit } from '@material-ui/icons';
import { deleteProduct, getListProductByPage } from '../../../../reducers/product';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import TableError from '../../../../components/TableError/TableError';
import TableLoading from '../../../../components/TableLoading/TableLoading';
import ModalConfirm from '../../../../components/ModalConfirm/ModalConfirm';
import { toast } from 'react-toastify';
import { removeHtmlTag } from '../../../../helpers';
import SearchInputV2 from '../../../../components/UI/SearchInputV2';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(5),
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
  longTextStyle: {
    wordWrap: 'break-word',
    maxWidth: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  productName: {
    wordWrap: 'break-word',
    width: 200,
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },

  tableRow: {
    '&:hover': {
      background: '#dedede !important ',
      cursor: 'pointer',
    },
  },
  actionIcon: {
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
}));

const ProductManager = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const loading = useSelector((state) => state.product.loading);
  let { listProduct, numberOfPage } = productInfo;
  const dispatch = useDispatch();
  // const [optionPrice, setOptionPrice] = useState('Price');
  // const [optionType, setOptionType] = useState('Ascending');

  const openAddModalHandler = () => {
    setOpenAddModal(true);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
  };

  const openUpdateModalHandler = (item) => {
    setSelectedItem(item);
    setOpenUpdateModal(true);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
  };
  const openDeleteModalHandler = (e, id) => {
    e.stopPropagation();
    setSelectedId(id);
    setOpenUpdateModal(false);
    setOpenAddModal(false);
    setOpenDeleteModal(true);
  };

  const closeModalHandler = () => {
    setOpenUpdateModal(false);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
    setSelectedItem(null);
    setSelectedId(null);
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  const productDeleteHandler = async () => {
    if (!selectedId) return;
    try {
      await dispatch(deleteProduct(selectedId)).unwrap();
      toast.success(`Delete product id ${selectedId} successfully`);

      getListProductByPageHandler(page);
    } catch (err) {
      toast.error(err);
    }
    closeModalHandler();
  };

  const getListProductByPageHandler = useCallback(
    async (selectPage = 1) => {
      try {
        const response = await dispatch(getListProductByPage(selectPage)).unwrap();

        setProductInfo(response);
      } catch (err) {
        console.log('🚀 ~ file: Product.js ~ line 194 ~ err', err);
        setError(err);
      }
    },
    [dispatch]
  );

  const searchChangeHandler = (value) => {
    setSearch(value);
  };
  useEffect(() => {
    if (page > numberOfPage) {
      setPage(numberOfPage || 1);
    }
  }, [page, numberOfPage]);
  useEffect(() => {
    dispatch(uiActions.hideModal());
    getListProductByPageHandler(page);
  }, [dispatch, getListProductByPageHandler, page]);

  useEffect(() => {
    document.title = 'Product Admin';
  }, [t]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={classes.root}>
        <AddProduct
          isOpen={openAddModal}
          onClose={closeModalHandler}
          getList={getListProductByPageHandler.bind(null, page)}
        />
        <UpdateProduct
          itemInfo={selectedItem}
          isOpen={openUpdateModal}
          onClose={closeModalHandler}
          getList={getListProductByPageHandler.bind(null, page)}
        />
        <ModalConfirm
          title="Delete Product"
          isOpen={openDeleteModal}
          onClose={closeModalHandler}
          onConfirm={productDeleteHandler}
        />

        <div className={classes.section}>
          <Typography variant="h5" className={classes.title}>
            PRODUCT MANAGER
          </Typography>
          <div className={classes.filter}>
            <div className={classes.search}>
              <SearchInputV2
                placeholder="Tìm kiếm tên sản phẩm"
                initialValue={search}
                onChange={searchChangeHandler}
              />
            </div>

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
            <TableError message={error} onTryAgain={getListProductByPageHandler.bind(null, page)} />
          ) : listProduct?.length > 0 ? (
            <Paper className={classes.section}>
              <TableContainer>
                <Table aria-label="a dense table" style={{ minWidth: '1200px' }}>
                  <TableHead>
                    <TableRow className={classes.tableHead}>
                      <TableCell>ID</TableCell>
                      <TableCell width={200}>Product Name</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell width={500}>Description</TableCell>
                      <TableCell>Last Modified</TableCell>
                      <TableCell align="center">Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listProduct
                      .filter((product) =>
                        product.prod_name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((row, index) => (
                        <TableRow
                          key={index}
                          onClick={() => openUpdateModalHandler(row)}
                          className={classes.tableRow}>
                          <TableCell component="th" scope="row">
                            {row.prod_id}
                          </TableCell>
                          <TableCell>
                            <Box className={classes.productName}>{row.prod_name}</Box>
                          </TableCell>
                          <TableCell>
                            <img
                              src={row.images[0] || '/img/store-icon.png'}
                              alt={row.prod_name}
                              style={{ width: 100, height: 80, objectFit: 'cover' }}
                            />
                          </TableCell>
                          <TableCell>{row.prod_category_name}</TableCell>
                          <TableCell>{row.prod_amount}</TableCell>
                          <TableCell>{row.prod_price}</TableCell>
                          <TableCell>
                            <Box className={classes.longTextStyle}>
                              {removeHtmlTag(row.prod_description)}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {row.prod_updated_date || row.prod_created_date || ''}
                          </TableCell>
                          <TableCell align="center">
                            <Box display="flex">
                              <Edit
                                className={classes.actionIcon}
                                onClick={() => openUpdateModalHandler(row)}
                              />
                              <Delete
                                className={classes.actionIcon}
                                onClick={(e) => openDeleteModalHandler(e, row.prod_id)}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className={`${classes.pagination} ${classes.section}`}>
                <Pagination
                  count={numberOfPage}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                  page={page}
                  onChange={pageChangeHandler}
                />
              </div>
            </Paper>
          ) : (
            <TableError
              message="No data available in database"
              onTryAgain={getListProductByPageHandler.bind(null, page)}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default ProductManager;
