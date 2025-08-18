import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGET } from './useHttp';

const usePlayer = (playerId = null, gameId = null) => {
    const [response, error, reload] = useGET({
        path: playerId ? `/api/getPlayerById/${playerId}` :
            gameId ? `/api/games/${gameId}/players` : null,
        tag: playerId ? `PLAYER_DATA_${playerId}` :
            gameId ? `GAME_PLAYERS_${gameId}` : null,
    });
    const dispatch = useDispatch();
    const player = useSelector((state) => state.players.player);
    const players = useSelector((state) => state.players.players);

    useEffect(() => {
        if (playerId) {
            if (player !== response) {
                dispatch({
                    type: 'GET_PLAYER',
                    payload: response,
                });
            }
        } else if (gameId) {
            if (players !== response) {
                dispatch({
                    type: 'GET_PLAYERS',
                    payload: response,
                });
            }
        }
    }, [response]);

    return playerId ? [player, error, reload] : [players, error, reload];
};

export default usePlayer;
