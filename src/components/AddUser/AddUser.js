import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  TextField,
  Typography,
  Grid,
  Box,
  FormHelperText,
  IconButton,
} from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useInput } from '../../hooks/use-input';
import * as Validate from '../../helpers/validate';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './AddUser.styles';
import SimpleModal from '../SimpleModal/SimpleModal';
import ButtonWithLoading from '../UI/ButtonWithLoading/ButtonWithLoading';
import { register } from '../../reducers/auth';
import { Close } from '@material-ui/icons';
import { toast } from 'react-toastify';

const AddUser = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
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

  const resetField = () => {
    emailReset();
    phoneNumberReset();
    passwordReset();
    confirmPasswordReset();
    fullNameReset();
  };
  const closeModalHandler = () => {
    resetField();
    onClose();
  };

  const addSuccessHandler = () => {
    resetField();
    onSuccess();
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
      await dispatch(
        register({
          fullName: fullName,
          username: email,
          password: password,
          email: email,
          phoneNumber: phoneNumber,
        })
      ).unwrap();
      toast.success(t('toastMessages.admin.user.addSuccess'));
      addSuccessHandler();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <SimpleModal isOpen={isOpen} onClose={closeModalHandler}>
      <Box className={classes.form} boxShadow={3}>
        <Box marginBottom={4} position="relative">
          <Typography variant="h5" className={classes.title}>
            {t('adminPage.user.addingModal.title')}
          </Typography>
          <Typography variant="caption" className={classes.subTitle}>
            {t('familyAdminPanel')}
          </Typography>
          <IconButton className={classes.iconClose} onClick={closeModalHandler}>
            <Close fontSize="large" />
          </IconButton>
        </Box>
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
                  inputProps={{
                    autoComplete: 'new-password',
                    form: {
                      autoComplete: 'off',
                    },
                  }}
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
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
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
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
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
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
            />
          </FormControl>

          <ButtonWithLoading isLoading={loading} fullWidth type="submit" disabled={!formIsValid}>
            {t('profilepage.buttonExecute')}
          </ButtonWithLoading>
        </form>
      </Box>
    </SimpleModal>
  );
};

export default AddUser;
