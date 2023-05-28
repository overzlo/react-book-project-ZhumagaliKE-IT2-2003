import React from 'react';
import './Error.css'; 

const Error = ({ message }) => {
  return (
    <div className="error-message">
      Error: {message}
      <br></br>
      <img src="/images/error.png" alt="Error" />
    </div>
  );
};

export default Error;
