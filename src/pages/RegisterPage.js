import React, { useEffect } from "react";
import {
	FormControl,
	Container,
	makeStyles,
	Button,
	TextField,
	Typography,
	Grid,
	Box,
} from "@material-ui/core";
import { useInput } from "../hooks/use-input";
import * as Validate from "../helpers/validate"
import { Link } from "react-router-dom";
import { mainColor } from "../utils";
import Header from "../components/Layout/Header";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
	},
	content: {
		paddingTop: "9vh",
	},
	title: {
		marginBottom: 25,
		padding:'0 140px',
		[theme.breakpoints.down("sm")]: {
			fontSize: 25,
			padding:'0 95px',
		},
	},
	form: {
		width: "45rem",
		maxWidth: "100%",
		margin: "0 auto",
		padding: "40px 120px",
		[theme.breakpoints.down("xs")]: {
			padding: "35px 95px",
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
	forwardTo: {
		marginTop: 10,
		"& > a": {
			color: mainColor,
		},
	},
}));

const RegisterPage = () => {
	const classes = useStyles();
	const {
		enteredInput: username,
		hasError: usernameHasError,
		inputBlurHandler: usernameBlurHandler,
		inputChangeHandler: usernameChangeHandler,
		inputIsValid: usernameIsValid,
		inputReset: usernameReset,
	} = useInput(Validate.isNotEmpty);
	const {
		enteredInput: phoneNumber,
		hasError: phoneNumberHasError,
		inputBlurHandler: phoneNumberBlurHandler,
		inputChangeHandler: phoneNumberChangeHandler,
		inputIsValid: phoneNumberIsValid,
		inputReset: phoneNumberReset,
	} = useInput(Validate.isNotEmpty);
	const {
		enteredInput: address,
		hasError: addressHasError,
		inputBlurHandler: addressBlurHandler,
		inputChangeHandler: addressChangeHandler,
		inputIsValid: addressIsValid,
		inputReset: addressReset,
	} = useInput(Validate.isNotEmpty);
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
	} = useInput(Validate.isNotEmpty);


	const formIsValid = usernameIsValid && passwordIsValid
		&& confirmPasswordIsValid && phoneNumberIsValid && addressIsValid;
	const formSubmitHandler = (event) => {
		event.preventDefault();
		if (!formIsValid) return;

		//xử lý khi đăng ky thành công
		console.log(
			`Đăng ký thành công`
		);

		usernameReset();
		passwordReset();
		confirmPasswordReset();
		phoneNumberReset();
		addressReset();
	};

	useEffect(() => {
		document.title = "Register Page";
	}, []);

	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.content}>
				<Container>
					<Box className={classes.form} boxShadow={3}>
						<Typography variant="h3" className={classes.title}>
							Register
						</Typography>
						<FormControl
							noValidate
							autoComplete="off"
							onSubmit={formSubmitHandler}
						>
							<FormControl className={classes.formControl}>
								<Grid container spacing={3}>
									<Grid item xs={6}>
										<TextField
											error={usernameHasError}
											label="Email"
											helperText={
												usernameHasError &&
												"Please enter a valid email "
											}
											required
											fullWidth
											size="small"
											variant="outlined"
											value={username}
											onBlur={usernameBlurHandler}
											onChange={usernameChangeHandler}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											error={phoneNumberHasError}
											label="Phone Number"
											helperText={
												phoneNumberHasError &&
												"Please enter a valid phone number."
											}
											fullWidth
											size="small"
											variant="outlined"
											value={phoneNumber}
											onBlur={phoneNumberBlurHandler}
											onChange={phoneNumberChangeHandler}
										/>
									</Grid>
								</Grid>
							</FormControl>
							<FormControl className={classes.formControl}>
								<TextField
									error={addressHasError}
									label="Address"
									helperText={
										addressHasError &&
										"Please enter a valid address."
									}
									fullWidth
									size="small"
									variant="outlined"
									value={address}
									onBlur={addressBlurHandler}
									onChange={addressChangeHandler}
								/>
							</FormControl>
							<FormControl className={classes.formControl}>
								<TextField
									label="Password"
									type="password"
									error={passwordHasError}
									helperText={
										passwordHasError &&
										"Please enter a valid password."
									}
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
									label="Confirm Password"
									type="password"
									error={confirmPasswordHasError}
									helperText={
										confirmPasswordHasError &&
										"Password and confirm password does not match."
									}
									fullWidth
									size="small"
									variant="outlined"
									value={confirmPassword}
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
								Register
							</Button>
						</FormControl>
						<Typography
							className={classes.forwardTo}
							variant="body2"
						>
							Already have account? <Link to="/login">Sign in</Link>
						</Typography>
					</Box>
				</Container>
			</div>
		</div>
	);
};

export default RegisterPage;

