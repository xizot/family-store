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
// import Pagination from '@material-ui/lab/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../../reducers/ui';
import SearchInput from '../../../../components/UI/SearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Add } from '@material-ui/icons';
import { getListCategory, deleteCategory } from '../../../../reducers/category';
import TableError from '../../../../components/TableError/TableError';
import TableLoading from '../../../../components/TableLoading/TableLoading';
import { toast } from 'react-toastify';
import ModalConfirm from '../../../../components/ModalConfirm/ModalConfirm';
import CategoryModal from './CategoryModal';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
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
      marginRight: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      '&:not(:last-child)': {
        marginBottom: theme.spacing(1),
      },
    },
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 70,
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
    marginRight: theme.spacing(2),
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,

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
  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState('UPDATE');
  const [itemSelected, setItemSelected] = useState(null);

  const pageChangeHandler = (event, value) => {
    setPage(value);
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

  const openDeleteModalHandler = (id) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  };

  const DeleteConfirm = async () => {
    try {
      await dispatch(deleteCategory(selectedId)).unwrap();
      await getListCategoryHandler(page);
      toast.success(`Delete category id ${selectedId} successfully`);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setOpenDeleteModal(false);
  };

  const getListCategoryHandler = useCallback(
    async (selectedPage) => {
      try {
        await dispatch(getListCategory(selectedPage)).unwrap();
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(uiActions.hideModal());

    getListCategoryHandler(page);
  }, [dispatch, getListCategoryHandler, page]);

  useEffect(() => {
    document.title = 'Category Admin';
  }, [t]);
  useEffect(() => {
    if (page > totalPage) {
      setPage(totalPage || 1);
    }
  }, [page, totalPage]);
  return (
    <div className={classes.root}>
      <CategoryModal
        title={type === 'UPDATE' ? 'UPDATE CATEGORY' : 'ADD NEW CATEGORY'}
        isOpen={openModal}
        onClose={handleClose}
        item={itemSelected}
        type={type}
        getList={getListCategoryHandler.bind(null, page)}
      />

      <ModalConfirm
        title="Delete Category"
        isOpen={openDeleteModal}
        onClose={handleClose}
        onConfirm={DeleteConfirm}
      />
      <div className={classes.section}>
        <Typography variant="h5" className={classes.title}>
          CATEGORY MANAGER
        </Typography>
        <div className={classes.filter}>
          <div className={classes.search}>
            <SearchInput />
          </div>
          <div className={classes.addButton}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => openModalHandler('ADD')}>
              Add
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
          <>
            <TableContainer component={Paper} className={classes.section}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow className={classes.tableHead}>
                    <TableCell style={{ width: 20, textAlign: 'center' }}>Index</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Category Name</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Sub Category Inside</TableCell>
                    <TableCell>Last Modified</TableCell>
                    <TableCell align="center">Options</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.length > 0 &&
                    data.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: 20, textAlign: 'center' }}>
                          {index + 1}
                        </TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{row.cateName}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>
                          {row.subCategories.length}
                        </TableCell>
                        <TableCell>{row.createDate}</TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            startIcon={<EditIcon />}
                            style={{ padding: '0' }}
                            onClick={() => openModalHandler('UPDATE', row)}
                          />
                          <Button
                            size="small"
                            startIcon={<DeleteIcon />}
                            style={{ padding: '0' }}
                            onClick={() => openDeleteModalHandler(row.cateId)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={`${classes.pagination} ${classes.section}`}>
              <Pagination
                count={totalPage || 1}
                page={page}
                onChange={pageChangeHandler}
                color="primary"
                variant="outlined"
                shape="rounded"
              />
            </div>
          </>
        ) : (
          <TableError
            message="No data available in database"
            onTryAgain={getListCategoryHandler.bind(null, page)}
          />
        )}
      </div>
    </div>
  );
};
export default SubCateManager;
