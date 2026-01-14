import { useMemo, useState, useEffect } from 'react';
import { useGET } from './useHttp.js';

const useGetGameConfiguration = (gameId = null) => {
    const [gameConfiguration, setGameConfiguration] = useState(null);

    const requestOptions = useMemo(() => {
        if (!gameId) return { path: null };
        return {
            path: `/api/games/${gameId}/gameConfiguration`,
            tag: `game-configuration-${gameId}`,
        };
    }, [gameId]);

    const [response, error, reload] = useGET(requestOptions);

    // ✅ update state once when response arrives
    useEffect(() => {
        if (gameConfiguration == null) {
            setGameConfiguration(response);
        }
    }, [response]);

    return {
        gameConfiguration,
        error
    };
};

export default useGetGameConfiguration;
