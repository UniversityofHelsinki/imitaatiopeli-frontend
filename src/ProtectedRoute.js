import React from 'react';
import { useAuth } from './AuthContext.js';

const ProtectedRoute = ({ component: Component }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // or a loading spinner
    }

    return user ? <Component /> : <Component />;
};

export default ProtectedRoute;
