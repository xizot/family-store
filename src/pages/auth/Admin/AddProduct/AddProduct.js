import { Box, Button, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../../reducers/ui';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  content: {
    background: '#fff',
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  mainImage: {
    width: 400,
    paddingTop: '56.15%',
    borderRadius: theme.shape.borderRadius,
    background: '#f1f4fb',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 50px)',
    },
  },
  listUpload: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconAdd: {
    marginBottom: theme.spacing(1),
    background: '#f1f4fb',
  },
  textField: {
    marginBottom: theme.spacing(2),

    '& > p': {
      width: 300,
      fontWeight: 'bold',
    },
  },
}));

const AddProduct = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.hideModal());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Box borderRadius={6} className={classes.content}>
        <Box marginBottom={5} marginTop={3}>
          <Typography variant="h5" className={classes.title}>
            ADD PRODUCTS
          </Typography>
          <Typography variant="caption" className={classes.subTitle}>
            Family Admin Panel
          </Typography>
        </Box>
        <Box display="flex" marginBottom={2}>
          <div className={classes.mainImage}>
            <img alt="" />
          </div>
          <div className={classes.listUpload}>
            <input accept="image/jpeg" id="img1" type="file" style={{ display: 'none' }} />
            <input accept="image/jpeg" id="img2" type="file" style={{ display: 'none' }} />
            <input accept="image/jpeg" id="img3" type="file" style={{ display: 'none' }} />
            <input accept="image/jpeg" id="img4" type="file" style={{ display: 'none' }} />
            <input accept="image/jpeg" id="img5" type="file" style={{ display: 'none' }} />
            <IconButton color="primary" className={classes.iconAdd}>
              <label htmlFor="img1">
                <Add />
              </label>
            </IconButton>
            <IconButton color="primary" className={classes.iconAdd}>
              <Add />
            </IconButton>
            <IconButton color="primary" className={classes.iconAdd}>
              <Add />
            </IconButton>
            <IconButton color="primary" className={classes.iconAdd}>
              <Add />
            </IconButton>
            <IconButton color="primary" className={classes.iconAdd}>
              <Add />
            </IconButton>
          </div>
        </Box>
        <Box>
          <div className={classes.textField}>
            <Typography variant="body1" component="p">
              Title
            </Typography>
            <TextField variant="outlined" size="small" fullWidth />
          </div>
          <div className={classes.textField}>
            <Typography variant="body1" component="p">
              Price (VND)
            </Typography>
            <TextField variant="outlined" size="small" inputProps={{ type: 'number' }} fullWidth />
          </div>
          <div className={classes.textField}>
            <Typography variant="body1" component="p">
              Amount
            </Typography>
            <TextField variant="outlined" size="small" inputProps={{ type: 'number' }} fullWidth />
          </div>
          <div className={classes.textField}>
            <Typography variant="body1" component="p">
              Add Description
            </Typography>
            <TextField variant="outlined" size="small" multiline rows={4} fullWidth />
          </div>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button color="primary" variant="contained" style={{ marginRight: 16 }}>
            ADD
          </Button>
          <Button variant="contained">Discard</Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddProduct;
