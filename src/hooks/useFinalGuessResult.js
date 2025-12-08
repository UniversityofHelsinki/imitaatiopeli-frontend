import { useGET } from './useHttp';
import { useCallback } from 'react';

const useFinalGuessResult = (gameId = null, playerId) => {
    const fetchOnlyIf = Boolean(gameId) && Boolean(playerId);

    const [response, error, reload] = useGET({
        path: `/public/judge/finalGuessRes/${playerId}/${gameId}`,
        tag: `GAME_FINAL_GUESS_${gameId}`,
        fetchOnlyIf,
    });

    // Create a callable fetch function that you can trigger manually
    const fetchFinalGuessResult = useCallback(async () => {
        if (fetchOnlyIf && gameId && playerId) {
            console.log('Fetching final GUESS result', gameId, playerId, fetchOnlyIf);
            const result = await reload(); // call the reload function from useGET to re-fetch
            console.log('Fetching final GUESS result GOT', result);
            return result;
        } else {
            console.warn('Cannot fetch final guess result: missing gameId or playerId.');
        }
    }, [reload, fetchOnlyIf]);

    // Return the fetch function along with the current state
    return { response, error, reload, fetchFinalGuessResult };
};

export default useFinalGuessResult;