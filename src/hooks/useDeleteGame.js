import {useDELETE} from "./useHttp.js";

const useDeleteGame = (game_id) => {
    console.log("useDeleteGame", game_id);
    const post = useDELETE({
        path: `/api/game/deleteGame`,
        invalidates: [`GAME_${game_id}`, `GAMES`]
    });

    const removeGame = async (game) => {
        const resp = await post({game_id: game?.game_id});
        return resp;
    };

    return [removeGame];
};

export default useDeleteGame;
