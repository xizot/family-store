import Header from '../../components/Layout/Header';
import SideBar from '../../components/SideBar/SideBar';
import CategoryMenu from '../../components/CategoriesMenu/CategoriesMenu';
import useStyles from './Checkout.styles';
import Footer from '../../components/Layout/Footer';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../reducers/ui';
import {
  Typography,
  TextField,
  Box,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import { addDays, dateFormat, moneyFormat, Validate } from '../../helpers';
import NewAddress from '../../components/NewAddress/NewAddress';
import SavedAddress from '../../components/SavedAddress/SavedAddress';
import { Link, useHistory } from 'react-router-dom';
import ButtonWithLoading from '../../components/UI/ButtonWithLoading/ButtonWithLoading';
import { AiOutlineLeft } from 'react-icons/ai';
import { useInput } from '../../hooks/use-input';
import {
  addressActions,
  getListCity,
  getListDistrict,
  getListWard,
} from '../../reducers/address.reducer';
import { addBill } from '../../reducers/checkout.reducer';
import { toast } from 'react-toastify';
import { userAddDelivery } from '../../reducers/delivery.reducer';
import { cartActions } from '../../reducers/cart';
import { useTranslation } from 'react-i18next';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const Checkout = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [isSaveAddress, setIsSaveAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState({
    city: null,
    district: null,
    ward: null,
    street: '',
  });

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cart = useSelector((state) => state.cart.data);
  const user = useSelector((state) => state.auth.user);
  const shippingFee = selectedAddress?.ward?.ward_ship_price || 0;
  const checkoutLoading = useSelector((state) => state.checkout.loading);
  const history = useHistory();
  const selectectedAddressChangeHandler = (value) => {
    setSelectedAddress(value);
  };
  const {
    enteredInput: fullnameEntered,
    hasError: fullnameHasError,
    inputBlurHandler: fullnameBlurHandler,
    inputChangeHandler: fullnameChangeHandler,
    inputIsValid: fullnameIsValid,
    // inputReset: fullnameReset,
  } = useInput(Validate.isNotEmpty);

  const {
    enteredInput: phoneNumberEntered,
    hasError: phoneNumberHasError,
    inputBlurHandler: phoneNumberBlurHandler,
    inputChangeHandler: phoneNumberChangeHandler,
    inputIsValid: phoneNumberIsValid,
    // inputReset: phoneNumberReset,
  } = useInput((value) => Validate.isNotEmpty(value) && Validate.isPhoneNumber(value));
  const {
    enteredInput: noteEntered,
    inputBlurHandler: noteBlurHandler,
    inputChangeHandler: noteChangeHandler,
    // inputReset: noteReset,
  } = useInput(Validate.isNotEmpty);

  const tabChangeHandler = (e) => {
    setTabValue(+e.target.value);
    resetAddressHandler();
  };

  const saveAddressChangeHandler = (event) => {
    setIsSaveAddress(event.target.checked);
  };
  const getListCityHandler = useCallback(async () => {
    try {
      await dispatch(getListCity()).unwrap();
    } catch (error) {
      console.log('🚀 ~ file: NewAddress.js ~ line 25 ~ getListCityHandler ~ error', error);
    }
  }, [dispatch]);

  const getListDistrictHandler = useCallback(
    async (cityId) => {
      try {
        await dispatch(getListDistrict({ cityId })).unwrap();
      } catch (error) {
        console.log('🚀 ~ file: NewAddress.js ~ line 34 ~ error', error);
      }
    },
    [dispatch]
  );
  const getListWardHandler = useCallback(
    async (cityId, districtId) => {
      try {
        await dispatch(getListWard({ cityId, districtId })).unwrap();
      } catch (error) {
        console.log('🚀 ~ file: getListWardHandler.js ~ line 45 ~ error', error);
      }
    },
    [dispatch]
  );

  const cityChangeHandler = (e, newValue) => {
    if (!newValue) {
      setSelectedAddress((prev) => ({
        ...prev,
        city: null,
        district: null,
        ward: null,
      }));
      dispatch(addressActions.reset());
    } else {
      getListDistrictHandler(newValue.ci_id);
      setSelectedAddress((prev) => ({ ...prev, city: newValue }));
    }
  };
  const cityChangeHandlerV2 = (newValue) => {
    setSelectedAddress((prev) => ({
      ...prev,
      city: newValue,
      district: null,
      ward: null,
    }));
  };

  const districtChangeHandlerV2 = (newValue) => {
    setSelectedAddress((prev) => ({ ...prev, district: newValue }));
  };
  const districtChangeHandler = (e, newValue) => {
    setSelectedAddress((prev) => ({
      ...prev,
      district: null,
      ward: null,
    }));
    if (!newValue) {
      dispatch(addressActions.removeWards());
    } else {
      setSelectedAddress((prev) => ({ ...prev, district: newValue }));
      getListWardHandler(selectedAddress.city.ci_id || 1, newValue.dis_id);
    }
  };
  const wardChangeHandlerV2 = (newValue) => {
    setSelectedAddress((prev) => ({ ...prev, ward: newValue }));
  };

  const wardChangeHandler = (e, newValue) => {
    setSelectedAddress((prev) => ({ ...prev, ward: newValue }));
  };

  const streetChangeHandler = (e) => {
    setSelectedAddress((prev) => ({ ...prev, street: e.target.value }));
  };
  const streetChangeHandlerV2 = (value) => {
    setSelectedAddress((prev) => ({ ...prev, street: value }));
  };
  const resetAddressHandler = useCallback(() => {
    setSelectedAddress((prev) => ({
      city: null,
      district: null,
      ward: null,
      street: '',
    }));
  }, []);
  const billIsValid =
    selectedAddress.city != null &&
    selectedAddress.district != null &&
    selectedAddress.ward != null &&
    selectedAddress.street.length > 0 &&
    fullnameIsValid &&
    phoneNumberIsValid;
  const addBillHandler = async () => {
    if (!billIsValid) {
      return;
    }
    const accAddress = `${selectedAddress.street},${selectedAddress.ward.ward_name},${selectedAddress.district.dis_name},${selectedAddress.city.ci_name}`;

    if (isSaveAddress && tabValue === 0) {
      dispatch(
        userAddDelivery({
          accId: user.accId,
          cityId: selectedAddress.city.ci_id,
          distId: selectedAddress.district.dis_id,
          wardId: selectedAddress.ward.ward_id,
          delDetailAddress: selectedAddress.street,
        })
      );
    }

    try {
      await dispatch(
        addBill({
          receiverName: fullnameEntered,
          receiverPhone: phoneNumberEntered,
          receiverNote: noteEntered,
          accAddress: accAddress,
          priceShip: shippingFee,
          listProduct: cart.map((item) => ({ prodId: item.prodId, prodQuantity: item.cartAmount })),
        })
      ).unwrap();

      dispatch(cartActions.reset());
      localStorage.setItem('checkout', '1');
      history.push('/checkout-success');
    } catch (error) {
      toast.error(error);
      console.log('🚀 ~ file: Checkout.js ~ line 160 ~ addBillHandler ~ error', error);
    }
  };
  useEffect(() => {
    getListCityHandler();
  }, [getListCityHandler]);

  useEffect(() => {
    const flag = localStorage.getItem('checkout');
    if (cart?.length <= 0 && !flag) history.push('/');
  }, [cart, history]);

  useEffect(() => {
    document.title = t('pagesTitle.checkout');
    dispatch(uiActions.hideModal());
  }, [t, dispatch]);

  return (
    <>
      <div className={classes.root}>
        <Header showCart showMenu />
        <SideBar>
          <CategoryMenu />
        </SideBar>
        <div className={classes.main}>
          <div className={classes.mainContent}>
            <div className={classes.checkoutPage}>
              <Link to="/" className={classes.back}>
                <AiOutlineLeft />
                {t('generalButtons.back')}
              </Link>
              <div className={classes.section}>
                <Typography variant="subtitle1" className={classes.title}>
                  {t('checkoutPage.address.title')}
                </Typography>
                <div>
                  <Typography variant="body1" className={classes.subTitle}>
                    {t('checkoutPage.address.form.titleTop')}
                  </Typography>
                  <div className={classes.textField}>
                    <TextField
                      size="small"
                      label={t('checkoutPage.address.form.namePlaceHolder')}
                      variant="filled"
                      type="text"
                      fullWidth
                      value={fullnameEntered}
                      error={fullnameHasError}
                      onChange={fullnameChangeHandler}
                      onBlur={fullnameBlurHandler}
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                    />
                    {fullnameHasError && <FormHelperText error>Họ tên không hợp lệ</FormHelperText>}
                  </div>
                  <div className={classes.textField}>
                    <TextField
                      size="small"
                      label={t('checkoutPage.address.form.phoneNumberPlaceHolder')}
                      variant="filled"
                      fullWidth
                      type="text"
                      value={phoneNumberEntered}
                      error={phoneNumberHasError}
                      onChange={phoneNumberChangeHandler}
                      onBlur={phoneNumberBlurHandler}
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                    />
                    {phoneNumberHasError && (
                      <FormHelperText error>Số điện thoại không hợp lệ</FormHelperText>
                    )}
                  </div>

                  <Typography
                    variant="body1"
                    className={classes.subTitle}
                    style={{ marginBottom: 8 }}>
                    {t('checkoutPage.address.form.titleMid')}
                  </Typography>

                  <FormControl component="fieldset" color="primary">
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={tabValue}
                      onChange={tabChangeHandler}
                      className={classes.addressOption}>
                      <FormControlLabel
                        value={0}
                        control={<Radio color="primary" />}
                        label={t('generalButtons.newAddress')}
                      />
                      <FormControlLabel
                        value={1}
                        color="primary"
                        control={<Radio color="primary" />}
                        label={t('generalButtons.savedAddress')}
                      />
                    </RadioGroup>
                  </FormControl>
                  <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
                    <NewAddress
                      selectedAddress={selectedAddress}
                      isSaveNewAddress={isSaveAddress}
                      onCityChange={cityChangeHandler}
                      onDistrictChange={districtChangeHandler}
                      onWardChange={wardChangeHandler}
                      onStreetChange={streetChangeHandler}
                      onChangeAddress={selectectedAddressChangeHandler}
                      onSaveAddressChange={saveAddressChangeHandler}
                      onResetAddress={resetAddressHandler}
                    />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1} className={classes.tabPanel}>
                    <SavedAddress
                      selectedAddress={selectedAddress}
                      isSaveNewAddress={isSaveAddress}
                      onCityChange={cityChangeHandler}
                      onDistrictChange={districtChangeHandler}
                      onWardChange={wardChangeHandler}
                      onStreetChange={streetChangeHandler}
                      onChangeAddress={selectectedAddressChangeHandler}
                      onSaveAddressChange={saveAddressChangeHandler}
                      onDistrictChangeV2={districtChangeHandlerV2}
                      onCityChangeV2={cityChangeHandlerV2}
                      onWardChangeV2={wardChangeHandlerV2}
                      onStreetChangeV2={streetChangeHandlerV2}
                      onResetAddress={resetAddressHandler}
                    />
                  </TabPanel>
                </div>
              </div>

              <div className={classes.section}>
                <Typography variant="subtitle1" className={classes.title}>
                  {t('checkoutPage.others.title')}
                  <Typography
                    className={classes.expectedDate}
                    component="span"
                    variant="subtitle1"
                    style={{ fontWeight: 'bold' }}>
                    {dateFormat(addDays(new Date(), 2).toISOString()).split(' ')[0]}
                  </Typography>
                </Typography>

                <TextField
                  label={t('checkoutPage.others.form.note')}
                  variant="filled"
                  fullWidth
                  multiline
                  rows={4}
                  value={noteEntered}
                  onChange={noteChangeHandler}
                  onBlur={noteBlurHandler}
                />
                <Box marginTop={5} marginBottom={1}>
                  <Box className={classes.billInfo}>
                    <Typography variant="subtitle1" className={classes.billInfoLabel}>
                      {t('checkoutPage.others.form.price')}
                    </Typography>
                    <Typography variant="subtitle1" component="span" style={{ fontWeight: 'bold' }}>
                      {moneyFormat(totalAmount)}VND
                    </Typography>
                  </Box>
                  <Box className={classes.billInfo}>
                    <Typography variant="subtitle1" className={classes.billInfoLabel}>
                      {t('checkoutPage.others.form.deliveryPrice')}
                    </Typography>
                    <Typography variant="subtitle1" component="span">
                      {moneyFormat(shippingFee)}VND
                      <hr style={{ width: 100, marginLeft: 'auto' }} />
                    </Typography>
                  </Box>
                  <Box className={classes.billInfo}>
                    <Typography variant="subtitle1" className={classes.billInfoLabel}>
                      {t('checkoutPage.others.form.totalPayment')}
                    </Typography>
                    <Typography variant="subtitle1" component="span" style={{ fontWeight: 'bold' }}>
                      {moneyFormat(Number(totalAmount) + Number(shippingFee))}VND
                    </Typography>
                  </Box>
                </Box>
              </div>
              <ButtonWithLoading
                color="primary"
                variant="contained"
                isLoading={checkoutLoading}
                fullWidth={true}
                disabled={!billIsValid}
                onClick={addBillHandler}>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  {t('generalButtons.confirm')}
                </Typography>
                <Typography variant="body2" style={{ fontSize: 10 }}>
                  {t('checkoutPage.others.form.deliveryMethod')}
                </Typography>
              </ButtonWithLoading>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Checkout;
