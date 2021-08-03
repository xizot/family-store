import {
	Button,
	FormControl,
	FormHelperText,
	makeStyles,
	TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Validate } from "../../helpers";
import { useInput } from "../../hooks/use-input";
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

const BasicProfilePanel = () => {
	const { t } = useTranslation();
	const classes = useStyles();

	const [phoneNumber, setPhoneNumber] = useState("");
	const [phoneNumberIsTouched, setPhoneNumberIsTouched] = useState(false);

	const phoneNumberIsValid =
		(Validate.isNotEmpty(phoneNumber) &&
			Validate.isPhoneNumber(phoneNumber)) ||
		phoneNumber === "";
	const phoneNumberHasError = !phoneNumberIsValid && phoneNumberIsTouched;
	const {
		enteredInput: enteredFullName,
		hasError: fullNameHasError,
		inputBlurHandler: fullNameBlurHandler,
		inputChangeHandler: fullNameChangeHandler,
		inputIsValid: fullNameIsValid,
		inputReset: fullNameReset,
	} = useInput(Validate.isNotEmpty, "Nguyễn Văn A");
	const {
		enteredInput: enteredEmail,
		hasError: emailHasError,
		inputBlurHandler: emailBlurHandler,
		inputChangeHandler: emailChangeHandler,
		inputIsValid: emailIsValid,
		inputReset: emailReset,
	} = useInput(
		(value) => Validate.isNotEmpty(value) && Validate.isEmail(value),
		"Email@gmail.com"
	);
	const {
		enteredInput: enteredAddress,
		hasError: addressHasError,
		inputBlurHandler: addressBlurHandler,
		inputChangeHandler: addressChangeHandler,
		inputIsValid: addressIsValid,
		inputReset: addressReset,
	} = useInput(Validate.isNotEmpty, "Thu Duc City");
	const phoneNumberChangeHandler = (value) => {
		setPhoneNumber(value);
		console.log(value);
	};

	const phoneNumberBlurHandler = () => {
		setPhoneNumberIsTouched(true);
	};

	const phoneNumberReset = () => {
		setPhoneNumber("");
		setPhoneNumberIsTouched(false);
	};

	const formIsValid =
		fullNameIsValid && emailIsValid && addressIsValid && phoneNumberIsValid;
	const formSubmitHandler = async (e) => {
		e.preventDefault();
		if (!formIsValid) return;

		fullNameReset();
		emailReset();
		addressReset();
		phoneNumberReset();
		// xử lí logic ở đây
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
					error={fullNameHasError}
					label={t("profilepage.fullName")}
					type="text"
					helperText={
						fullNameHasError && "Please enter a valid name."
					}
					fullWidth
					size="small"
					variant="outlined"
					value={enteredFullName}
					onChange={fullNameChangeHandler}
					onBlur={fullNameBlurHandler}
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					error={emailHasError}
					label={t("profilepage.email")}
					type="email"
					helperText={emailHasError && "Please enter a valid email."}
					fullWidth
					size="small"
					variant="outlined"
					value={enteredEmail}
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
				/>
			</FormControl>
			<FormControl className={classes.formControl}>
				<PhoneInput
					inputStyle={{
						height: "40px",
						width: "100%",
					}}
					inputClass={phoneNumberHasError && classes.inputInvalid}
					country={"vn"}
					label="Phone Number"
					placeholder="Enter phone number"
					value={phoneNumber}
					onChange={phoneNumberChangeHandler}
					onBlur={phoneNumberBlurHandler}
				/>
				{false && (
					<FormHelperText
						variant="outlined"
						className={classes.formHelperText}
					>
						Please enter a valid phone number
					</FormHelperText>
				)}
			</FormControl>
			<FormControl className={classes.formControl}>
				<TextField
					error={addressHasError}
					label={t("profilepage.address")}
					helperText={
						addressHasError && "Please enter a valid address."
					}
					fullWidth
					size="small"
					variant="outlined"
					multiline
					rows={4}
					value={enteredAddress}
					onChange={addressChangeHandler}
					onBlur={addressBlurHandler}
				/>
			</FormControl>
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
export default BasicProfilePanel;
