import ProductModal from './ProductModal';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { Add, Close, Delete } from '@material-ui/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory } from '../../../../reducers/category';
import { addNewProduct } from '../../../../reducers/product';
import { toast } from 'react-toastify';
import ButtonWithLoading from '../../../../components/UI/ButtonWithLoading/ButtonWithLoading';
import useStyles from './AddProduct.styles';

const AddProduct = ({ isOpen, onClose, getList }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  const modifyLoading = useSelector((state) => state.product.modifyLoading);
  const [images, setImages] = useState([]);
  const [mainImageSrc, setMainImageSrc] = useState(null);
  const [submitIsValid, setSubmitIsValid] = useState(true);
  const [error, setError] = useState('');
  const titleRef = useRef('');
  const categoryRef = useRef('');
  const priceRef = useRef(0);
  const amountRef = useRef(0);
  const [description, setDescription] = useState('');
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const fileChangeHandler = (file) => {
    if (file) {
      setImages((prevState) => [...prevState, file]);
    }
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImageSrc(reader.result);
    };
    reader.onerror = function (error) {
      setMainImageSrc(null);
    };
  };

  const removeFile = (item) => {
    setImages((prevState) => prevState.filter((image) => image !== item));
  };

  const getListCategoryHandler = useCallback(async () => {
    try {
      await dispatch(getListCategory()).unwrap();
    } catch (err) {
      console.log('🚀 ~ file: Product.js ~ line 166 ~ getListCategoryHandler ~ err', err);
    }
  }, [dispatch]);

  const closeModalHandler = () => {
    setImages([]);
    setError('');
    onClose();
  };
  const addNewProductHandler = async () => {
    setError('');

    const enteredTitle = titleRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const enteredPrice = priceRef.current.value;
    const enteredAmount = amountRef.current.value;

    let formData = new FormData();

    if (
      enteredTitle?.length > 0 &&
      enteredTitle.length < 60 &&
      enteredCategory?.length > 0 &&
      enteredPrice?.length > 0 &&
      enteredPrice > 0 &&
      enteredAmount?.length > 0 &&
      enteredAmount > 0
    ) {
      setSubmitIsValid(true);
    } else {
      setSubmitIsValid(false);
      return;
    }

    for (let i = 0; i < images.length; i++) {
      formData.append('image', images[i]);
    }

    formData.append('prodName', enteredTitle);
    formData.append('prodCategoryID', enteredCategory);
    formData.append('prodPrice', enteredPrice);
    formData.append('prodAmount', enteredAmount);
    formData.append('prodDescription', description);
    try {
      await dispatch(addNewProduct(formData)).unwrap();
      toast.success('Add new product success');
      closeModalHandler();
      getList();
      onClose();
    } catch (err) {
      setError(err);
      toast.error(error);
      console.log('🚀 ~ file: AddProduct.js ~ line 140 ~ addNewProductHandler ~ error', error);
    }
  };
  useEffect(() => {
    getListCategoryHandler();
  }, [dispatch, getListCategoryHandler]);

  useEffect(() => {
    if (images.length > 0) {
      getBase64(images[0]);
    } else {
      setMainImageSrc(null);
    }
  }, [images]);

  return (
    <ProductModal isOpen={isOpen} onClose={closeModalHandler}>
      <div className={classes.root}>
        <Box borderRadius={6} className={classes.content}>
          <Box marginBottom={4} marginTop={2} position="relative">
            <Typography variant="h5" className={classes.title}>
              ADD PRODUCTS
            </Typography>
            <Typography variant="caption" className={classes.subTitle}>
              Family Admin Panel
            </Typography>
            <IconButton className={classes.iconClose} onClick={closeModalHandler}>
              <Close fontSize="large" />
            </IconButton>
          </Box>
          <form encType="multipart/form-data" className={classes.section}>
            <Box marginBottom={2} className={classes.image}>
              <label htmlFor="img1" className={classes.mainImage}>
                <img
                  alt=""
                  src={mainImageSrc}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </label>
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
                      <Box display="flex" alignItems="center" key={index}>
                        <Typography variant="body2" style={{ wordBreak: 'break-word' }}>
                          {item.name}
                        </Typography>
                        <Delete onClick={() => removeFile(item)} />
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
                <TextField variant="outlined" size="small" fullWidth inputRef={titleRef} />
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
                    inputRef={categoryRef}>
                    <option aria-label="None" value="" />
                    {categories?.length > 0 &&
                      categories.map((cate, index) => (
                        <optgroup label={cate.cateName} key={index}>
                          {cate.subCategories?.length > 0 &&
                            cate.subCategories.map((subCate, index) => (
                              <option value={subCate.cateId} key={index}>
                                {subCate.cateName}
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
                  inputRef={priceRef}
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
                  inputRef={amountRef}
                />
              </div>
              <FormControl color="primary" fullWidth className={classes.textField}>
                <Typography variant="body1" component="p">
                  Add Description
                </Typography>
                <TextareaAutosize
                  variant="outlined"
                  className={classes.textarea}
                  value={description}
                  onChange={descriptionChangeHandler}
                  minRows={5}
                  color="primary"
                />
              </FormControl>
              {!submitIsValid && (
                <FormHelperText error style={{ marginBottom: 8 }}>
                  All text field must not be null or empty. <br /> Title must be less than 60
                  characters. <br />
                  Price, Amount must be greater 0.
                </FormHelperText>
              )}
              {error.length > 0 && (
                <FormHelperText error style={{ marginBottom: 8 }}>
                  {error}
                </FormHelperText>
              )}

              <Box display="flex" flexWrap="wrap" className={classes.actions}>
                <ButtonWithLoading
                  isLoading={modifyLoading}
                  onClick={addNewProductHandler}
                  parentClasses={classes.buttonSubmit}>
                  ADD
                </ButtonWithLoading>

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

export default AddProduct;
