import { usePOST } from "./useHttp";

const useSaveGameConfiguration = () => {
  const post = usePOST({
    path: '/api/game/create'
  });

  const save = async (game) => {
    const response = await post(game);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Error on game creation`, {
      cause: response
    });
  };

  return save;
};

export default useSaveGameConfiguration;