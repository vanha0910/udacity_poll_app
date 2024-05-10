import React, { useEffect } from "react";

const Input = ({
  label,
  type,
  value,
  onChange,
  required,
  errorMessage,
  hasError,
  ...props
}) => {
  const [isValid, setIsValid] = React.useState(!hasError);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(e);

    if (required && inputValue.trim() === "") {
      setIsValid(false);
    }  else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    if(hasError) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [hasError])

  return (
    <div className="form-group">
      <label htmlFor={props.id} className="mb-1 label">{label}</label>
      <input
        type={type}
        id={props.id}
        value={value}
        onChange={handleChange}
        className={`form-control ${isValid ? "" : "is-invalid"}`}
        {...props}
      />
      {!isValid && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};

export default Input;
