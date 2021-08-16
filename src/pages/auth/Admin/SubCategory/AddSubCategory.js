import {
  makeStyles,
  TextField,
  Typography,
  Button,
  FormControl,
  Grid,
  NativeSelect,
  InputBase,
  withStyles,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { FormHelperText } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addSubCategory, updateSubCategory } from '../../../../reducers/sub-category';

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: '60vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    marginTop: '9px',
    minWidth: '60vh',
  },
  native: {
    marginTop: '9px',
    minWidth: '60vh',
  },
  select: {
    position: 'absolute',
    right: '0px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
    marginLeft: theme.spacing(1),
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  label: {
    marginTop: theme.spacing(1),
  },
  search: {
    marginTop: theme.spacing(1),
  },
  importImg: {
    color: '#fff',
    position: 'absolute',
    right: '0px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
    width: '113px',
    height: '27px',
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  save: {
    color: '#fff',
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
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
const AddSubCate = ({ cateFather, cate, action, parentHandleClose, father, getList }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [subCateName, setSubCateName] = useState(cate?.cateName || '');
  const [cateIdFather, setCateIdFather] = useState(cateFather);

  useEffect(() => {
    if (action === 'insert') {
      setSubCateName('');
    }
  }, [action]);
  const subCateNameChangeHandler = (e) => {
    setSubCateName(e.target.value);
  };
  const fatherCateChangeHandler = (event) => {
    setCateIdFather(event.target.value);
  };

  const addCategoryHandler = async () => {
    setError('');
    if (action === 'insert') {
      try {
        await dispatch(
          addSubCategory({
            cateName: subCateName,
            cateFather: cateIdFather,
          })
        ).unwrap();
        getList();
        parentHandleClose();
        toast.success('Add successfully');
      } catch (error) {
        setError(error);
        toast.error(error);
      }
    }
    if (action === 'update') {
      try {
        await dispatch(
          updateSubCategory({
            cateFather: cateIdFather,
            cateId: cate.cateId,
            cateName: subCateName,
          })
        ).unwrap();
        toast.success('Update successfully');
        getList();
        parentHandleClose();
      } catch (error) {
        setError(error);
        toast.error(error);
      }
    }
  };

  return (
    <>
      <div className={classes.paper}>
        <Typography variant="h5" style={{ textAlign: 'center', color: '#F39148' }}>
          MODAL SUB CATEGORY
        </Typography>
        <FormControl className={classes.form}>
          <TextField
            fullWidth
            variant="outlined"
            value={subCateName}
            onChange={subCateNameChangeHandler}
          />
          <Grid container spacing={2} className={classes.native}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" className={classes.label} />
              Father Category Name
            </Grid>
            <Grid item xs={12} sm={6}>
              <NativeSelect
                className={classes.select}
                value={cateIdFather}
                onChange={fatherCateChangeHandler}
                name="price"
                input={<BootstrapInput />}>
                {father.map((row) => (
                  <option style={{ color: '#F39148' }} value={row.cateId}>
                    {row.cateName}
                  </option>
                ))}
              </NativeSelect>
            </Grid>
          </Grid>
          <Button
            className={classes.save}
            variant="contained"
            fullWidth
            component="label"
            onClick={addCategoryHandler}>
            Save
          </Button>
        </FormControl>
        {error?.length > 0 && (
          <FormHelperText error style={{ marginBottom: 10 }}>
            {error}
          </FormHelperText>
        )}
      </div>
    </>
  );
};
export default AddSubCate;
