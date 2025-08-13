import {useDELETE} from "./useHttp.js";

const useDeleteGame = (id) => {
    //id ei välity tähän. Game komponenttia muutettava
    const post = useDELETE({
        path: `/api/game/deleteGame`,
        invalidates: [`GAME_${id}`, `GAMES`]
    });

    const removeGame = async (game) => {
        // Kommentoitu pois. Toteutus tehty backend:iin ja db projektiin.
        //const resp = await post({game_id: game[0]?.game_id});
        //return resp;
        return null;
    };

    return [removeGame];
};

export default useDeleteGame;
