import {
  makeStyles,
  TextField,
  Typography,
  Button,
  FormControl,
  NativeSelect,
  InputBase,
  withStyles,
  Box,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { FormHelperText } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addSubCategory, updateSubCategory } from '../../../../reducers/sub-category';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
  },
  form: {
    marginTop: '9px',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  modalTitle: {
    marginBottom: theme.spacing(2),
  },
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
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
const AddSubCate = ({ cateFather, cate, action, parentHandleClose, father, getList }) => {
	const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [subCateName, setSubCateName] = useState(cate?.cateName || '');
  const [cateIdFather, setCateIdFather] = useState(cateFather || '');

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

    if (subCateName.trim().length <= 0) {
      setError('Category name must be not null or empty!');
      return;
    }

    if (action === 'insert') {
      try {
        await dispatch(
          addSubCategory({
            cateName: subCateName,
            cateFather: +cateIdFather,
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
            cateFather: +cateIdFather,
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
    <div className={classes.paper}>
      <Typography
        variant="h5"
        style={{ textAlign: 'center', color: '#F39148' }}
        className={classes.modalTitle}>
        	{t('adminPage.subCategory.title')}
      </Typography>
      <FormControl className={classes.form} fullWidth>
        <TextField
          fullWidth
          variant="outlined"
          label= {t('adminPage.subCategory.table.subCategoryName')}
          value={subCateName}
          onChange={subCateNameChangeHandler}
          size="small"
          className={classes.textField}
          focused
        />
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          <Typography variant="subtitle2" className={classes.label}>
						{t('adminPage.subCategory.fatherCatetory')}
          </Typography>
          <NativeSelect
            className={classes.select}
            value={cateIdFather}
            onChange={fatherCateChangeHandler}
            name="price"
            input={<BootstrapInput />}>
            {father.map((row, index) => (
              <option style={{ color: '#F39148' }} value={row.cateId} key={index}>
                {row.cateName}
              </option>
            ))}
          </NativeSelect>
        </Box>
      </FormControl>
      <Button
        className={classes.save}
        variant="contained"
        fullWidth
        component="label"
        onClick={addCategoryHandler}>
        	{t('generalButtons.save')}
      </Button>
      {error?.length > 0 && (
        <FormHelperText error style={{ marginBottom: 10 }}>
          {error}
        </FormHelperText>
      )}
    </div>
  );
};
export default AddSubCate;
