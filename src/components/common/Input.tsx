import React, { useEffect, useState, ChangeEvent } from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  required = false,
  errorMessage = '',
  hasError = false,
  ...props
}) => {
  const [isValid, setIsValid] = useState(!hasError);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(e);

    if (required && inputValue.trim() === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    if (hasError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [hasError]);

  return (
    <div className="form-group">
      <label htmlFor={props.id} className="mb-1 label">
        {label}
      </label>
      <input
        type={type}
        id={props.id}
        value={value}
        onChange={handleChange}
        className={`form-control ${isValid ? '' : 'is-invalid'}`}
        {...props}
      />
      {!isValid && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};

export default Input;
