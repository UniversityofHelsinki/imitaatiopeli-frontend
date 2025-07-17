import { usePUT } from "./useHttp";

const useEditGame = (id) => {
  const put = usePUT({
    path: `/api/game/edit`,
    invalidates: [`GAME_${id}`]
  });

  const edit = async (game) => {
    const response = await put(game);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Error on game edit', {
      cause: response 
    });
  };

  return edit;
};

export default useEditGame;