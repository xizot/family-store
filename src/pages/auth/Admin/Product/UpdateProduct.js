import ProductModal from './ProductModal';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  makeStyles,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory } from '../../../../reducers/category';
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
    height: '400px',
    borderRadius: theme.shape.borderRadius,
    background: '#f1f4fb',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 50px)',
    },
  },
  listUpload: {},
  iconAdd: {
    marginBottom: theme.spacing(1),
    background: '#f1f4fb',
  },
  textField: {
    marginBottom: theme.spacing(1),

    '& > p': {
      width: 300,
      fontWeight: 'bold',
    },
  },
  productInformation: {
    width: 'calc(100% - 350px)',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  image: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  menuPaper: {
    maxHeight: 300,
  },
  section: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  miniImage: {
    position: 'relative',
    width: 60,
    height: 60,
  },
  iconDel: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 1,
    background: '#fff',
  },
}));

const UpdateProduct = ({ itemInfo, isOpen, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  // const [mainImageSrc, setMainImageSrc] = useState(null);
  // const [submitIsValid, setSubmitIsValid] = useState(true);
  const [error, setError] = useState('');

  const [currentTitle, setCurrentTitle] = useState('');
  const [currentcategoryId, setCurrentCategoryId] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [images, setImages] = useState([]);
  const [listRemoveImage, setListRemoveImage] = useState([]);
  const [listNewImage, setListNewImage] = useState([]);
  const [listNewImageRender, setListNewImageRender] = useState([]);

  const fileChangeHandler = (file) => {
    if (file) {
      setListNewImage((prevState) => [...prevState, file]);
      getBase64(file);
    }
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setListNewImageRender((prevSate) => [...prevSate, { file, image: reader.result }]);
    };
  };

  const removeFile = (item) => {
    console.log(item);
    if (images.includes(item)) {
      setImages((prevState) => prevState.filter((image) => image !== item));
      setListRemoveImage((prevState) => [...prevState, item]);
    }
    setListNewImage((prevState) => prevState.filter((image) => image !== item?.file));
    setListNewImageRender((prevState) => prevState.filter((image) => image !== item));
  };

  const getListCategoryHandler = useCallback(async () => {
    try {
      await dispatch(getListCategory()).unwrap();
    } catch (err) {}
  }, [dispatch]);

  const closeModalHandler = () => {
    if (itemInfo) {
      setCurrentTitle(itemInfo?.prod_name);
      setCurrentCategoryId(itemInfo?.prod_category_id);
      setCurrentPrice(itemInfo?.prod_price);
      setCurrentAmount(itemInfo?.prod_amount);
      setCurrentDescription(itemInfo?.prod_description);
      setImages(itemInfo?.images || []);
    }

    setError('');
    setListRemoveImage([]);
    onClose();
  };
  const addNewProductHandler = async () => {
    setError('');

    let formData = new FormData();

    // if (
    //   enteredTitle?.length > 0 &&
    //   enteredCategory?.length > 0 &&
    //   enteredPrice?.length > 0 &&
    //   enteredAmount?.length > 0
    // ) {
    //   setSubmitIsValid(true);
    // } else {
    //   setSubmitIsValid(false);
    //   return;
    // }

    for (let i = 0; i < images.length; i++) {
      formData.append('image', images[i]);
    }

    // formData.append('prodName', enteredTitle);
    // formData.append('prodCategoryID', enteredCategory);
    // formData.append('prodPrice', enteredPrice);
    // formData.append('prodAmount', enteredAmount);
    // formData.append('prodDescription', enteredDescription);
    // try {
    //   await dispatch(addNewProduct(formData)).unwrap();
    //   toast.success('Add new product success');
    // } catch (err) {
    //   setError(err);
    //   console.log('🚀 ~ file: AddProduct.js ~ line 140 ~ addNewProductHandler ~ error', error);
    // }
  };
  useEffect(() => {
    getListCategoryHandler();
  }, [dispatch, getListCategoryHandler]);

  useEffect(() => {
    if (itemInfo) {
      setCurrentTitle(itemInfo?.prod_name);
      setCurrentCategoryId(itemInfo?.prod_category_id);
      setCurrentPrice(itemInfo?.prod_price);
      setCurrentAmount(itemInfo?.prod_amount);
      setCurrentDescription(itemInfo?.prod_description);
      setImages(itemInfo?.images || []);
    }
  }, [itemInfo]);
  return (
    <ProductModal isOpen={isOpen} onClose={closeModalHandler}>
      <div className={classes.root}>
        <Box borderRadius={6} className={classes.content}>
          <Box marginBottom={4} marginTop={2}>
            <Typography variant="h5" className={classes.title}>
              UPDATE PRODUCTS
            </Typography>
            <Typography variant="caption" className={classes.subTitle}>
              Family Admin Panel
            </Typography>
          </Box>
          <form encType="multipart/form-data" className={classes.section}>
            <Box marginBottom={2} className={classes.image}>
              <div className={classes.mainImage}>
                <img
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className={classes.listUpload}>
                <input
                  accept="image/jpeg"
                  id="img1"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => fileChangeHandler(e.target.files[0])}
                />
                <Box display="flex" flexWrap="wrap" alignItems="center">
                  {images?.length > 0 &&
                    images.map((item, index) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        key={index}
                        marginRight={2}
                        className={classes.miniImage}>
                        <img
                          src={item}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <IconButton
                          color="primary"
                          onClick={() => removeFile(item)}
                          className={classes.iconDel}
                          size="small">
                          <Close
                            fontSize="small"
                            style={{
                              color: '#000',
                              cursor: 'pointer',
                            }}
                          />
                        </IconButton>
                      </Box>
                    ))}
                  {listNewImageRender?.length > 0 &&
                    listNewImageRender.map((item, index) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        key={index}
                        marginRight={2}
                        className={classes.miniImage}>
                        <img
                          src={item.image}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <IconButton
                          color="primary"
                          onClick={() => removeFile(item)}
                          className={classes.iconDel}
                          size="small">
                          <Close
                            fontSize="small"
                            style={{
                              color: '#000',
                              cursor: 'pointer',
                            }}
                          />
                        </IconButton>
                      </Box>
                    ))}
                </Box>

                <IconButton color="primary" className={classes.iconAdd}>
                  <label htmlFor="img1" style={{ display: 'flex' }}>
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
                <TextField variant="outlined" size="small" fullWidth value={currentTitle} />
              </div>

              <div className={classes.textField}>
                <Typography variant="body1" component="p">
                  Category
                </Typography>
                <FormControl variant="outlined" size="small" fullWidth>
                  <Select
                    native
                    defaultValue=""
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    value={currentcategoryId}>
                    <option aria-label="None" value="" />
                    {categories?.length > 0 &&
                      categories.map((cate, index) => (
                        <optgroup label={cate.cateName} key={index}>
                          {cate.subCategories?.length > 0 &&
                            cate.subCategories.map((subCate, index) => (
                              <option value={subCate.cateId} key={index}>
                                {subCate.CateName}
                              </option>
                            ))}
                        </optgroup>
                      ))}
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
                  value={currentPrice}
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
                  value={currentAmount}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="body1" component="p">
                  Add Description
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                  fullWidth
                  value={currentDescription}
                />
              </div>
              {/* {!submitIsValid && (
                <FormHelperText error style={{ marginBottom: 8 }}>
                  All textfield must not be null or empty
                </FormHelperText>
              )} */}
              {error.length > 0 && (
                <FormHelperText error style={{ marginBottom: 8 }}>
                  {error}
                </FormHelperText>
              )}

              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 16 }}
                  onClick={addNewProductHandler}>
                  UPDATE
                </Button>
                <Button variant="contained" onClick={onClose}>
                  Discard
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </div>
    </ProductModal>
  );
};

export default UpdateProduct;
