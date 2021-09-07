import { Button, IconButton, Typography } from '@material-ui/core';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import CustomArrowNext from '../components/CustomArrow/CustomArrowNext';
import CustomArrowPrev from '../components/CustomArrow/CustomArrowPrev';
import Header from '../components/Layout/Header';
import SideBar from '../components/SideBar/SideBar';
import NumericUpDown from '../components/UI/NumericUpDown';
import { moneyFormat } from '../helpers';
import Footer from '../components/Layout/Footer';
import { useTranslation } from 'react-i18next';
import CategoryMenu from '../components/CategoriesMenu/CategoriesMenu';
import { getProductDetail } from '../reducers/user-product.reducer';
import { getListCommentByProductID } from '../reducers/user-comment.reducer';
import useStyles from './ProductDetail.styles';
import ProductReview from '../components/ProductReview/ProductReview';
import SuggestionList from '../components/SuggestionList/SuggestionList';
import RequestLoading from '../components/RequestLoading/RequestLoading';
import { useCart } from '../hooks/use-cart';

const ProductDetail = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [toggleDescription, setToggleDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // const [selectedDistrict, setSelectedDistrict] = useState('QBT');
  const [productDetails, setProductDetails] = useState({});
  const [commentPage, setCommentPage] = useState(1);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.userProduct.loading);
  const classes = useStyles();
  const { addNew } = useCart();
  const settings1 = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <CustomArrowNext />,
      prevArrow: <CustomArrowPrev />,
    }),
    []
  );
  const settings2 = useMemo(
    () => ({
      dots: false,
      infinite: productDetails.prod_img?.length > 5,
      speed: 500,
      arrows: false,
      slidesToShow: 5,
    }),
    [productDetails]
  );

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const quantityAddHandler = () => {
    setQuantity((prevQuantity) => (prevQuantity < 50 ? prevQuantity + 1 : prevQuantity));
  };
  const quantityRemoveHandler = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  const descriptionToggleHandler = () => {
    setToggleDescription((prevState) => !prevState);
  };

  // const districtChangeHandler = (e) => {
  //   setSelectedDistrict(e.target.value);
  // };

  const commentPageChangeHandler = (e, value) => {
    setCommentPage(value);
  };

  const getListCommentHandler = useCallback(
    async ({ productId, page }) => {
      try {
        await dispatch(getListCommentByProductID({ productID: productId, page })).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCommentPage(1);
    const getProductDetailHandler = async (productId) => {
      try {
        const response = await dispatch(getProductDetail({ id: +productId })).unwrap();
        setProductDetails(response.listProductDetail);
      } catch (error) {
        console.log(error);
      }
    };

    if (productId) {
      getProductDetailHandler(productId);
    }
  }, [dispatch, productId, getListCommentHandler]);

  useEffect(() => {
    if (productId && isAuthenticated) {
      getListCommentHandler({ productId, page: commentPage });
    }
  }, [dispatch, productId, commentPage, getListCommentHandler, isAuthenticated]);

  return (
    <>
      <div className={classes.root}>
        <Header showMenu showCart />
        <SideBar>
          <CategoryMenu />
        </SideBar>
        <div className={classes.main}>
          <div className={classes.mainContent}>
            <div className={`${classes.section} ${classes.top}`}>
              <div className={classes.productImage}>
                <Slider
                  asNavFor={nav2}
                  ref={(slider1) => setNav1(slider1)}
                  {...settings1}
                  className={classes.thumbnail}>
                  {productDetails.prod_img &&
                    productDetails.prod_img.map((item, index) => (
                      <div key={index} className={classes.sliderImage}>
                        <img src={item} alt="" />
                      </div>
                    ))}
                </Slider>
                <Slider
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  {...settings2}
                  className={`${classes.slider} ${classes.sliderControl}`}>
                  {productDetails.prod_img &&
                    productDetails.prod_img.map((item, index) => (
                      <div key={index} className={classes.sliderImage}>
                        <img src={item} alt="" />
                      </div>
                    ))}
                </Slider>
              </div>
              {loading && <RequestLoading />}
              {!loading && (
                <div className={classes.productInfo}>
                  <Typography variant="h6" component="p">
                    {productDetails.prod_name}
                  </Typography>

                  <Typography variant="h6" component="p" className={classes.price}>
                    {productDetails.prod_price && moneyFormat(productDetails.prod_price)} VND
                  </Typography>
                  {/* <div className={classes.shipPredict}>
                    <div className={classes.shipPredictInfo}>
                      <Typography variant="body2" className={classes.shipPredictLabel}>
                        {t('productDetailPage.estimatedDeliveryFee')}
                      </Typography>

                      <Typography variant="body2">20.000 VND</Typography>
                    </div>
                    <div className={classes.shipPredictInfo}>
                      <Typography variant="body2" className={classes.shipPredictLabel}>
                        {t('productDetailPage.districtOrWard')}
                      </Typography>
                      <FormControl>
                        <Select
                          value={selectedDistrict}
                          onChange={districtChangeHandler}
                          className={classes.districtSelector}
                          MenuProps={{
                            classes: {
                              paper: classes.menuPaper,
                            },
                          }}>
                          {districts?.length > 0 &&
                            districts.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.title}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div> */}
                  <div className={classes.addToCart}>
                    <NumericUpDown
                      quantity={quantity}
                      onAdd={quantityAddHandler}
                      onRemove={quantityRemoveHandler}
                      height="36px"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.btnAddToCart}
                      onClick={() =>
                        addNew(
                          {
                            ...productDetails,
                            images: productDetails?.prod_img[0],
                          },
                          quantity
                        )
                      }>
                      {t('productDetailPage.addToCart')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className={classes.section}>
              <Typography variant="h5" component="h3" className={classes.title}>
                {t('productDetailPage.productDescription')}
              </Typography>
              {loading && <RequestLoading />}
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetails.prod_description,
                }}
                className={`${classes.descriptionText} ${
                  toggleDescription ? classes.isLess : classes.isLess
                }`}
              />

              <div className={classes.btnToggleDescription}>
                <IconButton onClick={descriptionToggleHandler} size="small">
                  <img
                    style={{ height: '24px' }}
                    src={`${process.env.PUBLIC_URL}/img/arrow-jump-left.png`}
                    alt="Prev icon"
                    className={`${toggleDescription ? classes.imgShowMore : classes.imgShowLess}`}
                  />
                </IconButton>
                <Typography variant="caption">
                  {toggleDescription
                    ? t('productDetailPage.showMore')
                    : t('productDetailPage.showLess')}
                </Typography>
              </div>
            </div>

            <div className={classes.section}>
              {isAuthenticated && (
                <>
                  <Typography variant="h5" component="h3" className={classes.title}>
                    {t('productDetailPage.productReview')}
                  </Typography>
                  <ProductReview page={commentPage} onPageChange={commentPageChangeHandler} />
                </>
              )}
              {!isAuthenticated && (
                <p className={classes.loginToSee}>
                  Please{' '}
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: props.location },
                    }}>
                    Login
                  </Link>{' '}
                  to see review
                </p>
              )}
            </div>

            <div className={classes.section}>
              <Typography variant="h5" component="h3" className={classes.title}>
                {t('productDetailPage.suggestions')}
              </Typography>
              <SuggestionList catID={productDetails.prod_category_id} />
            </div>
          </div>
        </div>
      </div>
      <Footer hasSideBar />
    </>
  );
};
export default ProductDetail;
