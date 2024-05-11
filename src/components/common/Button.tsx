import React, { MouseEvent } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ children, type = 'button', onClick, ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn btn-primary mt-2"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
