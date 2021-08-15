import ProductModal from './ProductModal';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  ListSubheader,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: '10vh',
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
    width: 300,
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
    width: 20,
    height: 20,
    '& >label': {
      display: 'flex',
    },
  },
  textField: {
    marginBottom: theme.spacing(1),

    '& > p': {
      width: 300,
      fontWeight: 'bold',
    },
  },
  productInformation: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  image: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  menuPaper: {
    maxHeight: 300,
  },
}));

const UpdateProduct = ({ isOpen, onClose }) => {
  const classes = useStyles();

  return (
    <ProductModal isOpen={isOpen} onClose={onClose}>
      <div className={classes.root}>
        <Box borderRadius={6} className={classes.content}>
          <Box marginBottom={4} marginTop={2}>
            <Typography variant="h5" className={classes.title}>
              ADD PRODUCTS
            </Typography>
            <Typography variant="caption" className={classes.subTitle}>
              Family Admin Panel
            </Typography>
          </Box>
          <Box display="flex" flexWrap="wrap" className={classes.section}>
            <Box display="flex" marginBottom={2} className={classes.image}>
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
                  <label htmlFor="img2">
                    <Add />
                  </label>
                </IconButton>
                <IconButton color="primary" className={classes.iconAdd}>
                  <label htmlFor="img3">
                    <Add />
                  </label>
                </IconButton>
                <IconButton color="primary" className={classes.iconAdd}>
                  <label htmlFor="img4">
                    <Add />
                  </label>
                </IconButton>
                <IconButton color="primary" className={classes.iconAdd}>
                  <label htmlFor="img5">
                    <Add />
                  </label>
                </IconButton>
              </div>
            </Box>
            <Box className={classes.productInformation}>
              <div className={classes.textField}>
                <Typography variant="body1" component="p">
                  Title
                </Typography>
                <TextField variant="outlined" size="small" fullWidth />
              </div>

              <div className={classes.textField}>
                <Typography variant="body1" component="p">
                  Category
                </Typography>
                <FormControl variant="outlined" size="small" fullWidth>
                  <Select defaultValue="" MenuProps={{ classes: { paper: classes.menuPaper } }}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <ListSubheader>Category 1</ListSubheader>
                    <MenuItem value={1}>Option 1</MenuItem>
                    <MenuItem value={2}>Option 2</MenuItem>
                    <ListSubheader>Category 2</ListSubheader>
                    <MenuItem value={3}>Option 3</MenuItem>
                    <MenuItem value={4}>Option 4</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.textField}>
                <Typography variant="body1" component="p">
                  Price (VND)
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  inputProps={{ type: 'number' }}
                  fullWidth
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="body1" component="p">
                  Amount
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  inputProps={{ type: 'number' }}
                  fullWidth
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="body1" component="p">
                  Add Description
                </Typography>
                <TextField variant="outlined" size="small" multiline rows={4} fullWidth />
              </div>
              <Box>
                <Button color="primary" variant="contained" style={{ marginRight: 16 }}>
                  ADD
                </Button>
                <Button variant="contained" onClick={onClose}>
                  Discard
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </ProductModal>
  );
};

export default UpdateProduct;
