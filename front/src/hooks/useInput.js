import { useState } from "react";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    const result = validator(value);
    setValue(e.target.value);
    setIsValid(result.isValid);
    setErrorMessage(result.errorMessage);
  };
  return { value, onChange, isValid, errorMessage };
};

export default useInput;
