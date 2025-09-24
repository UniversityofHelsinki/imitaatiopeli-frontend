import React, { createContext, useContext, useMemo, useState } from 'react';

const NotificationContext = createContext(null);

export const useNotification = () => {
    return useContext(NotificationContext);
};

const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const clearNotification = () => {
        setNotification(null);
    };

    const addNotification = (
        content,
        type = 'neutral',
        disappearing = false,
        additionalContent = '',
    ) => {
        const allowedTypes = ['error', 'success', 'neutral'];

        if (!allowedTypes.includes(type)) {
            throw new Error(`Invalid type ${type}. Accepted are ${allowedTypes}`);
        } else if (!content) {
            throw new Error(`Notification must have content defined (${content}).`);
        }

        if (notification) {
            clearNotification();
        }

        setTimeout(() => {
            setNotification({ content, type, disappearing, additionalContent });
        });
    };

    const value = useMemo(
        () => ({ notification, setNotification: addNotification, clearNotification }),
        [notification],
    );

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export default NotificationProvider;
