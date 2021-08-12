import { makeStyles, TextField, Typography, Button, FormControl } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../../reducers/admin-category';
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

const AddSubCate = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const addCategoryHandler = async () => {
    try {
      await dispatch(
        addCategory({
          cateId: 'meat',
          cateName: 'Meats',
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={classes.paper}>
        <Typography variant="h5" style={{ textAlign: 'center', color: '#F39148' }}>
          ADD NEW CATEGORY
        </Typography>
        <FormControl className={classes.form}>
          <TextField placeholder="Name" fullWidth variant="outlined" />
          <Button
            className={classes.save}
            variant="contained"
            fullWidth
            component="label"
            onClick={addCategoryHandler}>
            Save
          </Button>
        </FormControl>
      </div>
    </>
  );
};
export default AddSubCate;
