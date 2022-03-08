import React from 'react';

const FormInput= ({ handleChange, sideIcon, ...otherInputProps  }) => (
      <input onChange={handleChange}  { ...otherInputProps } />
);

export default FormInput;