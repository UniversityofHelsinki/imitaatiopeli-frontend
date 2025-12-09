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

            const handleSuccess = (data) => {
                off('question-sent-success', handleSuccess);
                off('question-sent-error', handleError);
                resolve(data);
            };

            const handleError = (error) => {
                off('question-sent-success', handleSuccess);
                off('question-sent-error', handleError);
                reject(error);
            };

            on('question-sent-success', handleSuccess);
            on('question-sent-error', handleError);

            emit('send-question', {
                judgeId: judge.player_id,
                gameId: parseInt(gameId, 10),
                questionText: content
            });
        });
    }, [emit, on, off, gameId]);

    return { askQuestion };
};

export default useAskQuestion;
