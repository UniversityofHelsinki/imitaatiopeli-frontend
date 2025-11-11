import { usePOST } from './useHttp.js';

const useJudgeFinalGuess = () => {
    const post = usePOST({
        path: '/public/judge/finalGuess',
        invalidates: ['FINAL_GUESS']
    });

    const save = async (data) => {
        const response = await post(data);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(`Error on game creation`, {
            cause: response
        });
    };

    return save;
};

export default useJudgeFinalGuess;
