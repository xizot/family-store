import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  NativeSelect,
  InputBase,
  withStyles,
  Button,
  Fade,
  Backdrop,
  Modal,
  Box
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../../reducers/ui';
import AddComponent from './AddSubCategory';
import { Add, Delete, Edit } from '@material-ui/icons';
import { getListCategory } from '../../../../reducers/category';
import TableError from '../../../../components/TableError/TableError';
import { toast } from 'react-toastify';
import TableLoading from '../../../../components/TableLoading/TableLoading';
import { getListSubCategory, deleteCategory } from '../../../../reducers/sub-category';
import ModalConfirm from '../../../../components/ModalConfirm/ModalConfirm';
import SearchInputV2 from '../../../../components/UI/SearchInputV2';
import CustomTablePagination from '../../../../components/CustomTablePagination/CustomTablePagination';
import useStyles from './SubCategory.styles';

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
    padding: '10px 26px 7px 12px',
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

const SubCateManager = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [detail, setDetail] = useState({});
  const [action, setAction] = useState('insert');
  const totalPage = useSelector((state) => state.subCategory.totalPage);
  const [limit, setLimit] = useState(10);
  const [sub, setSub] = useState([]);
  const [page, setPage] = useState(0);
  const [optionFather, setOptionFather] = useState('');
  const [search, setSearch] = useState('');
  const [fatherCategory, setFatherCategory] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const searchChangeHandler = (value) => {
    setSearch(value);
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
    getListChildCategoryHandler(optionFather, value + 1, limit);
  };

  const editSubCategory = (item) => {
    setAction('update');
    setDetail(item);
    setOpen(true);
  };

  const handleOpen = () => {
    setAction('insert');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClose(false);
  };

  const subCateDeleteHandler = (e, item) => {
    e.stopPropagation();
    setClose(true);
    setDetail(item);
  };

  const subCateDeleteConfirm = async () => {
    try {
      setClose(false);
      await dispatch(deleteCategory(detail.cateId)).unwrap();
      await getListChildCategoryHandler(optionFather);
      toast.success(t('toastMessages.admin.subCategory.deleteSuccess'));
    } catch (err) {
      toast.error(err);
      console.log('🚀 ~ file: SubCategory.js ~ line 199 ~ subCateDeleteConfirm ~ err', err);
    }
  };

  const getListChildCategoryHandler = useCallback(
    async (cateFather, page, limit) => {
      setPageLoading(true);
      if (!cateFather || cateFather.length <= 0) {
        setPageLoading(false);
        return;
      }
      try {
        const response = await dispatch(
          getListSubCategory({ cateFather, page: page === 0 ? 1 : page, limit })
        ).unwrap();
        setSub(response.subCategories);
        setPageLoading(false);
      } catch (error) {
        setError(error);
        setPageLoading(false);
      }
    },
    [dispatch]
  );

  const fatherCategoryChangeHandler = async (value) => {
    setSub([]);
    setPage(0);
    setOptionFather(value);
    if (value) {
      getListChildCategoryHandler(value, 0, limit);
    }
  };

  const getListFatherCategoryHandler = useCallback(async () => {
    try {
      const response = await dispatch(getListCategory({ page: 1, limit: 9999 })).unwrap();
      setFatherCategory(response.paginationResult);
      if (response.paginationResult.length > 0) {
        fatherCategoryChangeHandler(response.paginationResult[0].cateId);
      } else {
        setPageLoading(false);
      }
    } catch (err) {
      setError(err);
      setPageLoading(false);
    }
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const limitPerPageChangeHandler = (event) => {
    const newLimit = +event.target.value;
    setLimit(newLimit);
    setPage(0);
    getListChildCategoryHandler(optionFather, 0, newLimit);
  };

  useEffect(() => {
    dispatch(uiActions.hideModal());
    getListFatherCategoryHandler();
  }, [dispatch, getListFatherCategoryHandler]);

  useEffect(() => {
    document.title = t('pagesTitle.admin.subCategory');
  }, [t]);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography variant="h5" className={classes.title}>
				{t('adminPage.subCategory.title')}
        </Typography>
        <div className={classes.filter}>
          <div className={classes.search}>
            <SearchInputV2
              placeholder= {t('adminPage.subCategory.searchPlaceHolder')}
              initialValue={search}
              onChange={searchChangeHandler}
            />
          </div>
          <div className={classes.filterItem}>
            <Typography variant="subtitle2" className={classes.label}>
						{t('adminPage.subCategory.fatherCatetory')}
            </Typography>
            <NativeSelect
              value={optionFather}
              className={classes.select}
              onChange={(e) => fatherCategoryChangeHandler(e.target?.value)}
              name="price"
              input={<BootstrapInput />}>
              <option aria-label="None" value="" />
              {fatherCategory &&
                fatherCategory.length > 0 &&
                fatherCategory.map((row, index) => (
                  <option style={{ color: '#F39148' }} value={row.cateId} key={index}>
                    {row.cateName}
                  </option>
                ))}
            </NativeSelect>
          </div>
          <div className={classes.addButton}>
            <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<Add />}>
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
            onTryAgain={getListChildCategoryHandler.bind(null, optionFather, page, limit)}
          />
        ) : sub?.length > 0 ? (
          <Paper className={classes.section}>
            <TableContainer>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow className={classes.tableHead}>
                    <TableCell style={{ width: 20, textAlign: 'center', fontWeight: 'bold' }}>
                      #
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}> {t('adminPage.subCategory.table.subCategoryId')} </TableCell>
                    <TableCell style={{ textAlign: 'center' }}> {t('adminPage.subCategory.table.subCategoryName')} </TableCell>
                    <TableCell> {t('generalTable.lastModified')} </TableCell>
                    <TableCell> {t('generalTable.options')} </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sub?.length > 0 &&
                    sub
                      .filter((subcategory) =>
                        subcategory.cateName.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((row, index) => (
                        <TableRow
                          key={index}
                          onClick={() => editSubCategory(row)}
                          className={classes.tableRow}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ width: 20, textAlign: 'center', fontWeight: 'bold' }}>
                            {page * 10 + index + 1}
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{row.cateId}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{row.cateName}</TableCell>
                          <TableCell> {row.createDate || t('generalTable.unknown')} </TableCell>
                          <TableCell>
                            <Box display="flex">
                              <Edit
                                className={classes.actionIcon}
                                onClick={() => editSubCategory(row)}
                              />
                              <Delete
                                className={classes.actionIcon}
                                onClick={(e) => subCateDeleteHandler(e, row)}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <CustomTablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={totalPage * limit}
              rowsPerPage={limit}
              page={page}
              onPageChange={pageChangeHandler}
              onRowsPerPageChange={limitPerPageChangeHandler}
            />
          </Paper>
        ) : (
          <TableError
            message= {t('generalTable.emptyData')}
            onTryAgain={getListChildCategoryHandler.bind(null, optionFather, page, limit)}
          />
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box className={classes.content}>
            <AddComponent
              cateFather={optionFather}
              action={action}
              cate={detail}
              father={fatherCategory}
              parentHandleClose={handleClose}
              getList={getListChildCategoryHandler.bind(null, optionFather, page)}
            />
          </Box>
        </Fade>
      </Modal>

      <ModalConfirm
        isOpen={close}
        onConfirm={subCateDeleteConfirm}
        onClose={handleClose}
        title= {t('deleteModal.subCategory')}
      />
    </div>
  );
};
export default SubCateManager;
