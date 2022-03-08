import React from 'react';

const FormButton = ({ children, category, ...otherFormButtonProps }) => (
    <button className={`btn btn-${category} btn-block`} {...otherFormButtonProps}>
        {children}
    </button>
)

export default FormButton;