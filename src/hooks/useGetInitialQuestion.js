import { useMemo } from 'react';
import { useGET } from './useHttp.js';
import localStorage from '../utilities/localStorage.js';

const useGetInitialQuestion = (gameId = null) => {
    const judge = localStorage.get('player');

    // ✅ useMemo makes sure the object reference is stable
    const requestOptions = useMemo(() => {
        if (!gameId || !judge) return { path: null };
        return {
            path: `/public/games/${gameId}/player/${judge.player_id}/unansweredQuestion`,
            tag: `initial-question-${gameId}-${judge.player_id}`,
        };
    }, [gameId, judge?.player_id]);

    // ✅ use your existing useGET safely
    const [response, error, reload] = useGET(requestOptions);

    // ❌ remove useEffect entirely — it’s unnecessary
    return [response, error, reload];
};

export default useGetInitialQuestion;
