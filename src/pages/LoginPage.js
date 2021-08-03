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
import { Link, Redirect, useLocation } from "react-router-dom";
import { mainColor } from "../utils";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/auth";
import { FormHelperText } from "@material-ui/core";

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
		flexWrap: "wrap",
		"& a": {
			color: mainColor,
		},
	},
}));

const LoginPage = () => {
	const { t } = useTranslation();
	const classes = useStyles();
	const location = useLocation();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const loading = useSelector((state) => state.auth.loading);
	const error = useSelector((state) => state.auth.error);

	const {
		enteredInput: enteredUsername,
		hasError: usernameHasError,
		inputBlurHandler: usernameBlurHandler,
		inputChangeHandler: usernameChangeHandler,
		inputIsValid: usernameIsValid,
		inputReset: usernameReset,
	} = useInput(Validate.isNotEmpty);
	const {
		enteredInput: enteredPassword,
		hasError: passwordHasError,
		inputBlurHandler: passwordBlurHandler,
		inputChangeHandler: passwordChangeHandler,
		inputIsValid: passwordIsValid,
		inputReset: passwordReset,
	} = useInput(Validate.isNotEmpty);

	const formIsValid = usernameIsValid && passwordIsValid;

	const formSubmitHandler = async (event) => {
		event.preventDefault();
		if (!formIsValid) return;

		//handle login here
		try {
			await dispatch(
				login({
					username: enteredUsername,
					password: enteredPassword,
				})
			).unwrap();
			usernameReset();
			passwordReset();
		} catch (rejectedValueOrSerializedError) {
			console.log(rejectedValueOrSerializedError);
		}
	};

	useEffect(() => {
		document.title = t("loginpage.title");
	}, [t]);

	if (isAuthenticated) return <Redirect to={location?.state?.from || "/"} />;

	return (
		<>
			<div className={classes.root}>
				<Header />
				<div className={classes.content}>
					<Container>
						<Box className={classes.form} boxShadow={3}>
							<Typography variant="h3" className={classes.title}>
								{t("loginpage.formTitle")}
							</Typography>
							<form
								noValidate
								autoComplete="off"
								onSubmit={formSubmitHandler}
							>
								<FormControl className={classes.formControl}>
									<TextField
										error={usernameHasError}
										label={t("loginpage.email")}
										type="email"
										helperText={
											usernameHasError &&
											t("loginpage.emailInValid")
										}
										fullWidth
										size="small"
										variant="outlined"
										value={enteredUsername}
										onBlur={usernameBlurHandler}
										onChange={usernameChangeHandler}
									/>
								</FormControl>
								<FormControl className={classes.formControl}>
									<TextField
										// error
										label={t("loginpage.password")}
										type="password"
										error={passwordHasError}
										helperText={
											passwordHasError &&
											t("loginpage.passwordInValid")
										}
										fullWidth
										size="small"
										variant="outlined"
										value={enteredPassword}
										onBlur={passwordBlurHandler}
										onChange={passwordChangeHandler}
									/>
								</FormControl>
								{error?.length > 0 && (
									<FormHelperText error>
										{error}
									</FormHelperText>
								)}
								<Button
									variant="contained"
									color="primary"
									fullWidth
									disabled={!formIsValid}
									type="submit"
									className={classes.button}
								>
									{!loading
										? t("loginpage.buttonLogin")
										: t("loginpage.buttonLoginPending")}
								</Button>
							</form>
							<div className={classes.actions}>
								<Typography variant="body2">
									{t("loginpage.newMember")}{" "}
									<Link to="/register">
										{t("loginpage.signUp")}
									</Link>
								</Typography>

								<Link to="/forgot-password">
									<Typography variant="body2">
										{t("loginpage.forgotPassword")}
									</Typography>
								</Link>
							</div>
						</Box>
					</Container>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default LoginPage;
