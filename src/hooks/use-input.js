import { useState } from "react";

export const useInput = (validateFn) => {
	const [enteredInput, setEnteredInput] = useState("");
	const [isTouched, setIsTouched] = useState(false);
	const inputIsValid = validateFn(enteredInput);

	const hasError = !inputIsValid && isTouched;
	const inputChangeHandler = (e) => {
		setEnteredInput(e.target.value);
	};
	const inputBlurHandler = () => {
		setIsTouched(true);
	};
	const inputReset = () => {
		setIsTouched(false);
		setEnteredInput("");
	};

	return {
		enteredInput,
		inputIsValid,
		hasError,
		inputChangeHandler,
		inputBlurHandler,
		inputReset,
	};
};
