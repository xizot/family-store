import ProductModal from './ProductModal';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  makeStyles,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory } from '../../../../reducers/category';
import { useInput } from '../../../../hooks/use-input';
import { Validate } from '../../../../helpers';
import { updateProductImage, updateProductInformation } from '../../../../reducers/product';
import { toast } from 'react-toastify';
import { getBaseImage } from '../../../../helpers/getBaseImage';
import ButtonWithLoading from '../../../../components/UI/ButtonWithLoading/ButtonWithLoading';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10vh',
    marginBottom: '10vh',
  },
  content: {
    background: '#fff',
    padding: theme.spacing(2, 5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 2),
    },
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
    marginRight: theme.spacing(1),
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
  textarea: {
    outline: 'none',
    resize: 'vertical',
    padding: '10.5px 14px',
    border: '1px solid #c4c4c4',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),

    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  buttonSubmit: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      width: '100%',
      marginBottom: theme.spacing(1),
    },
  },
  buttonDiscard: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  marginRight: 16,
}));

const UpdateProduct = ({ itemInfo, isOpen, onClose, getList }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  const [error, setError] = useState('');
  const modifyLoading = useSelector((state) => state.product.modifyLoading);
  const [updateImageLoading, setUpdateImageLoading] = useState(false);

  const {
    enteredInput: title,
    inputChangeHandler: titleChangeHandler,
    inputReset: titleReset,
  } = useInput(Validate.isNotEmpty, itemInfo?.prod_name || '');

  const {
    enteredInput: price,
    inputChangeHandler: priceChangeHandler,
    inputReset: priceReset,
  } = useInput(Validate.isNotEmpty, itemInfo?.prod_price || '');
  const {
    enteredInput: amount,
    inputChangeHandler: amountChangeHandler,
    inputReset: amountReset,
  } = useInput(Validate.isNotEmpty, itemInfo?.prod_amount || '');
  const {
    enteredInput: description,
    inputChangeHandler: descriptionChangeHandler,
    inputReset: descriptionReset,
  } = useInput(Validate.isNotEmpty, itemInfo?.prod_description || '');

  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState(itemInfo?.images || []);
  const [listRemoveImage, setListRemoveImage] = useState([]);
  const [listNewImage, setListNewImage] = useState([]);
  const [listNewRender, setListNewRender] = useState([]);

  const fileChangeHandler = (file) => {
    if (file) {
      setListNewImage((prevState) => [...prevState, file]);
    }
  };

  const removeOldImage = (item) => {
    setImages((prevState) => prevState.filter((image) => image !== item));
    setListRemoveImage((prevState) => [...prevState, item]);
  };

  const removeNewImage = (item) => {
    setListNewImage((prevState) => prevState.filter((file) => file !== item));
  };

  const getListCategoryHandler = useCallback(async () => {
    try {
      await dispatch(getListCategory()).unwrap();
    } catch (err) {}
  }, [dispatch]);

  const closeModalHandler = () => {
    setError('');
    onClose();
    setImages([]);
    setListRemoveImage([]);
    setListNewRender([]);
    setListNewImage([]);
    descriptionReset();
    titleReset();
    priceReset();
    amountReset();
  };

  const updateImageHandler = async () => {
    setUpdateImageLoading(true);
    let formData = new FormData();
    for (let i = 0; i < listNewImage.length; i++) {
      formData.append('image', listNewImage[i]);
    }
    formData.append('imageName', listRemoveImage.join(','));
    try {
      await dispatch(
        updateProductImage({
          id: itemInfo.prod_id,
          data: formData,
        })
      ).unwrap();
      toast.success(`Update images for product id ${itemInfo.prod_id} sucessfully`);
      getList();
      closeModalHandler();
      setUpdateImageLoading(false);
    } catch (error) {
      toast.error(error);
      setUpdateImageLoading(false);
    }
  };

  const updateInformation = async () => {
    try {
      await dispatch(
        updateProductInformation({
          id: itemInfo.prod_id,
          data: {
            prodName: title,
            prodCategoryID: +categoryId,
            prodPrice: +price,
            prodAmount: +amount,
            prodDescription: description,
          },
        })
      ).unwrap();
      toast.success(`Update product id ${itemInfo.prod_id} sucessfully`);
      getList();
      closeModalHandler();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getListCategoryHandler();
  }, [dispatch, getListCategoryHandler]);

  useEffect(() => {
    setListNewRender([]);
    if (listNewImage?.length > 0) {
      listNewImage.forEach(async (item) => {
        const newImage = await getBaseImage(item);
        if (newImage) {
          setListNewRender((prevState) => [...prevState, { file: item, image: newImage }]);
        }
      });
    }
  }, [listNewImage]);

  useEffect(() => {
    if (itemInfo) {
      setImages(itemInfo.images);
      setCategoryId(itemInfo.prod_category_id);
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
                  src={
                    (images?.length > 0 && images[0]) ||
                    (listNewRender?.length > 0 && listNewRender[0].image) ||
                    null
                  }
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
                        marginRight={1}
                        marginBottom={1}
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
                          onClick={() => removeOldImage(item)}
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
                  {listNewRender?.length > 0 &&
                    listNewRender.map((item, index) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        key={index}
                        marginRight={1}
                        marginBottom={1}
                        className={classes.miniImage}>
                        <img
                          src={item?.image}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <IconButton
                          color="primary"
                          onClick={() => removeNewImage(item?.file)}
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

                <Box display="flex" alignItems="center">
                  <IconButton color="primary" className={classes.iconAdd}>
                    <label htmlFor="img1" style={{ display: 'flex' }}>
                      <Add />
                    </label>
                  </IconButton>
                  <ButtonWithLoading
                    isLoading={updateImageLoading}
                    onClick={updateImageHandler}
                    parentClasses={classes.buttonUpdateImage}>
                    UPDATE IMAGES
                  </ButtonWithLoading>
                </Box>
              </div>
            </Box>
            <Box className={classes.productInformation}>
              <div className={classes.textField}>
                <Typography variant="body1" component="p">
                  Title
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={title}
                  onChange={titleChangeHandler}
                />
              </div>

              <div className={classes.textField}>
                <Typography variant="body1" component="p">
                  Category
                </Typography>
                <FormControl variant="outlined" size="small" fullWidth>
                  <Select
                    native
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}>
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
                  value={price}
                  onChange={priceChangeHandler}
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
                  value={amount}
                  onChange={amountChangeHandler}
                />
              </div>
              <FormControl fullWidth className={classes.textField}>
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

              <Box display="flex" flexWrap="wrap">
                <ButtonWithLoading
                  isLoading={modifyLoading}
                  onClick={updateInformation}
                  parentClasses={classes.buttonSubmit}>
                  UPDATE INFORMATION
                </ButtonWithLoading>

                <Button
                  variant="contained"
                  className={classes.buttonDiscard}
                  onClick={closeModalHandler}>
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
