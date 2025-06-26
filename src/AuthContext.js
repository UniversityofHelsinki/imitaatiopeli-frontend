import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import useUser from './hooks/useUser.js';
import {ROLE_TEACHER} from "./Constants.js";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, loadUser] = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                await loadUser();
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const value = useMemo(() => {
        const isTeacher = user?.eduPersonAffiliation?.includes(ROLE_TEACHER);

        return { user: (user && { ...user, isTeacher }) || null, loading };
    }, [user, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
