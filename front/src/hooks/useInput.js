import { useState } from "react";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(
    validator ? validator(initialValue).isValid : false
  );
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setValue(e.target.value);
    if (validator) {
      const result = validator(value);
      setIsValid(result.isValid);
      setErrorMessage(result.errorMessage);
    }
  };
  return { value, onChange, isValid, errorMessage, setValue };
};

export default useInput;
