import {
  makeStyles,
  TextField,
  Typography,
  Button,
  FormControl,
} from '@material-ui/core';
import { useState } from 'react';
import { useInput } from '../../../../hooks/use-input'
import * as Validate from '../../../../helpers/validate';
import { FormHelperText } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addSubCategory } from '../../../../reducers/sub-category';

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

const AddSubCate = ({ cateFather }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const {
    enteredInput: subCateName,
    hasError: subCateNameHasError,
    inputBlurHandler: subCateNameBlurHandler,
    inputChangeHandler: subCateNameChangeHandler,
    inputIsValid: subCateNameIsValid,
    inputReset: subCateNameReset,
  } = useInput(Validate.isNotEmpty);

  const addCategoryHandler = () => {
    dispatch(
      addSubCategory({
        cateName: subCateName,
        cateFather: cateFather
      })
    ).unwrap();
    if (!subCateNameIsValid) return;
    setError('');
    subCateNameReset();

  };

  return (
    <>
      <div className={classes.paper}>
        <Typography variant="h5" style={{ textAlign: 'center', color: '#F39148' }}>
          ADD SUB CATEGORY
        </Typography>

        <FormControl className={classes.form}>
          <TextField placeholder="Name" fullWidth variant="outlined"
            value={subCateName}
            helperText={subCateNameHasError && 'Name invalid'}
            onBlur={subCateNameBlurHandler}
            onChange={subCateNameChangeHandler} />
          <Button className={classes.save} variant="contained" fullWidth component="label" onClick={addCategoryHandler}>
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
