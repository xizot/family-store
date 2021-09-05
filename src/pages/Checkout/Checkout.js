import Header from '../../components/Layout/Header';
import SideBar from '../../components/SideBar/SideBar';
import CategoryMenu from '../../components/CategoriesMenu/CategoriesMenu';
import useStyles from './Checkout.styles';
import Footer from '../../components/Layout/Footer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../reducers/ui';
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import { addDays, dateFormat, Validate } from '../../helpers';
import NewAddress from '../../components/NewAddress/NewAddress';
import SavedAddress from '../../components/SavedAddress/SavedAddress';
import { Link } from 'react-router-dom';
import ButtonWithLoading from '../../components/UI/ButtonWithLoading/ButtonWithLoading';
import { AiOutlineLeft } from 'react-icons/ai';
import { useInput } from '../../hooks/use-input';

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const {
    enteredInput: fullnameEntered,
    hasError: fullnameHasError,
    inputBlurHandler: fullnameBlurHandler,
    inputChangeHandler: fullnameChangeHandler,
    inputIsValid: fullnameIsValid,
    inputReset: fullnameReset,
  } = useInput(Validate.isNotEmpty);
  const {
    enteredInput: phoneNumberEntered,
    hasError: phoneNumberHasError,
    inputBlurHandler: phoneNumberBlurHandler,
    inputChangeHandler: phoneNumberChangeHandler,
    inputIsValid: phoneNumberIsValid,
    inputReset: phoneNumberReset,
  } = useInput(Validate.isNotEmpty);
  const {
    enteredInput: noteEntered,
    inputBlurHandler: noteBlurHandler,
    inputChangeHandler: noteChangeHandler,
    inputReset: noteReset,
  } = useInput(Validate.isNotEmpty);

  const tabChangeHandler = (e) => {
    console.log(e.target.value);
    setTabValue(+e.target.value);
  };

  useEffect(() => {
    dispatch(uiActions.hideModal());
  }, [dispatch]);
  useEffect(() => {
    document.title = 'Thanh toán';
  }, []);
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
                Quay lại trang chủ
              </Link>
              <div className={classes.section}>
                <Typography variant="subtitle1" className={classes.title}>
                  1. Địa chỉ nhận hàng
                </Typography>
                <div>
                  <Typography variant="body1" className={classes.subTitle}>
                    Thông tin người nhận hàng
                  </Typography>
                  <div className={classes.textField}>
                    <TextField
                      size="small"
                      label="Họ và tên"
                      variant="filled"
                      fullWidth
                      value={fullnameEntered}
                      error={fullnameHasError}
                      onChange={fullnameChangeHandler}
                      onBlur={fullnameBlurHandler}
                    />
                    {fullnameHasError && <FormHelperText error>Họ tên không hợp lệ</FormHelperText>}
                  </div>
                  <div className={classes.textField}>
                    <TextField
                      size="small"
                      label="Số điện thoại"
                      variant="filled"
                      fullWidth
                      type="number"
                      value={phoneNumberEntered}
                      error={phoneNumberHasError}
                      onChange={phoneNumberChangeHandler}
                      onBlur={phoneNumberBlurHandler}
                    />
                    {phoneNumberHasError && (
                      <FormHelperText error>Số điện thoại không hợp lệ</FormHelperText>
                    )}
                  </div>

                  <Typography
                    variant="body1"
                    className={classes.subTitle}
                    style={{ marginBottom: 8 }}>
                    Địa chỉ nhận hàng
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
                        label="Địa chỉ mới"
                      />
                      <FormControlLabel
                        value={1}
                        color="primary"
                        control={<Radio color="primary" />}
                        label="Địa chỉ đã lưu"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
                    <NewAddress />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1} className={classes.tabPanel}>
                    <SavedAddress />
                  </TabPanel>
                </div>
              </div>

              <div className={classes.section}>
                <Typography variant="subtitle1" className={classes.title}>
                  2. Thời gian nhận hàng dự kiến:{' '}
                  <Typography
                    className={classes.expectedDate}
                    component="span"
                    variant="subtitle1"
                    style={{ fontWeight: 'bold' }}>
                    {dateFormat(addDays(new Date(), 2).toISOString()).split(' ')[0]}
                  </Typography>
                </Typography>

                <TextField
                  label="Ghi chú thêm (Nếu có)"
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
                      Tiền hàng:
                    </Typography>
                    <Typography variant="subtitle1" component="span" style={{ fontWeight: 'bold' }}>
                      159.000VND
                    </Typography>
                  </Box>
                  <Box className={classes.billInfo}>
                    <Typography variant="subtitle1" className={classes.billInfoLabel}>
                      Phí giao hàng dự kiến:
                    </Typography>
                    <Typography variant="subtitle1" component="span">
                      30.000VND
                      <hr style={{ width: 100, marginLeft: 'auto' }} />
                    </Typography>
                  </Box>
                  <Box className={classes.billInfo}>
                    <Typography variant="subtitle1" className={classes.billInfoLabel}>
                      Tổng tiền:
                    </Typography>
                    <Typography variant="subtitle1" component="span" style={{ fontWeight: 'bold' }}>
                      159.000VND
                    </Typography>
                  </Box>
                </Box>
              </div>
              <ButtonWithLoading
                color="primary"
                variant="contained"
                isLoading={false}
                fullWidth={true}
                disabled={true}>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  XÁC NHẬN ĐƠN HÀNG
                </Typography>
                <Typography variant="body2" style={{ fontSize: 10 }}>
                  (Thanh toán khi nhận hàng)
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
