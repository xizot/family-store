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
import { Link } from "react-router-dom";
import { mainColor } from "../utils";
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

const ForgotPasswordPage = () => {
	const { t } = useTranslation();
	const classes = useStyles();

	const {
		enteredInput: enteredUsername,
		hasError: usernameHasError,
		inputBlurHandler: usernameBlurHandler,
		inputChangeHandler: usernameChangeHandler,
		inputIsValid: usernameIsValid,
		inputReset: usernameReset,
	} = useInput(Validate.isEmail);


	const formIsValid = usernameIsValid;
	const formSubmitHandler = (event) => {
		event.preventDefault();
		if (!formIsValid) return;

		console.log(
			`login info:\nusername: ${enteredUsername}`
		);
		//handle....

		//reset text field
		usernameReset();
	};

	useEffect(() => {
		document.title = t("forgotpasswordpage.title");
	}, [t]);

	return (
		<>
			<div className={classes.root}>
				<Header />
				<div className={classes.content}>
					<Container>
						<Box className={classes.form} boxShadow={3}>
							<Typography variant="h3" className={classes.title}>
								{t("forgotpasswordpage.formTitle")}
							</Typography>
							<form
								noValidate
								autoComplete="off"
								onSubmit={formSubmitHandler}
							>
								<FormControl className={classes.formControl}>
									<TextField
										error={usernameHasError}
										label={t("forgotpasswordpage.email")}
										type="email"
										helperText={
											usernameHasError &&
											t("forgotpasswordpage.emailInValid")
										}
										fullWidth
										size="small"
										variant="outlined"
										value={enteredUsername}
										onBlur={usernameBlurHandler}
										onChange={usernameChangeHandler}
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
									{t("forgotpasswordpage.buttonExecute")}
								</Button>
							</form>
							<div className={classes.actions}>
								<Typography variant="body2">
									{t("forgotpasswordpage.newMember")}{" "}
									<Link to="/register">
										{t("forgotpasswordpage.signUp")}
									</Link>
								</Typography>

								<Link to="/login">
									<Typography variant="body2">
										{t("forgotpasswordpage.haveAccount")}
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

export default ForgotPasswordPage;
