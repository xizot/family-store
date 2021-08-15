import { makeStyles, TextField, Typography, Button, FormControl, Chip } from '@material-ui/core';
import { useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useInput } from '../../../../hooks/use-input';
import * as Validate from '../../../../helpers/validate';
import { FormHelperText } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../../reducers/category';
import { getListSubCategory } from '../../../../reducers/sub-category';
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
  autoComplete: {
    marginTop: theme.spacing(2),
  },
}));
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
];
const AddSubCate = (props) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [error, setError] = useState('');

  const {
    enteredInput: cateName,
    hasError: cateNameHasError,
    inputBlurHandler: cateNameBlurHandler,
    inputChangeHandler: cateNameChangeHandler,
    inputIsValid: cateNameIsValid,
    inputReset: cateNameReset,
  } = useInput(Validate.isNotEmpty);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!cateNameIsValid) return;
    setError('');
    cateNameReset();
  };

  const addCategoryHandler = async () => {
    try {
      await dispatch(
        addCategory({
          cateName: cateName,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getListSubCategory()).unwrap();
  }, [dispatch]);

  return (
    <>
      <div className={classes.paper}>
        <Typography variant="h5" style={{ textAlign: 'center', color: '#F39148' }}>
          CATEGORY
        </Typography>
        <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
          <FormControl className={classes.form}>
            <TextField
              placeholder="Name"
              fullWidth
              variant="outlined"
              value={cateName}
              helperText={cateNameHasError && 'Name invalid'}
              onBlur={cateNameBlurHandler}
              onChange={cateNameChangeHandler}
            />
            <Autocomplete
              className={classes.autoComplete}
              multiple
              id="tags-standard"
              freeSolo
              options={top100Films.map((option) => option.title)}
              defaultValue={[top100Films[2].title]}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="filled" label="Sub Categories" placeholder="Fish" />
              )}
            />

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
        </form>
      </div>
    </>
  );
};
export default AddSubCate;
