import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
	FormControl,
	Container,
	makeStyles,
	Button,
	TextField,
	Typography,
	Box,
} from "@material-ui/core";
import { useInput } from "../hooks/use-input";
import * as Validate from "../helpers/validate";
import { mainColor } from "../utils";
import { useLocation } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
		maxHeight: "-webkit-fill-available",
	},
	content: {
		padding: "20vh 0",
	},
	title: {
		marginBottom: 25,
		[theme.breakpoints.down("sm")]: {
			fontSize: 25,
		},
	},
	form: {
		width: "30rem",
		background: "#fff",
		maxWidth: "100%",
		margin: "0 auto",
		borderRadius: theme.shape.borderRadius,
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
	actions: {
		marginTop: 10,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		"& a": {
			color: mainColor,
		},
	},
}));

const LoginPage = () => {
	const location = useLocation();
	const query = location.search.slice(6) || ""; //?code=123
	const { t } = useTranslation();
	const classes = useStyles();

	const {
		enteredInput: enteredPassword,
		hasError: passwordHasError,
		inputBlurHandler: passwordBlurHandler,
		inputChangeHandler: passwordChangeHandler,
		inputIsValid: passwordIsValid,
		inputReset: passwordReset,
	} = useInput(Validate.isNotEmpty);

	const {
		enteredInput: enteredConfirmPassword,
		hasError: confirmPasswordHasError,
		inputBlurHandler: confirmPasswordBlurHandler,
		inputChangeHandler: confirmPasswordChangeHandler,
		inputIsValid: confirmPasswordIsValid,
		inputReset: confirmPasswordReset,
	} = useInput((value) => Validate.isNotEmpty(value) && value === enteredPassword);

	const formIsValid = passwordIsValid && confirmPasswordIsValid;
	const formSubmitHandler = (event) => {
		event.preventDefault();
		if (!formIsValid) return;

		//handle...
		console.log(query);

		//reset text field
		passwordReset();
		confirmPasswordReset();
	};

	useEffect(() => {
		document.title = t("recoverypasswordpage.title");
	}, [t]);

	return (
		<>
			<div className={classes.root}>
				<Header />
				<div className={classes.content}>
					<Container>
						<Box className={classes.form} boxShadow={3}>
							<Typography variant="h3" className={classes.title}>
								{t("recoverypasswordpage.formTitle")}
							</Typography>
							<form
								noValidate
								autoComplete="off"
								onSubmit={formSubmitHandler}
							>
								<FormControl className={classes.formControl}>
									<TextField
										// error
										label={t("recoverypasswordpage.password")}
										type="password"
										error={passwordHasError}
										helperText={
											passwordHasError &&
											t("recoverypasswordpage.passwordInValid")
										}
										fullWidth
										size="small"
										variant="outlined"
										value={enteredPassword}
										onBlur={passwordBlurHandler}
										onChange={passwordChangeHandler}
									/>
								</FormControl>
								<FormControl className={classes.formControl}>
									<TextField
										// error
										label={t("recoverypasswordpage.confirmPassword")}
										type="password"
										error={confirmPasswordHasError}
										helperText={
											confirmPasswordHasError &&
											t("recoverypasswordpage.confirmPasswordInValid")
										}
										fullWidth
										size="small"
										variant="outlined"
										value={enteredConfirmPassword}
										onBlur={confirmPasswordBlurHandler}
										onChange={confirmPasswordChangeHandler}
									/>
								</FormControl>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									disabled={!formIsValid}
									type="submit"
									className={classes.button}
								>
									{t("recoverypasswordpage.buttonExecute")}
								</Button>
							</form>
						</Box>
					</Container>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default LoginPage;
