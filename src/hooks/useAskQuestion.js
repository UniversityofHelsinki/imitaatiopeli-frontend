import { useSocket } from '../contexts/SocketContext';
import { useCallback } from 'react';
import localStorage from '../utilities/localStorage';

export const useAskQuestion = (gameId) => {
    const { emit, on, off } = useSocket();

    const askQuestion = useCallback((content) => {
        return new Promise((resolve, reject) => {
            const judge = localStorage.get('player');

            if (!judge || !judge.player_id) {
                reject(new Error('No judge data found'));
                return;
            }

            let settled = false;
            const cleanup = (successHandler, errorHandler, timerId) => {
                try {
                    off('question-sent-success', successHandler);
                    off('question-sent-error', errorHandler);
                } finally {
                    //if (timerId) clearTimeout(timerId);
                }
            };

            const handleSuccess = (data) => {
                if (settled) return;
                settled = true;
                cleanup(handleSuccess, handleError);
                resolve(data);
            };

            const handleError = (error) => {
                if (settled) return;
                settled = true;
                cleanup(handleSuccess, handleError);
                reject(error);
            };

            on('question-sent-success', handleSuccess);
            on('question-sent-error', handleError);

            try {
                emit('send-question', {
                    judgeId: judge.player_id,
                    gameId: parseInt(gameId, 10),
                    questionText: content
                });
            } catch (e) {
                if (settled) return;
                settled = true;
                cleanup(handleSuccess, handleError);
                reject(e);
            }
        });
    }, [emit, on, off, gameId]);

    return { askQuestion };
};

export default useAskQuestion;
