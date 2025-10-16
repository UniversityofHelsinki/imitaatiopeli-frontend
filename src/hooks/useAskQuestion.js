import { useSocket } from '../contexts/SocketContext';
import { useCallback } from 'react';
import localStorage from '../utilities/localStorage';

export const useAskQuestion = (gameId) => {
    const { emit, on, off } = useSocket();

    const askQuestion = useCallback((content, onSuccess, onError) => {
        console.log('askQuestion called with content:', content);

        const judge = localStorage.get('player');
        console.log('judge object:', judge);

        if (!judge || !judge.player_id) {
            if (onError) {
                onError(new Error('No judge data found'));
            }
            return;
        }

        const handleSuccess = (data) => {
            off('question-sent-success', handleSuccess);
            off('question-sent-error', handleError);
            if (onSuccess) {
                onSuccess(data);
            }
        };

        const handleError = (error) => {
            off('question-sent-success', handleSuccess);
            off('question-sent-error', handleError);
            if (onError) {
                onError(error);
            }
        };

        on('question-sent-success', handleSuccess);
        on('question-sent-error', handleError);

        emit('send-question', {
            judgeId: judge.player_id,
            gameId: parseInt(gameId, 10),
            questionText: content
        });
    }, [emit, on, off, gameId]);

    return { askQuestion };
};

export default useAskQuestion;
