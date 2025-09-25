import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    useEffect(() => {
        const loginPath = '/Shibboleth.sso/Login';

        if (!loading && !user && window.location.pathname !== loginPath) {
            // Capture the current path and query parameters
            const target = encodeURIComponent(window.location.pathname + window.location.search);
            // Redirect to login with the target URL included
            window.location.replace(`${loginPath}?target=${target}`);
        }
    }, [loading, user]);

    if (loading) {
        return <div>Loading...</div>; // or a loading spinner
    }

    if (user) {
        return children;
    }

    return null;
};

export default ProtectedRoute;
