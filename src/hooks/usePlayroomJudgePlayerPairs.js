import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGET } from './useHttp';

const usePlayroomJudgePlayerPairs = (gameId = null) => {
    const [response, error, reload] = useGET({
        path: gameId ? `/api/game/${gameId}/getPlayroomJudgePlayerPairs` : null,
        tag: gameId ? `PLAYROOM_JUDGE_PLAYER_PAIRS_${gameId}` : null,
    });
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players.playroomjudgeplayerpairs);

    useEffect(() => {
        if (response !== null && players !== response) {
            dispatch({
                type: 'GET_PLAYROOM_JUDGE_PLAYER_PAIRS',
                payload: response,
            });
        }
    }, [response, dispatch]);

    return [players, error, reload];
};

export default usePlayroomJudgePlayerPairs;
