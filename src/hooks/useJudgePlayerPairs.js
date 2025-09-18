import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGET } from './useHttp';

const useJudgePlayerPairs = (gameId = null) => {
    const [response, error, reload] = useGET({
        path: gameId ? `/api/games/${gameId}/judgeplayerpairs` : null,
        tag: gameId ? `GAME_PLAYERS_${gameId}` : null,
    });
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players.judgeplayerpairs);

    useEffect(() => {
            if (response !== null && players !== response) {
                dispatch({
                    type: 'GET_JUDGEPLAYERPAIRS',
                    payload: response,
                });
            }
    }, [response, dispatch]);

    return [players, error, reload];
};

export default useJudgePlayerPairs;
