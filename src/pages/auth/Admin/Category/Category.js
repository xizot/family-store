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
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
// import Pagination from '@material-ui/lab/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../../reducers/ui';
import { Add, Delete, Edit } from '@material-ui/icons';
import { getListCategory, deleteCategory } from '../../../../reducers/category';
import TableError from '../../../../components/TableError/TableError';
import TableLoading from '../../../../components/TableLoading/TableLoading';
import { toast } from 'react-toastify';
import ModalConfirm from '../../../../components/ModalConfirm/ModalConfirm';
import CategoryModal from './CategoryModal';
import SearchInputV2 from '../../../../components/UI/SearchInputV2';
import useStyles from './Category.styles';
import CustomTablePagination from '../../../../components/CustomTablePagination/CustomTablePagination';

const SubCateManager = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [error, setError] = useState('');
  const data = useSelector((state) => state.category.data);
  const totalPage = useSelector((state) => state.category.totalPage);
  const loading = useSelector((state) => state.category.loading);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState('UPDATE');
  const [itemSelected, setItemSelected] = useState(null);

  const searchChangeHandler = (value) => {
    setSearch(value);
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
    getListCategoryHandler(value + 1, limit);
  };

  const openModalHandler = (type, item = null) => {
    setType(type);
    setOpenModal(true);
    setOpenDeleteModal(false);
    if (item) {
      setItemSelected(item);
    }
  };

  const handleClose = () => {
    setOpenDeleteModal(false);
    setOpenModal(false);

    setSelectedId(null);
    setItemSelected(null);
  };

  const openDeleteModalHandler = (e, id) => {
    e.stopPropagation();
    setSelectedId(id);
    setOpenDeleteModal(true);
  };

  const DeleteConfirm = async () => {
    try {
      await dispatch(deleteCategory(selectedId)).unwrap();
      await getListCategoryHandler(page);
      // toast.success(`Delete category id ${selectedId} successfully`);
			toast.success(t('toastMessages.admin.category.deleteSuccess'));
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setOpenDeleteModal(false);
  };

  const limitPerPageChangeHandler = (event) => {
    const newLimit = +event.target.value;
    setLimit(newLimit);
    setPage(0);
    getListCategoryHandler(0, newLimit);
  };

  const getListCategoryHandler = useCallback(
    async (page, limit) => {
      try {
        await dispatch(getListCategory({ page: page === 0 ? 1 : page, limit })).unwrap();
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(uiActions.hideModal());
    getListCategoryHandler(0, 10);
  }, [dispatch, getListCategoryHandler]);

  useEffect(() => {
    document.title = 'Category Admin';
  }, [t]);

  return (
    <div className={classes.root}>
      <CategoryModal
        title={type === 'UPDATE' ? t('adminPage.category.modal.updateTitle') : t('adminPage.category.modal.addingTitle')}
        isOpen={openModal}
        onClose={handleClose}
        item={itemSelected}
        type={type}
        getList={getListCategoryHandler.bind(null, page)}
      />

      <ModalConfirm
        title= {t('deleteModal.category')}
        isOpen={openDeleteModal}
        onClose={handleClose}
        onConfirm={DeleteConfirm}
      />
      <div className={classes.section}>
        <Typography variant="h5" className={classes.title}>
					{t('adminPage.category.title')}
        </Typography>
        <div className={classes.filter}>
          <div className={classes.search}>
            <SearchInputV2
              placeholder= {t('adminPage.category.searchPlaceHolder')}
              initialValue={search}
              onChange={searchChangeHandler}
            />
          </div>
          <div className={classes.addButton}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => openModalHandler('ADD')}>
              {t('generalButtons.add')}
            </Button>
          </div>
        </div>
      </div>

      <div className={`${classes.tableSection} `}>
        {loading ? (
          <TableLoading />
        ) : error?.length > 0 ? (
          <TableError message={error} onTryAgain={getListCategoryHandler.bind(null, page)} />
        ) : data?.length > 0 ? (
          <Paper className={classes.section}>
            <TableContainer>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow className={classes.tableHead}>
                    <TableCell style={{ width: 20, textAlign: 'center', fontWeight: 'bold' }}>
                      #
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}> {t('adminPage.category.table.categoryId')} </TableCell>
                    <TableCell style={{ textAlign: 'center' }}> {t('adminPage.category.table.categoryName')} </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>  {t('adminPage.category.table.subCategoryCount')} </TableCell>
                    <TableCell> {t('generalTable.lastModified')} </TableCell>
                    <TableCell> {t('generalTable.options')} </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.length > 0 &&
                    data
                      .filter((category) =>
                        category.cateName.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((row, index) => (
                        <TableRow
                          key={index}
                          onClick={() => openModalHandler('UPDATE', row)}
                          className={classes.tableRow}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ width: 20, textAlign: 'center', fontWeight: 'bold' }}>
                            {page * limit + index + 1}
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{row.cateId}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{row.cateName}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            {row.subCategories.length}
                          </TableCell>
                          <TableCell>{row.createDate || t('generalTable.unknown')} </TableCell>
                          <TableCell>
                            <Box display="flex">
                              <Edit
                                className={classes.actionIcon}
                                onClick={() => openModalHandler('UPDATE', row)}
                              />
                              <Delete
                                className={classes.actionIcon}
                                onClick={(e) => openDeleteModalHandler(e, row.cateId)}
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
            onTryAgain={getListCategoryHandler.bind(null, page)}
          />
        )}
      </div>
    </div>
  );
};
export default SubCateManager;
