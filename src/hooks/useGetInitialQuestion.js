import { useMemo, useState, useEffect } from 'react';
import { useGET } from './useHttp.js';
import localStorage from '../utilities/localStorage.js';

const useGetInitialQuestion = (gameId = null) => {
    const [initialQuestion, setInitialQuestion] = useState(null);

    const judge = localStorage.get('player');

    const clearInitialQuestion = () => setInitialQuestion(null);

    const requestOptions = useMemo(() => {
        if (!gameId || !judge) return { path: null };
        return {
            path: `/public/games/${gameId}/player/${judge.player_id}/unansweredQuestion`,
            tag: `initial-question-${gameId}-${judge.player_id}`,
        };
    }, [gameId, judge?.player_id]);

    // useGET returns [response, error, reload]
    const [response, error, reload] = useGET(requestOptions);

    // ✅ update state once when response arrives
    useEffect(() => {
        if (!initialQuestion && response && Object.keys(response).length > 0) {
            setInitialQuestion(response);
        }
    }, [response]);

    return {
        initialQuestion,
        clearInitialQuestion
    };
};

export default useGetInitialQuestion;
