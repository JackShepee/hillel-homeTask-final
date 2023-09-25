import React from "react";

const Button = ({ onClick, children, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`mt-5 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
