import React from 'react';
import PropTypes from 'prop-types';
import './FormLabel.css';

const FormLabel = ({ children, elementId, required, ...rest }) => {
  return (
    <label className="ds-form-label" htmlFor={elementId} { ...rest }>
      {children}
      {required && <span className="ds-form-label-required"> *</span>}
    </label>
  )
};

FormLabel.propTypes = {
  children: PropTypes.node,
  elementId: PropTypes.string,
  required: PropTypes.bool
};

export default FormLabel;