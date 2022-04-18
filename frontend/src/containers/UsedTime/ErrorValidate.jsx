import React from 'react';

const ErrorValidate = ({ errors }) => {
  return (
    <div className="modal-error">
      {errors.map((error) => {
        return <p key={error}>Error: {error}</p>;
      })}
    </div>
  );
};

export default ErrorValidate;
