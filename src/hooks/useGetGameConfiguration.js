import { useMemo, useState, useEffect } from 'react';
import { useGET, invalidate } from './useHttp.js';

const useGetGameConfiguration = (gameId = null) => {
    const [gameConfiguration, setGameConfiguration] = useState(null);
    const tag = `game-configuration-${gameId}`;
    const requestOptions = useMemo(() => {
        if (!gameId) return { path: null, tag: null };
        return {
            path: `/api/games/${gameId}/gameConfiguration`,
            tag: tag,
        };
    }, [gameId]);

    const [response, error, reload] = useGET(requestOptions);

    // Keep local state in sync with the latest response
    useEffect(() => {
        setGameConfiguration(response ?? null);
    }, [response]);

    // Reset local state when gameId changes
    useEffect(() => {
        setGameConfiguration(null);
    }, [gameId]);

    // Helper to invalidate cache for this tag and then reload
    const invalidateAndReload = () => {
        if (requestOptions.tag) {
            invalidate([tag]);
        }
        reload?.();
    };

    return {
        gameConfiguration,
        error,
        invalidateAndReload,    // convenience: invalidate then reload
    };
};

export default useGetGameConfiguration;