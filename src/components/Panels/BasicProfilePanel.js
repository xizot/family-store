import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, TextField, Typography, Grid, Box, FormHelperText } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useInput } from '../../hooks/use-input';
import * as Validate from '../../helpers/validate';
import { useDispatch, useSelector } from 'react-redux';
import ButtonWithLoading from '../UI/ButtonWithLoading/ButtonWithLoading';
import { toast } from 'react-toastify';
import { getBaseImage } from '../../helpers/getBaseImage';
import useStyles from './BasicProfilePanel.styles';
import { insertOrUpdateAvatar } from '../../reducers/account.reducer';
import { updateAccount } from '../../reducers/admin-account.reducer';

const BasicProfilePanel = ({
  accId,
  pFullName,
  pEmail,
  pPhoneNumber,
  pAvatar,
  onUpdateNewData,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const modifyLoading = useSelector((state) => state.account.modifyLoading);
  const basicLoading = useSelector((state) => state.adminAccount.modify);
  const [phoneNumber, setPhoneNumber] = useState(pPhoneNumber || '');
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
  } = useInput((value) => Validate.isNotEmpty(value) && Validate.isEmail(value), pEmail || '');
  const {
    enteredInput: password,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    inputIsValid: passwordIsValid,
    inputReset: passwordReset,
  } = useInput(Validate.isNotEmpty);
  const {
    enteredInput: newPassword,
    hasError: newPasswordHasError,
    inputBlurHandler: newPasswordBlurHandler,
    inputChangeHandler: newPasswordChangeHandler,
    inputIsValid: newPasswordIsValid,
    inputReset: newPasswordReset,
  } = useInput(Validate.isNotEmpty);
  const {
    enteredInput: confirmPassword,
    hasError: confirmPasswordHasError,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputIsValid: confirmPasswordIsValid,
    inputReset: confirmPasswordReset,
  } = useInput((value) => Validate.isNotEmpty(value) && value === newPassword);

  const {
    enteredInput: fullName,
    hasError: fullNameHasError,
    inputBlurHandler: fullNameBlurHandler,
    inputChangeHandler: fullNameChangeHandler,
    inputIsValid: fullNameIsValid,
  } = useInput((value) => Validate.isNotEmpty(value), pFullName || '');

  const phoneNumberChangeHandler = (value) => {
    setPhoneNumber(value);
  };

  const phoneNumberBlurHandler = () => {
    setPhoneNumberIsTouched(true);
  };

  const fileChangeHandler = (file) => {
    setSelectedFile(file || null);
  };

  const removeFileChangeHandler = () => {
    setSelectedFile(null);
  };

  const insertOrUpdateAvatarHandler = async () => {
    console.log('here', selectedFile);
    let formData = new FormData();
    if (selectedFile === null) return;
    formData.append('accId', accId);
    formData.append('image', selectedFile);
    try {
      await dispatch(insertOrUpdateAvatar(formData)).unwrap();
      onUpdateNewData({ accAvatar: selectedFile });
      setSelectedFile(null);
      setNewAvatar(null);
    } catch (error) {
      toast.error(error);
    }
  };

  const formIsValid = emailIsValid && !phoneNumberHasError && fullNameIsValid;

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    let data = {
      accId: +accId,
      accEmail: email,
      accPhoneNumber: phoneNumber,
      accFullName: fullName,
    };

    if (isChangePassword) {
      if (!passwordIsValid || !newPasswordIsValid || !confirmPasswordIsValid) {
        return;
      } else {
        data = {
          ...data,
          accOldPassword: password,
          accNewPassword: newPassword,
          accConfirmPassword: confirmPassword,
        };
      }
    }

    try {
      await dispatch(updateAccount(data)).unwrap();
      onUpdateNewData(data);
      passwordReset();
      newPasswordReset();
      confirmPasswordReset();
      toast.success(t('toastMessages.admin.user.updateSuccess'));
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
    setPhoneNumber(pPhoneNumber);
  }, [pPhoneNumber]);
  return (
    <>
      <Box className={classes.form} boxShadow={3}>
        <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={3}>
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
                        : pAvatar || process.env.PUBLIC_URL + '/img/default-avatar.png'
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
                    {!modifyLoading && newAvatar && (
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
                  isLoading={modifyLoading}
                  isUpperCase={false}
                  fullWidth={false}
                  onClick={insertOrUpdateAvatarHandler}
                  type="button"
                  disabled={selectedFile === null}>
                  {t('profilepage.updateProfilePicture')}
                </ButtonWithLoading>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
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
                      error={newPasswordHasError}
                      helperText={newPasswordHasError && t('registerpage.passwordInValid')}
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={newPassword}
                      onBlur={newPasswordBlurHandler}
                      onChange={newPasswordChangeHandler}
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
              <ButtonWithLoading
                isLoading={basicLoading}
                fullWidth
                type="submit"
                disabled={
                  !formIsValid ||
                  (isChangePassword &&
                    (!passwordIsValid || !newPasswordIsValid || !confirmPasswordIsValid))
                }>
                {t('submit')}
              </ButtonWithLoading>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};
export default BasicProfilePanel;
