import React, { useCallback, useEffect, useState } from 'react';
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
import useStyles from './UpdateUser.styles';
import SimpleModal from '../SimpleModal/SimpleModal';
import ButtonWithLoading from '../UI/ButtonWithLoading/ButtonWithLoading';
import { Close } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { getBaseImage } from '../../helpers/getBaseImage';
import RequestLoading from '../RequestLoading/RequestLoading';
import { details } from '../../reducers/account.reducer';
import { updateAccount } from '../../reducers/admin-account.reducer';

const UpdateUser = ({ accId, isOpen, onClose, opUpdateSuccess, isAdmin = true }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const loading = useSelector((state) => state.auth.loading);
  const accountLoading = useSelector((state) => state.account.loading);
  const [phoneNumber, setPhoneNumber] = useState(userDetails?.accPhoneNumber || '');
  const [phoneNumberIsTouched, setPhoneNumberIsTouched] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const phoneNumberIsValid =
    Validate.isNotEmpty(phoneNumber) && Validate.isPhoneNumber(phoneNumber);
  const phoneNumberHasError = !phoneNumberIsValid && phoneNumberIsTouched;
  const [isChangePassword, setIsChangePassword] = useState(false);

  const {
    enteredInput: email,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    inputIsValid: emailIsValid,
    inputReset: emailReset,
    setEnteredInput: setEmail,
  } = useInput(
    (value) => Validate.isNotEmpty(value) && Validate.isEmail(value),
    userDetails?.accEmail || ''
  );

  const {
    enteredInput: password,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    // inputIsValid: passwordIsValid,
    inputReset: passwordReset,
  } = useInput(Validate.isNotEmpty);
  const {
    enteredInput: confirmPassword,
    hasError: confirmPasswordHasError,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputChangeHandler: confirmPasswordChangeHandler,
    // inputIsValid: confirmPasswordIsValid,
    inputReset: confirmPasswordReset,
  } = useInput((value) => Validate.isNotEmpty(value) && value === password);

  const {
    enteredInput: fullName,
    hasError: fullNameHasError,
    inputBlurHandler: fullNameBlurHandler,
    inputChangeHandler: fullNameChangeHandler,
    inputIsValid: fullNameIsValid,
    inputReset: fullNameReset,
    setEnteredInput: setFullName,
  } = useInput(
    (value) => Validate.isNotEmpty(value) && value?.length <= 100,
    userDetails?.accFullName || ''
  );

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
    setIsChangePassword(false);
    setSelectedFile(null);
  };
  const closeModalHandler = () => {
    resetField();
    onClose();
  };

  const fileChangeHandler = (file) => {
    setSelectedFile(file || null);
  };

  const removeFileChangeHandler = () => {
    setSelectedFile(null);
  };

  const formIsValid = emailIsValid && !phoneNumberHasError && fullNameIsValid;

  const getUserDetailsHandler = useCallback(
    async (accId) => {
      try {
        const response = await dispatch(details({ accId })).unwrap();
        setUserDetails(response.account);
      } catch (error) {
        console.log('🚀 ~ file: UpdateUser.js ~ line 153 ~ getUserDetailsHandler ~ error', error);
      }
    },
    [dispatch]
  );

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    let data = {
      accId: +accId,
      accEmail: email,
      accPhoneNumber: phoneNumber,
      accFullName: fullName,
    };
    try {
      await dispatch(updateAccount(data)).unwrap();
      toast.success(t('toastMessages.admin.user.updateSuccess'));
      opUpdateSuccess();
      onclose();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const handleBaseImage = async (file) => {
      try {
        const result = await getBaseImage(file);
        setNewAvatar(result || null);
      } catch (error) {
        setNewAvatar(null);
      }
    };
    if (selectedFile) {
      handleBaseImage(selectedFile);
    } else {
      setNewAvatar(null);
    }
  }, [selectedFile, newAvatar]);

  useEffect(() => {
    if (accId) {
      getUserDetailsHandler(accId);
    }
  }, [accId, getUserDetailsHandler]);

  useEffect(() => {
    if (userDetails) {
      setEmail(userDetails.accEmail);
      setFullName(userDetails.accFullName);
      setPhoneNumber(userDetails.phoneNumber);
    }
  }, [userDetails, setEmail, setFullName]);

  return (
    <SimpleModal isOpen={isOpen} onClose={closeModalHandler}>
      <Box className={classes.form} boxShadow={3}>
        <Box marginBottom={4} position="relative">
          <Typography variant="h5" className={classes.title}>
            {t('updateUser')}
          </Typography>
          <Typography variant="caption" className={classes.subTitle}>
            {t('familyAdminPanel')}
          </Typography>
          <IconButton className={classes.iconClose} onClick={closeModalHandler}>
            <Close fontSize="large" />
          </IconButton>
        </Box>
        {accountLoading && <RequestLoading />}
        {!accountLoading && (
          <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                {isAdmin ? (
                  <Box className={classes.handleAvatar}>
                    <div className={classes.labelAvatar}>
                      <img
                        src={
                          newAvatar
                            ? newAvatar
                            : userDetails?.accAvatar
                            ? userDetails?.accAvatar
                            : process.env.PUBLIC_URL + '/img/default-avatar.png'
                        }
                        alt="user avatar"
                        className={classes.avatar}
                      />
                    </div>
                  </Box>
                ) : (
                  <Box className={classes.handleAvatar}>
                    <input
                      accept="image/jpeg"
                      id="avatar"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => fileChangeHandler(e.target.files[0])}
                    />
                    <div className={classes.labelAvatar}>
                      <img
                        src={
                          newAvatar
                            ? newAvatar
                            : userDetails?.accAvatar
                            ? userDetails?.accAvatar
                            : process.env.PUBLIC_URL + '/img/default-avatar.png'
                        }
                        alt="user avatar"
                        className={classes.avatar}
                      />
                      <div className={`${classes.avatarHover} ${newAvatar ? 'is-show' : ''}`}>
                        {!newAvatar && (
                          <Typography variant="caption" component="label" htmlFor="avatar">
                            {t('profilepage.selectNewAvatar')}
                          </Typography>
                        )}
                        {newAvatar && (
                          <Typography
                            variant="caption"
                            component="label"
                            onClick={removeFileChangeHandler}
                            className={classes.labelDelete}>
                            {t('profilepage.removeChange')}
                          </Typography>
                        )}
                      </div>
                    </div>
                    <ButtonWithLoading
                      parentClasses={classes.btnUpdateImage}
                      isLoading={loading}
                      isUpperCase={false}
                      fullWidth={false}
                      type="submit"
                      disabled={!newAvatar}>
                      {t('profilepage.updateProfilePicture')}
                    </ButtonWithLoading>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={8}>
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
                </FormControl>
                <FormControl className={classes.formControl}>
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
                </FormControl>
                {!isAdmin && (
                  <>
                    <Typography
                      color="primary"
                      variant="subtitle1"
                      style={{
                        marginLeft: 'auto',
                        width: 'fit-content',
                        whiteSpace: 'nowrap',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        marginBottom: 10,
                      }}
                      onClick={() => setIsChangePassword((prev) => !prev)}>
                      {isChangePassword ? t('profilepage.cancel') : t('profilepage.changePassword')}
                    </Typography>
                    {isChangePassword && (
                      <>
                        <FormControl className={classes.formControl}>
                          <TextField
                            label={t('profilepage.currentPassword')}
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
                            label={t('profilepage.newPassword')}
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
                            label={t('profilepage.confirmNewPassword')}
                            type="password"
                            error={confirmPasswordHasError}
                            helperText={
                              confirmPasswordHasError && t('registerpage.confirmPasswordInValid')
                            }
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
                      </>
                    )}
                  </>
                )}

                <ButtonWithLoading
                  isLoading={loading}
                  fullWidth
                  type="submit"
                  disabled={!formIsValid}>
                  {t('profilepage.buttonExecute')}
                </ButtonWithLoading>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </SimpleModal>
  );
};

export default UpdateUser;
