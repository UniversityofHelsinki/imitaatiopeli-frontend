import { usePUT } from "./useHttp";

const useStartGame = (id) => {
  const put = usePUT({
    path: `/api/game/${id}/start`,
    invalidates: [`GAME_${id}`, `GAMES`]
  });

  return put;
};

export default useStartGame;