import {
	Button,
	FormControl,
	FormHelperText,
	makeStyles,
	TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Validate } from "../../helpers";
import { useInput } from "../../hooks/use-input";
import { changePassword } from "../../reducers/auth";
const useStyles = makeStyles((theme) => ({
	form: {
		width: "30rem",
		background: "#fff",
		maxWidth: "100%",
		margin: "0 auto",
		padding: "50px 25px",
		[theme.breakpoints.down("xs")]: {
			padding: "35px 15px",
		},
	},
	formControl: {
		display: "block",
		marginBottom: 15,
	},
	button: {
		"&:disabled": {
			cursor: "not-allowed",
			pointerEvents: "all !important",
		},
	},
}));
const ChangePasswordPanel = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [error, setError] = useState(null);
	const user = useSelector((state) => state.auth.user);
	const {
		enteredInput: enteredCurrentPassword,
		hasError: currentPasswordHasError,
		inputBlurHandler: currentPasswordBlurHandler,
		inputChangeHandler: currentPasswordChangeHandler,
		inputIsValid: currentPasswordIsValid,
		inputReset: currentPasswordReset,
	} = useInput(Validate.isNotEmpty);
	const {
		enteredInput: enteredNewPassword,
		hasError: newPasswordHasError,
		inputBlurHandler: newPasswordBlurHandler,
		inputChangeHandler: newPasswordChangeHandler,
		inputIsValid: newPasswordIsValid,
		inputReset: newPasswordReset,
	} = useInput(Validate.isNotEmpty);
	const {
		enteredInput: enteredConfirmPassword,
		hasError: confirmPasswordHasError,
		inputBlurHandler: confirmPasswordBlurHandler,
		inputChangeHandler: confirmPasswordChangeHandler,
		inputIsValid: confirmPasswordIsValid,
		inputReset: confirmPasswordReset,
	} = useInput(
		(value) => Validate.isNotEmpty(value) && value === enteredNewPassword
	);

	const formIsValid =
		currentPasswordIsValid && confirmPasswordIsValid && newPasswordIsValid;
	const formSubmitHandler = async (e) => {
		e.preventDefault();
		if (!formIsValid) return;

		try {
			await dispatch(
				changePassword({
					userId: user.acc_id,
					newPassword: enteredNewPassword,
				})
			).unwrap();

			currentPasswordReset();
			newPasswordReset();
			confirmPasswordReset();
		} catch (e) {
			setError(e);
		}
	};
	return (
		<form
			noValidate
			autoComplete="off"
			className={classes.form}
			onSubmit={formSubmitHandler}
		>
			<FormControl className={classes.formControl}>
				<TextField
					error={currentPasswordHasError}
					label={t("profilepage.currentPassword")}
					type="password"
					fullWidth
					size="small"
					variant="outlined"
					value={enteredCurrentPassword}
					onChange={currentPasswordChangeHandler}
					onBlur={currentPasswordBlurHandler}
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					error={newPasswordHasError}
					label={t("profilepage.newPassword")}
					type="password"
					fullWidth
					size="small"
					variant="outlined"
					value={enteredNewPassword}
					onChange={newPasswordChangeHandler}
					onBlur={newPasswordBlurHandler}
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					error={confirmPasswordHasError}
					label={t("profilepage.confirmNewPassword")}
					type="password"
					helperText={
						confirmPasswordHasError &&
						"Confirm password is not match"
					}
					fullWidth
					size="small"
					variant="outlined"
					value={enteredConfirmPassword}
					onChange={confirmPasswordChangeHandler}
					onBlur={confirmPasswordBlurHandler}
				/>
			</FormControl>
			{error?.length > 0 && (
				<FormHelperText error style={{ marginBottom: 10 }}>
					{error}
				</FormHelperText>
			)}
			<Button
				variant="contained"
				color="primary"
				fullWidth
				type="submit"
				disabled={!formIsValid}
			>
				{t("profilepage.buttonExecute")}
			</Button>
		</form>
	);
};

export default ChangePasswordPanel;
