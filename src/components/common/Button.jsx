import React from "react";

const Button = ({ children, type, onClick, ...props }) => {
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
