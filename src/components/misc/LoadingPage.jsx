import React from 'react';
import PropTypes from 'prop-types';
import './LoadingPage.css'
import Spinner from './ds/Spinner';

const LoadingPage = ({ children }) => {

  return (
    <div className="loading-page">
      <div className="loading-page-content">
        <Spinner size="2xLarge" />
        {children}
      </div>
    </div>
  );
};

LoadingPage.propTypes = {
  children: PropTypes.node
};

export default LoadingPage;