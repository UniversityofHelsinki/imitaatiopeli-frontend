import { usePUT } from "./useHttp";

const useEndGame = (id) => {
  const put = usePUT({
    path: `/api/game/${id}/end`,
    invalidates: [`GAME_${id}`, `GAMES`]
  });

  return put;
};

export default useEndGame;