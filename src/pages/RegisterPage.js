import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  FormControl,
  Container,
  makeStyles,
  TextField,
  Typography,
  Grid,
  Box,
  FormHelperText,
} from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useInput } from '../hooks/use-input';
import * as Validate from '../helpers/validate';
import { Link } from 'react-router-dom';
import { mainColor } from '../utils';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../reducers/auth';
import ButtonWithLoading from '../components/UI/ButtonWithLoading/ButtonWithLoading';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    maxHeight: '-webkit-fill-available',
  },
  content: {
    padding: '20vh 0',
  },
  title: {
    marginBottom: 25,
    [theme.breakpoints.down('sm')]: {
      fontSize: 25,
      padding: '0 95px',
    },
  },
  phoneInput: {
    height: '255px ',
  },
  form: {
    width: '45rem',
    background: '#fff',
    maxWidth: '100%',
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,
    padding: '50px 25px',
    [theme.breakpoints.down('xs')]: {
      padding: '35px 15px',
    },
  },
  formControl: {
    display: 'block',
    marginBottom: 15,
    width: '100%',
  },
  button: {
    '&:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'all !important',
    },
  },
  forwardTo: {
    marginTop: 10,
    '& > a': {
      color: mainColor,
    },
  },
  inputInvalid: {
    borderColor: theme.palette.error.main + '!important',
    '& ~ div': {
      borderColor: theme.palette.error.main + '!important',
    },
  },
  formHelperText: {
    color: theme.palette.error.main,
  },
}));

const RegisterPage = () => {
  const { t } = useTranslation();
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const [error, setError] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberIsTouched, setPhoneNumberIsTouched] = useState(false);

  const phoneNumberIsValid =
    Validate.isNotEmpty(phoneNumber) && Validate.isPhoneNumber(phoneNumber);
  const phoneNumberHasError = !phoneNumberIsValid && phoneNumberIsTouched;

  const {
    enteredInput: email,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    inputIsValid: emailIsValid,
    inputReset: emailReset,
  } = useInput((value) => Validate.isNotEmpty(value) && Validate.isEmail(value));

  const {
    enteredInput: password,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    inputIsValid: passwordIsValid,
    inputReset: passwordReset,
  } = useInput(Validate.isNotEmpty);
  const {
    enteredInput: confirmPassword,
    hasError: confirmPasswordHasError,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputIsValid: confirmPasswordIsValid,
    inputReset: confirmPasswordReset,
  } = useInput((value) => Validate.isNotEmpty(value) && value === password);

  const {
    enteredInput: fullName,
    hasError: fullNameHasError,
    inputBlurHandler: fullNameBlurHandler,
    inputChangeHandler: fullNameChangeHandler,
    inputIsValid: fullNameIsValid,
    inputReset: fullNameReset,
  } = useInput((value) => Validate.isNotEmpty(value) && value?.length <= 100);

  const phoneNumberChangeHandler = (value) => {
    setPhoneNumber(value);
  };

  const phoneNumberBlurHandler = () => {
    setPhoneNumberIsTouched(true);
  };

  const phoneNumberReset = () => {
    setPhoneNumber('');
    setPhoneNumberIsTouched(false);
  };
  const formIsValid =
    emailIsValid &&
    phoneNumberIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    fullNameIsValid;
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    try {
      const result = await dispatch(
        register({
          fullName: fullName,
          username: email,
          password: password,
          email: email,
          phoneNumber: phoneNumber,
        })
      ).unwrap();
      const location = {
        pathname: '/account-activation',
        state: { id: result.accId },
      };
      history.push(location);
      emailReset();
      phoneNumberReset();
      passwordReset();
      confirmPasswordReset();
      fullNameReset();
    } catch (rejectedValueOrSerializedError) {
      setError(rejectedValueOrSerializedError);
    }
  };

  useEffect(() => {
    document.title = t('pagesTitle.register');
  }, [t]);

  return (
    <>
      <div className={classes.root}>
        <Header />
        <div className={classes.content}>
          <Container>
            <Box className={classes.form} boxShadow={3}>
              <Typography variant="h3" className={classes.title}>
                {t('registerpage.formTitle')}
              </Typography>
              <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
                <FormControl className={classes.formControl}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={emailHasError}
                        label={t('registerpage.email')}
                        type="email"
                        helperText={emailHasError && t('registerpage.emailInValid')}
                        required
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={email}
                        onBlur={emailBlurHandler}
                        onChange={emailChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <PhoneInput
                        inputStyle={{
                          height: '40px',
                          width: '100%',
                        }}
                        inputClass={phoneNumberHasError && classes.inputInvalid}
                        country={'vn'}
                        label="Phone Number"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={phoneNumberChangeHandler}
                        onBlur={phoneNumberBlurHandler}
                      />
                      {phoneNumberHasError && (
                        <FormHelperText variant="outlined" className={classes.formHelperText}>
                          {t('registerpage.phonenumberInValid')}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    error={fullNameHasError}
                    label={t('registerpage.fullName')}
                    helperText={fullNameHasError && t('registerpage.fullNameInValid')}
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={fullName}
                    onBlur={fullNameBlurHandler}
                    onChange={fullNameChangeHandler}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    label={t('registerpage.password')}
                    type="password"
                    error={passwordHasError}
                    helperText={passwordHasError && t('registerpage.passwordInValid')}
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={password}
                    onBlur={passwordBlurHandler}
                    onChange={passwordChangeHandler}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    label={t('registerpage.confirmPassword')}
                    type="password"
                    error={confirmPasswordHasError}
                    helperText={confirmPasswordHasError && t('registerpage.confirmPasswordInValid')}
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={confirmPassword}
                    onBlur={confirmPasswordBlurHandler}
                    onChange={confirmPasswordChangeHandler}
                  />
                </FormControl>
                {error?.length > 0 && (
                  <FormHelperText error style={{ marginBottom: 10 }}>
                    {error}
                  </FormHelperText>
                )}
                <ButtonWithLoading
                  isLoading={loading}
                  fullWidth
                  type="submit"
                  disabled={!formIsValid}>
                  {t('generalButtons.register')}
                </ButtonWithLoading>
                <Typography className={classes.forwardTo} variant="body2">
                  {t('registerpage.haveAccount')}{' '}
                  <Link to="/login">{t('registerpage.signIn')}</Link>
                </Typography>
              </form>
            </Box>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
