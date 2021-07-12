import React, { useEffect, useState } from "react";
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
import PhoneInput, { isValidPhoneNumber } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useInput } from "../hooks/use-input";
import * as Validate from "../helpers/validate";
import { Link } from "react-router-dom";
import { mainColor } from "../utils";
import Header from "../components/Layout/Header";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
	},
	content: {
		paddingTop: "20vh",
	},
	title: {
		marginBottom: 25,
		[theme.breakpoints.down("sm")]: {
			fontSize: 25,
			padding: "0 95px",
		},
	},
	phoneInput: {
		height: '255px ',
	},
	form: {
		width: "45rem",
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
		width: "100%",
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
		enteredInput: email,
		hasError: emailHasError,
		inputBlurHandler: emailBlurHandler,
		inputChangeHandler: emailChangeHandler,
		inputIsValid: emailIsValid,
		inputReset: emailReset,
	} = useInput(
		(value) => Validate.isNotEmpty(value) && Validate.isEmail(value)
	);
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
	} = useInput((value) => Validate.isNotEmpty(value) && value === password);

	const [phoneNumber, setPhoneNumber] = useState();

	const formIsValid =
		emailIsValid &&
		passwordIsValid &&
		confirmPasswordIsValid &&
		addressIsValid;
	const formSubmitHandler = (event) => {
		event.preventDefault();
		if (!formIsValid) return;

		//xử lý đăng ký
		console.log(`Đăng ký`);

		emailReset();
		passwordReset();
		confirmPasswordReset();
		addressReset();
	};

	const changeValue = (e, data) => {
		setPhoneNumber(data.value);
	}
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
						<form
							noValidate
							autoComplete="off"
							onSubmit={formSubmitHandler}
						>
							<FormControl className={classes.formControl}>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={6}>
										<TextField
											error={emailHasError}
											label="Email"
											type="email"
											helperText={
												emailHasError &&
												"Please enter a valid email "
											}
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
												height: "40px",
												width: "100%"
											}}
											country={"vn"}
											label='Phone Number'
											placeholder="Enter phone number"
											value={phoneNumber}
											onChange={(e, data) => {
												changeValue(e, data);
											}}
											error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number') : 'Phone number required'}
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
							<Typography
								className={classes.forwardTo}
								variant="body2"
							>
								Already have account?{" "}
								<Link to="/login">Sign in</Link>
							</Typography>
						</form>
					</Box>
				</Container>
			</div>
		</div>
	);
};

export default RegisterPage;
