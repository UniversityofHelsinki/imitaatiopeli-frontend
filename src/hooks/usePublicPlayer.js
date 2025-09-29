import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGET } from './useHttp';

const usePublicPlayer = (gameId = null) => {
    const fetchOnlyIf = Boolean(gameId);
    const [response, error, reload] = useGET({
        path: `/public/games/${gameId}/players`,
        tag: `GAME_PLAYERS_${gameId}`,
        fetchOnlyIf, // ensure we don't fetch with null
    });
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players.players);

    useEffect(() => {
        if (!response) return;

        if (gameId) {
            if (players !== response) {
                dispatch({
                    type: 'GET_PLAYERS',
                    payload: response,
                });
            }
        }
    }, [response, gameId, players, dispatch]);

    return [players, error, reload];
};

export default usePublicPlayer;
