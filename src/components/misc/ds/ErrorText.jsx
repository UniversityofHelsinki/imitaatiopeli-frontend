import React from 'react';
import PropTypes from 'prop-types';
import './ErrorText.css'
import Icon from './Icon';

const ErrorText = ({ text }) => {

  return (
    <div className="ds-error-text">
      <Icon name="warning_fill" colour="ds-palette-red-70" />
      <span>{text}</span>
    </div>
  );
};

ErrorText.propTypes = {
  text: PropTypes.string,
};

export default ErrorText;