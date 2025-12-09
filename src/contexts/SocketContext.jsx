/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';
import localStorage from '../utilities/localStorage.js';

const SocketContext = createContext();

const getPlayer = () => localStorage.get('player');

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

        // Connection event handlers
        socket.on('connect', () => {
            setIsConnected(false);
            setIsConnected(true);
            setConnectionError(null);
            const Player = getPlayer();
            if (Player?.player_id && Player?.game_id && Player?.nickname && Player?.session_token) {
                socket.emit('join-game', {
                    userId: Player.player_id,
                    gameId: Player.game_id,
                    nickname: Player.nickname,
                    session_token: Player.session_token.toString(),
                });
            }
        });

        socket.on('disconnect', (reason) => {
            setIsConnected(false);
        });

        socket.on('connect_error', (error) => {
            setConnectionError(error.message);
            setIsConnected(false);
        });

        socket.on('reconnect', () => {
            setIsConnected(true);
            setConnectionError(null);
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
