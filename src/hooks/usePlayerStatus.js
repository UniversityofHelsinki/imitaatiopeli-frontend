import { useGET, invalidate } from './useHttp';
import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import localStorage from "../utilities/localStorage.js";

const usePlayerStatus = () => {
    const player = localStorage.get('player');
    const [playerStatus, setPlayerStatus] = useState(null);
    const responseRef = useRef(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Prepare request options only if we have player identifiers
    const requestOptions = useMemo(() => {
        const hasIds = Boolean(player?.game_id && player?.player_id);
        return {
            path: hasIds ? `/public/answerer/status` : null,
            tag: hasIds ? `ANSWERER_${player?.game_id}-${player?.player_id}` : null,
            fetchOnlyIf: hasIds,
        };
    }, [player?.game_id, player?.player_id]);

    const [response, error, reload] = useGET(requestOptions);

    // Keep a stable reference to reload so effects don't re-run due to changing identity
    const reloadRef = useRef(reload);
    useEffect(() => {
        reloadRef.current = reload;
    }, [reload]);

    // Expose a manual fetch trigger you can call on Aito actions
    const fetchNow = () => {
        const tag = requestOptions.tag;
        if (!tag) return;
        invalidate([tag]);
        reloadRef.current?.();
    };

    // Always mirror the latest response, even if it's null
    useEffect(() => {
        responseRef.current = response;
        if (isMountedRef.current) {
            setPlayerStatus(response);
        }
    }, [response]);

    return { playerStatus, error, fetchNow };
};

export default usePlayerStatus;
