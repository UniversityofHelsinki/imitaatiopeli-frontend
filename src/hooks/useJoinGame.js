import { usePOST } from "./useHttp";

const useJoinGame = (game) => {
  const post = usePOST({
    path: `/public/games/join`,
    invalidates: [`GAME_${game.game_id}`, `GAME_${game.game_code}`, `GAMES`, `GAME_PLAYERS_${game.game_id}`]
  });

  return post;
};

export default useJoinGame;