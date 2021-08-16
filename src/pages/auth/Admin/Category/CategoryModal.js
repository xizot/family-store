import { makeStyles, TextField, Typography, Button, FormControl, Modal } from '@material-ui/core';
import { useEffect } from 'react';
import { useInput } from '../../../../hooks/use-input';
import * as Validate from '../../../../helpers/validate';
import { useDispatch } from 'react-redux';
import { getListSubCategory } from '../../../../reducers/sub-category';
import { addCategory, updateSubCategory } from '../../../../reducers/category';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '30rem',
    margin: '20vh auto 0',
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(5),
  },
  form: {
    marginTop: '9px',
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
  autoComplete: {
    marginTop: theme.spacing(2),
  },
}));

const CategoryModal = ({ item, title, type, isOpen, onClose, getList }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    enteredInput: cateName,
    hasError: cateNameHasError,
    inputBlurHandler: cateNameBlurHandler,
    inputChangeHandler: cateNameChangeHandler,
    inputIsValid: cateNameIsValid,
  } = useInput(Validate.isNotEmpty, item?.cateName || '');

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!cateNameIsValid) return;

    if (type === 'UPDATE') {
      try {
        await dispatch(updateSubCategory({ cateName, cateId: item?.cateId })).unwrap();
        toast.success(`Update category id ${item?.cateId} successfully`);
        getList();
        onClose();
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        await dispatch(addCategory({ cateName })).unwrap();
        toast.success('Add new category successfully');
        getList();
        onClose();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    dispatch(getListSubCategory()).unwrap();
  }, [dispatch]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div className={classes.paper}>
        <Typography variant="h5" style={{ textAlign: 'center', color: '#F39148' }}>
          {title}
        </Typography>
        <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
          <FormControl className={classes.form} fullWidth size="small">
            <TextField
              label="Category Name"
              variant="outlined"
              value={cateName}
              helperText={cateNameHasError && 'Category name invalid'}
              onBlur={cateNameBlurHandler}
              onChange={cateNameChangeHandler}
              size="small"
            />
            <Button
              className={classes.save}
              variant="contained"
              fullWidth
              component="label"
              onClick={formSubmitHandler}>
              Save
            </Button>
          </FormControl>
        </form>
      </div>
    </Modal>
  );
};
export default CategoryModal;
