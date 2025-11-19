import { useMemo, useState, useEffect } from 'react';
import { useGET } from './useHttp.js';
import localStorage from '../utilities/localStorage.js';

const useGetInitialAnswers = (gameId = null) => {
    const [initialAnswers, setInitialAnswers] = useState(null);

    const judge = localStorage.get('player');

    const clearInitialAnswers = () => setInitialAnswers(null);

    const requestOptions = useMemo(() => {
        if (!gameId || !judge) return { path: null };
        return {
            path: `/public/games/${gameId}/player/${judge.player_id}/notAnswersForRatingForm`,
            tag: `initial-answers-${gameId}-${judge.player_id}`,
        };
    }, [gameId, judge?.player_id]);

    const [response, error, reload] = useGET(requestOptions);

    // ✅ update state once when response arrives
    useEffect(() => {
        if (!initialAnswers && response && Object.keys(response).length > 0) {
            setInitialAnswers(response);
        }
    }, [response]);

    return {
        initialAnswers,
        clearInitialAnswers
    };
};

export default useGetInitialAnswers;
