/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState(null);
    const socketRef = useRef(null);

    const baseUrl = import.meta.env.VITE_APP_IMITATION_BACKEND_SERVER || '';
    const serverUrl = baseUrl || window.location.origin;

    useEffect(() => {
        console.log('Connecting to Socket.IO server:', serverUrl);

        // Initialize socket connection
        const socket = io(serverUrl, {
            transports: ['websocket', 'polling'],
            upgrade: true,
            timeout: 20000,
            reconnection: true,
            forceNew: false,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 10000,
            randomizationFactor: 0.5,
        });

        socketRef.current = socket;

        const testData = {
            answerId: '1',
            argument: 'i think its AI because ......',
            confidence: 5,
        };

        console.log('Sending answer guess data:', testData);
        //socket.emit('send-guess-to-answer', testData);


        // Connection event handlers
        socket.on('connect', () => {
            console.log('Connected to server with ID:', socket.id);
            setIsConnected(true);
            setConnectionError(null);
        });

        socket.on('disconnect', (reason) => {
            console.log('Disconnected from server:', reason);
            setIsConnected(false);
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setConnectionError(error.message);
            setIsConnected(false);
        });

        socket.on('reconnect', (attemptNumber) => {
            console.log('Reconnected after', attemptNumber, 'attempts');
            setIsConnected(true);
            setConnectionError(null);
        });

        // Global error handler
        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
            socketRef.current = null;
            setIsConnected(false);
        };
    }, [serverUrl]);

    // Memoize socket methods to prevent recreation on every render
    const emit = useCallback((event, data) => {
        if (socketRef.current && isConnected) {
            socketRef.current.emit(event, data);
        } else {
            console.warn('Socket not connected. Cannot emit event:', event);
        }
    }, [isConnected]);

    const on = useCallback((event, callback) => {
        if (socketRef.current) {
            socketRef.current.on(event, callback);
        }
    }, []);

    const off = useCallback((event, callback) => {
        if (socketRef.current) {
            socketRef.current.off(event, callback);
        }
    }, []);

    const value = useMemo(() => ({
        socket: socketRef.current,
        isConnected,
        connectionError,
        serverUrl,
        emit,
        on,
        off
    }), [isConnected, connectionError, serverUrl, emit, on, off]);

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
