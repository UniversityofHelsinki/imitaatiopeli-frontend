import { useGET, invalidate } from './useHttp';
import {useEffect, useMemo, useState, useRef, useCallback} from 'react';
import localStorage from "../utilities/localStorage.js";

const useJudgeStatus = () => {
    const player = localStorage.get('player');
    const [judgeStatus, setJudgeStatus] = useState(null);
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
            path: hasIds ? `/public/judge/status` : null,
            tag: hasIds ? `JUDGE_${player?.game_id}-${player?.player_id}` : null,
            fetchOnlyIf: hasIds,
        };
    }, [player?.game_id, player?.player_id]);

    const [response, error, reload] = useGET(requestOptions);

    // Keep a stable reference to reload so effects don't re-run due to changing identity
    const reloadRef = useRef(reload);
    useEffect(() => {
        reloadRef.current = reload;
    }, [reload]);

    // Mirror the latest response so callers can read it synchronously after an async reload
    useEffect(() => {
        responseRef.current = response;
        if (isMountedRef.current) {
            setJudgeStatus(response);
        }
    }, [response]);
// Wait for the next response change; retry a few times if nothing changes
    const fetchNowAsync = useCallback(async (opts = {}) => {
        const {
            timeoutMs = 1200,      // per-attempt poll window
            intervalMs = 120,      // poll interval
            tries = 3,             // total attempts
            backoffMs = 200        // wait between attempts
        } = opts;
        const tag = requestOptions.tag;
        if (!tag) return null;

        const startSnapshot = responseRef.current;

        for (let attempt = 1; attempt <= tries; attempt++) {
            // Invalidate and reload
            invalidate([tag]);
            await reloadRef.current?.();

            const startedAt = Date.now();
            // Poll until responseRef.current !== startSnapshot or timeout
            while (Date.now() - startedAt < timeoutMs) {
                await new Promise(r => setTimeout(r, intervalMs)); // yield for state/effects
                if (responseRef.current !== startSnapshot) {
                    return responseRef.current;
                }
            }

            // If not changed and we still have attempts left, wait a bit and try again
            if (attempt < tries) {
                await new Promise(r => setTimeout(r, backoffMs));
            }
        }
        // Gave up: return whatever we currently have
        return responseRef.current;
    }, [requestOptions.tag]);

    return { judgeStatus, error, fetchNowAsync, setJudgeStatus };
};

export default useJudgeStatus;
