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

const AccountActivationPage = () => {
	const { t } = useTranslation();
	const classes = useStyles();

	const {
		enteredInput: enteredCode,
		hasError: codeHasError,
		inputBlurHandler: codeBlurHandler,
		inputChangeHandler: codeChangeHandler,
		inputIsValid: codeIsValid,
		inputReset: codeReset,
	} = useInput(Validate.isNotEmpty);


	const formIsValid = codeIsValid;
	const formSubmitHandler = (event) => {
		event.preventDefault();
		if (!formIsValid) return;

		console.log(
			`info_code: ${enteredCode}`
		);
		//handle.....

		//reset text field
		codeReset();
	};

	useEffect(() => {
		document.title = t("accountactivationpage.title");
	}, [t]);

	return (
		<>
			<div className={classes.root}>
				<Header />
				<div className={classes.content}>
					<Container>
						<Box className={classes.form} boxShadow={3}>
							<Typography variant="h3" className={classes.title}>
								{t("accountactivationpage.formTitle")}
							</Typography>
							<form
								noValidate
								autoComplete="off"
								onSubmit={formSubmitHandler}
							>
								<FormControl className={classes.formControl}>
									<TextField
										error={codeHasError}
										label={t("accountactivationpage.code")}
										type="number"
										helperText={
											codeHasError &&
											t("accountactivationpage.codeInvalid")
										}
										fullWidth
										size="small"
										variant="outlined"
										value={enteredCode}
										onBlur={codeBlurHandler}
										onChange={codeChangeHandler}
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
									{t("accountactivationpage.buttonExecute")}
								</Button>
							</form>
							<div className={classes.actions}>
								<Link to="/login">
									<Typography variant="body2">
										{t("accountactivationpage.haveAccount")}
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

export default AccountActivationPage;
