import React from 'react';
import PropTypes from 'prop-types';
import './ErrorPage.css'
import Icon from './ds/Icon';

const ErrorPage = ({ children }) => {

  return (
    <div className="error-page">
      <div className="error-page-icon">
        <Icon name="warning_fill" colour="ds-palette-red-70" />
      </div>
      {children}
    </div>
  );

};

ErrorPage.propTypes = {
};

export default ErrorPage;