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
  NativeSelect,
  InputBase,
  withStyles,
  Button,
  Fade,
  Backdrop,
  Modal,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../../reducers/ui';
import SearchInput from '../../../../components/UI/SearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddComponent from './AddSubCategory';
import { Add } from '@material-ui/icons';
import { getListCategory } from '../../../../reducers/category';
import TableError from '../../../../components/TableError/TableError';
import { toast } from 'react-toastify';
import TableLoading from '../../../../components/TableLoading/TableLoading';
import { getListSubCategory, deleteCategory } from '../../../../reducers/sub-category';
import DeleteModal from '../DeleteModal';

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
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #ddd',
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
    width: 75,
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

const SubCateManager = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [detail, setDetail] = useState({});
  const [action, setAction] = useState('insert');
  const data = useSelector((state) => state.category.data);
  const sub = useSelector((state) => state.subCategory.data);
  const loading = useSelector((state) => state.category.loading);

  const [optionFather, setOptionFather] = useState(3);

  const fatherChangeHandler = (event) => {
    setOptionFather(event.target.value);
    dispatch(getListSubCategory(event.target.value));
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
  };

  const subCateDeleteHandler = (item) => {
    setClose(true);
    setDetail(item);
  };
  const subCateDeleteConfirm = () => {
    dispatch(deleteCategory(detail.cateId));
    setClose(false);
    dispatch(getListSubCategory(optionFather));
    toast.success('Delete successfully');
  };

  const subCateDeleteClose = () => {
    setClose(false);
  };

  const getListSubCategoryHandler = useCallback(async () => {
    try {
      await dispatch(getListCategory()).unwrap();
    } catch (err) {
      setError(err);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(uiActions.hideModal());
    getListSubCategoryHandler();
  }, [dispatch, getListSubCategoryHandler]);

  useEffect(() => {
    document.title = 'Sub Category Admin';
    dispatch(getListSubCategory(optionFather));
  }, [t, optionFather, dispatch, data]);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography variant="h5" className={classes.title}>
          SUB CATEGORY MANAGER
        </Typography>
        <div className={classes.filter}>
          <div className={classes.search}>
            <SearchInput />
          </div>
          <div className={classes.filterItem}>
            <Typography variant="subtitle2" className={classes.label}>
              FATHER CATEGORY
            </Typography>
            <NativeSelect
              className={classes.select}
              value={optionFather}
              onChange={fatherChangeHandler}
              name="price"
              input={<BootstrapInput />}>
              {data.map((row) => (
                <option style={{ color: '#F39148' }} value={row.cateId}>
                  {row.cateName}
                </option>
              ))}
            </NativeSelect>
          </div>
          <div className={classes.addButton}>
            <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<Add />}>
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className={`${classes.tableSection} `}>
        {loading ? (
          <TableLoading />
        ) : error?.length > 0 ? (
          <TableError message={error} onTryAgain={getListSubCategoryHandler} />
        ) : data?.length > 0 ? (
          <>
            <TableContainer component={Paper} className={classes.section}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow className={classes.tableHead}>
                    <TableCell>Index</TableCell>
                    <TableCell>Sub Category Name</TableCell>
                    <TableCell>Last Modified</TableCell>
                    <TableCell align="center">Options</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sub?.length > 0 &&
                    sub.map((row, index) => (
                      <TableRow key={index + 1}>
                        <TableCell component="th" scope="row">
                          {index}
                        </TableCell>
                        <TableCell>{row.cateName}</TableCell>
                        <TableCell>01-02-2021</TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            startIcon={<EditIcon />}
                            style={{ padding: '0' }}
                            onClick={() => editSubCategory(row)}></Button>
                          <Button
                            size="small"
                            startIcon={<DeleteIcon />}
                            style={{ padding: '0' }}
                            onClick={() => subCateDeleteHandler(row)}></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={`${classes.pagination} ${classes.section}`}>
              <Pagination count={data.length} color="primary" variant="outlined" shape="rounded" />
            </div>
          </>
        ) : (
          <TableError
            message="No data available in database"
            onTryAgain={getListSubCategoryHandler}
          />
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <AddComponent
            cateFather={optionFather}
            action={action}
            cate={detail}
            father={data}
            parentHandleClose={handleClose}
          />
        </Fade>
      </Modal>
      <Modal
        open={close}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <DeleteModal
            parentHandleConfirm={subCateDeleteConfirm}
            parentHandleClose={subCateDeleteClose}
          />
        </Fade>
      </Modal>
    </div>
  );
};
export default SubCateManager;
