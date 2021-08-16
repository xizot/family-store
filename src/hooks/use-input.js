import { useEffect, useState } from 'react';

export const useInput = (validateFn, initialState = '') => {
  const [enteredInput, setEnteredInput] = useState(initialState);
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
    setEnteredInput('');
  };

  useEffect(() => {
    setEnteredInput(initialState);
  }, [initialState]);

  return {
    enteredInput,
    inputIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    inputReset,
    setEnteredInput,
  };
};
