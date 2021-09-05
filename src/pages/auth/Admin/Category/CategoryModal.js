import { makeStyles, TextField, Typography, FormControl, Modal } from '@material-ui/core';
import { useInput } from '../../../../hooks/use-input';
import * as Validate from '../../../../helpers/validate';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateSubCategory } from '../../../../reducers/category';
import { toast } from 'react-toastify';
import ButtonWithLoading from '../../../../components/UI/ButtonWithLoading/ButtonWithLoading';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '30rem',
    maxWidth: '90%',
    margin: '20vh auto 0',
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(5),
  },
  form: {
    marginTop: '9px',
    marginBottom: theme.spacing(2),
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
  modalTitle: {
    marginBottom: theme.spacing(2),
  },
}));

const CategoryModal = ({ item, title, type, isOpen, onClose, getList }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const modifyLoading = useSelector((state) => state.category.modifyLoading);

  const {
    enteredInput: cateName,
    hasError: cateNameHasError,
    inputBlurHandler: cateNameBlurHandler,
    inputChangeHandler: cateNameChangeHandler,
    inputIsValid: cateNameIsValid,
    inputReset: cateReset,
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
        cateReset();
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        await dispatch(addCategory({ cateName })).unwrap();
        toast.success('Add new category successfully');
        getList();
        onClose();
        cateReset();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const closeHandler = () => {
    onClose();
    cateReset();
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeHandler}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div className={classes.paper}>
        <Typography
          variant="h5"
          style={{ textAlign: 'center', color: '#F39148' }}
          className={classes.modalTitle}>
          {title}
        </Typography>
        <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
          <FormControl className={classes.form} fullWidth size="small">
            <TextField
              label="Category Name"
              variant="outlined"
              value={cateName}
              error={cateNameHasError}
              helperText={cateNameHasError && 'Category name must be not null or empty!'}
              onBlur={cateNameBlurHandler}
              onChange={cateNameChangeHandler}
              size="small"
            />
          </FormControl>
          <ButtonWithLoading
            isLoading={modifyLoading}
            onClick={formSubmitHandler}
            disabled={!cateNameIsValid}>
            Save
          </ButtonWithLoading>
        </form>
      </div>
    </Modal>
  );
};
export default CategoryModal;
