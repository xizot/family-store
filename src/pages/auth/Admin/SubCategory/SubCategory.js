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
  Modal,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../../reducers/ui';
import SearchInput from '../../../../components/UI/SearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddComponent from './AddSubCategory';
import { Add } from '@material-ui/icons';

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
const rows = [
  {
    id: 1,
    name: 'Mì trứng cao cấp Meizan gói 500g',
    subCate: 'Thực phẩm',
    quantity: '200',
    lastModi: '01-02-2010',
  },
  {
    id: 2,
    name: 'Bột giặt 500g',
    subCate: 'Đồ tiện dụng',
    quantity: '2002',
    lastModi: '01-01-2021',
  },
  {
    id: 3,
    name: 'Hành lá 1kg',
    subCate: 'Rau củ',
    quantity: '400',
    lastModi: '01-01-2021',
  },
  {
    id: 4,
    name: 'Hành Tây 500g',
    subCate: 'Rau củ',
    quantity: '1000',

    lastModi: '01-01-2021',
  },
  {
    id: 5,
    name: 'Bột xã Omo 500g',
    subCate: 'Đồ tiện dụng',
    quantity: '2000',
    lastModi: '22-01-2021',
  },
  {
    id: 6,
    name: 'Bánh mì Bơ Tewan',
    subCate: 'Lương thực',
    quantity: '400',
    lastModi: '11-12-2021',
  },
  {
    id: 7,
    name: 'Rau cần tây',
    subCate: 'Rau củ',
    quantity: '4000',
    lastModi: '25-08-2021',
  },
  {
    id: 8,
    name: 'Sữa tươi Vina milk',
    subCate: 'Sữa, nước ngọt',
    quantity: '1000',
    lastModi: '12-01-2021',
  },
  {
    id: 9,
    name: 'Bánh tầm 500g',
    subCate: 'Lương thực',
    quantity: '2000',
    lastModi: '22-02-2021',
  },
];

const SubCateManager = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const [optionPrice, setOptionPrice] = useState('Price');

  const priceChangeHandler = (event) => {
    setOptionPrice(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(uiActions.hideModal());
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Sub Category Admin';
  }, [t]);

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
          <div className={classes.addButton}>
            <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<Add />}>
              Add
            </Button>
          </div>
        </div>
      </div>

      <TableContainer component={Paper} className={classes.section}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell>Index</TableCell>
              <TableCell>Sub Category Name</TableCell>
              <TableCell>Father Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Last Modified</TableCell>
              <TableCell align="center">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.subCate}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.lastModi}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    style={{ padding: '0' }}
                    onClick={handleOpen}></Button>
                  <Button size="small" startIcon={<DeleteIcon />} style={{ padding: '0' }}></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={`${classes.pagination} ${classes.section}`}>
        <Pagination count={rows.length} color="primary" variant="outlined" shape="rounded" />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition>
        <Fade in={open}>
          <AddComponent />
        </Fade>
      </Modal>
    </div>
  );
};
export default SubCateManager;
