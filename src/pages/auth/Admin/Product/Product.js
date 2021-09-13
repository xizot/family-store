import {
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
  TablePagination,
  FormControl,
  Select,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../../reducers/ui';
import { Add, Delete, Edit } from '@material-ui/icons';
import { deleteProduct, getByCate } from '../../../../reducers/product';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import TableError from '../../../../components/TableError/TableError';
import TableLoading from '../../../../components/TableLoading/TableLoading';
import ModalConfirm from '../../../../components/ModalConfirm/ModalConfirm';
import { toast } from 'react-toastify';
import { removeHtmlTag } from '../../../../helpers';
import SearchInputV2 from '../../../../components/UI/SearchInputV2';
import useStyles from './Product.styles';
import { getListCategory } from '../../../../reducers/category';

const ProductManager = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productInfo, setProductInfo] = useState({ listProduct: [], numberOfPage: 0 });
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setselectedCategory] = useState('');
  let { listProduct, numberOfPage } = productInfo;
  const categories = useSelector((state) => state.category.data);
  const [pageLoading, setPageLoading] = useState(true);

  const dispatch = useDispatch();

  const openAddModalHandler = () => {
    setOpenAddModal(true);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
  };

  const openUpdateModalHandler = (id) => {
    setSelectedId(id);
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

  const selectedCategoryChangeHandler = (e) => {
    const newSelected = e.target?.value;
    setselectedCategory(newSelected);
    setPage(0);
  };
  const limitPerPageChangeHandler = (event) => {
    const newLimit = +event.target.value;
    setLimit(newLimit);
    setPage(0);
    getListProductHandler(0, newLimit);
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  const productDeleteHandler = async () => {
    if (!selectedId) return;
    try {
      await dispatch(deleteProduct(selectedId)).unwrap();
      toast.success(`Delete product id ${selectedId} successfully`);

      getListProductHandler(page, limit);
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
    closeModalHandler();
  };

  const getListProductHandler = useCallback(
    async (catID, page, limit) => {
      setPageLoading(true);
      if (!catID || catID === '') {
        setPageLoading(false);

        return;
      }
      try {
        const response = await dispatch(
          getByCate({ catID, page: page === 0 ? 1 : page, limit })
        ).unwrap();

        setProductInfo({ listProduct: response.listProduct, numberOfPage: response.numberOfPage });
        setPageLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setPageLoading(false);
      }
    },
    [dispatch]
  );

  const searchChangeHandler = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    setProductInfo({ listProduct: [], numberOfPage: 0 });
    if (selectedCategory !== '') {
      getListProductHandler(selectedCategory, page, limit);
    }
  }, [selectedCategory, page, limit, getListProductHandler]);

  useEffect(() => {
    const getListCategoryHandler = async () => {
      try {
        const response = await dispatch(getListCategory({ page: 1, limit: 9999 })).unwrap();
        if (response.paginationResult.length > 0) {
          if (response.paginationResult[0]?.subCategories.length > 0) {
            setselectedCategory(response.paginationResult[0].subCategories[0].cateId);
          } else {
            setPageLoading(false);
          }
        } else {
          setPageLoading(false);
        }
      } catch (err) {
        setPageLoading(false);
      }
    };
    getListCategoryHandler();
  }, [dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(uiActions.hideModal());
    document.title = 'Product Admin';
  }, [t, dispatch]);
  return (
    <>
      <div className={classes.root}>
        <AddProduct
          isOpen={openAddModal}
          onClose={closeModalHandler}
          getList={getListProductHandler.bind(null, selectedCategory, page, limit)}
        />
        <UpdateProduct
          itemInfo={selectedItem}
          isOpen={openUpdateModal}
          onClose={closeModalHandler}
          getList={getListProductHandler.bind(null, selectedCategory, page, limit)}
          prodId={selectedId}
        />
        <ModalConfirm
          title= {t('deleteModal.product')}
          isOpen={openDeleteModal}
          onClose={closeModalHandler}
          onConfirm={productDeleteHandler}
        />

        <div className={classes.section}>
          <Typography variant="h5" className={classes.title}>
						{t('adminPage.product.title')}
          </Typography>
          <div className={classes.filter}>
            <div className={classes.search}>
              <SearchInputV2
                placeholder= {t('adminPage.product.searchPlaceHolder')}
                initialValue={search}
                onChange={searchChangeHandler}
              />
            </div>
            <div className={classes.textField}>
              <FormControl variant="outlined" size="small" fullWidth>
                <Select native value={selectedCategory} onChange={selectedCategoryChangeHandler}>
                  <option aria-label="None" value="" style={{ color: '#F39148' }}>
                    Categories
                  </option>
                  {categories?.length > 0 &&
                    categories.map((cate, index) => (
                      <optgroup label={cate.cateName} key={index} style={{ color: '#F39148' }}>
                        {cate.subCategories?.length > 0 &&
                          cate.subCategories.map((subCate, index) => (
                            <option value={subCate.cateId} key={index} style={{ color: '#F39148' }}>
                              {subCate.cateName}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.addButton}>
              <Button
                startIcon={<Add />}
                variant="contained"
                color="primary"
                className={classes.addButton}
                onClick={openAddModalHandler}>
                {t('generalButtons.add')}
              </Button>
            </div>
          </div>
        </div>

        <div className={`${classes.tableSection} `}>
          {pageLoading ? (
            <TableLoading />
          ) : error?.length > 0 ? (
            <TableError
              message={error}
              onTryAgain={getListProductHandler.bind(null, selectedCategory, page, limit)}
            />
          ) : listProduct?.length > 0 ? (
            <Paper className={classes.section}>
              <TableContainer>
                <Table aria-label="a dense table" style={{ minWidth: '1200px' }}>
                  <TableHead>
                    <TableRow className={classes.tableHead}>
                      <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
                      <TableCell> {t('adminPage.product.table.productId')} </TableCell>
                      <TableCell width={200}> {t('adminPage.product.table.productName')} </TableCell>
                      <TableCell> {t('adminPage.product.table.image')} </TableCell>
                      <TableCell> {t('adminPage.product.table.category')} </TableCell>
                      <TableCell style={{ minWidth: '95px' }}> {t('adminPage.product.table.quantity')} </TableCell>
                      <TableCell style={{ minWidth: '105px' }}> {t('adminPage.product.table.price')} </TableCell>
                      <TableCell width={500}> {t('adminPage.product.table.description')} </TableCell>
                      <TableCell style={{ minWidth: '140px' }}> {t('generalTable.lastModified')} </TableCell>
                      <TableCell align="center" style={{ minWidth: '95px' }}>  {t('generalTable.options')}  </TableCell>
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
                          onClick={() => openUpdateModalHandler(row.prod_id)}
                          className={classes.tableRow}>
                          <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                            {page * limit + index + 1}
                          </TableCell>
                          <TableCell>{row.prod_id}</TableCell>
                          <TableCell>
                            <Box className={classes.productName}>{row.prod_name}</Box>
                          </TableCell>
                          <TableCell>
                            <img
                              src={row.images || process.env.PUBLIC_URL + '/img/no-product.png'}
                              alt={row.prod_name}
                              style={{ width: 100, height: 80, objectFit: 'cover' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box width={150} style={{ wordBreak: 'break-word' }}>
                              {row.prod_category_name}
                            </Box>
                          </TableCell>
                          <TableCell>{row.prod_amount}</TableCell>
                          <TableCell>{row.prod_price}</TableCell>
                          <TableCell>
                            <Box className={classes.longTextStyle}>
                              {removeHtmlTag(row.prod_description)}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box width={100} style={{ wordBreak: 'break-word' }}>
                              {row.prod_updated_date || row.prod_created_date || t('generalTable.unknown')}
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Box display="flex">
                              <Edit
                                className={classes.actionIcon}
                                onClick={() => openUpdateModalHandler(row.prod_id)}
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
              <TablePagination
                rowsPerPageOptions={[1, 2, 10, 25, 100]}
                component="div"
                count={numberOfPage * limit}
                rowsPerPage={limit}
                page={page}
                onPageChange={pageChangeHandler}
                onRowsPerPageChange={limitPerPageChangeHandler}
              />
            </Paper>
          ) : (
            <TableError
              message= {t('generalTable.emptyData')}
              onTryAgain={getListProductHandler.bind(null, selectedCategory, page, limit)}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default ProductManager;
