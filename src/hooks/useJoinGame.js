import { usePOST } from "./useHttp";

const useJoinGame = (game) => {
  const post = usePOST({
    path: `/public/games/join`,
    invalidates: [`GAME_${game.game_id}`, `GAME_${game.game_code}`, `GAMES`]
  });

  return post;
};

export default useJoinGame;