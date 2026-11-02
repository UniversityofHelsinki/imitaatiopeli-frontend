import React from 'react';
import PropTypes from 'prop-types';
import { useRouteError } from 'react-router-dom';

const ErrorPage = ({ children }) => {
    const error = useRouteError();
    const message = children ?? (error?.message ?? 'Error page unknown error');

    return (
        <div className="error-page">
            <p>{message}</p>
        </div>
    );
};

ErrorPage.propTypes = {
    children: PropTypes.node,
};

export default ErrorPage;
