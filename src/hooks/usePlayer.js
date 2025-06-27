import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGET } from './useHttp';

const usePlayer = (playerId) => {
    const [response, error, reload] = useGET({
        path: `/api/getPlayerById/${playerId}`,
        tag: 'PLAYER_DATA_${playerId}',
    });
    const dispatch = useDispatch();
    const player = useSelector((state) => state.players.player);

    useEffect(() => {
        if (player !== response) {
            dispatch({
                type: 'GET_PLAYER_COURSE',
                payload: response,
            });
        }
    }, [response]);

    return [player, error, reload];
};

export default usePlayer;
