import { useGET, invalidate } from './useHttp';
import { useEffect, useMemo, useState, useCallback, useRef } from 'react';

const useFinalGuessResult = (gameId = null, playerId = null) => {
    const [storedResponse, setStoredResponse] = useState(null);
    const responseRef = useRef(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Prepare request options only if we have gameId and playerId
    const requestOptions = useMemo(() => {
        if (!gameId || !playerId) return { path: null, fetchOnlyIf: false };

        return {
            path: `/public/judge/finalGuessRes/${playerId}/${gameId}`,
            tag: `GAME_FINAL_GUESS_${gameId}-${playerId}`,
            fetchOnlyIf: true,
        };
    }, [gameId, playerId]);

    const [response, error, reload] = useGET(requestOptions);

    // Always mirror the latest response, even if it's null
    useEffect(() => {
        responseRef.current = response;
        if (isMountedRef.current) {
            setStoredResponse(response);
        }
    }, [response]);

    // Function to manually fetch the latest result
    const fetchFinalGuessResult = useCallback(async (options = {}) => {
        const {
            waitForResult = true,
            timeoutMs = 5000,
            intervalMs = 400,
        } = options;

        if (!gameId || !playerId) {
            console.warn('Cannot fetch final guess result: missing gameId or playerId.');
            return null;
        }

        const fetchOnce = async () => {
            if (!isMountedRef.current) return responseRef.current;
            // Invalidate cache so reload forces a network fetch
            invalidate([`GAME_FINAL_GUESS_${gameId}-${playerId}`]);
            // Trigger reload
            await reload();
            // Wait for React state updates to propagate
            await new Promise(resolve => setTimeout(resolve, 0));
            return responseRef.current;
        };

        let result = await fetchOnce();

        if (!waitForResult || !isMountedRef.current) {
            return result;
        }

        // If result is not yet available, poll for a short bounded period
        const started = Date.now();
        while (isMountedRef.current && (!result || result?.show_result !== true) && Date.now() - started < timeoutMs)
        {
            await new Promise(r => setTimeout(r, intervalMs));
            if (!isMountedRef.current) break;
            result = await fetchOnce();
        }
        return result;
    }, [reload, gameId, playerId]);

    return { response: storedResponse, error, fetchFinalGuessResult };
};

export default useFinalGuessResult;