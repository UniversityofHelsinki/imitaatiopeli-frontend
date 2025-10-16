import { useSocket } from '../contexts/SocketContext';
import { useCallback } from 'react';
import localStorage from '../utilities/localStorage';

const useAnswerQuestion = (gameId) => {
    const { emit, on, off } = useSocket();

    const sendAnswer = useCallback((content, question) => {
        return new Promise((resolve, reject) => {
            const player = localStorage.get('player');

            if (!player) {
                reject(new Error('No player data found'));
                return;
            }

            if (!question) {
                reject(new Error('No question to answer'));
                return;
            }

            const onSuccess = (data) => {
                off('answer-sent-success', onSuccess);
                off('answer-sent-error', onError);
                resolve(data);
            };

            const onError = (error) => {
                off('answer-sent-success', onSuccess);
                off('answer-sent-error', onError);
                reject(error);
            };

            on('answer-sent-success', onSuccess);
            on('answer-sent-error', onError);

            emit('send-answer', {
                questionId: question.questionId.toString(),
                playerId: player?.player_id.toString(),
                gameId: question.gameId.toString(),
                answer: content,
                timestamp: Date.now()
            });
        });
    }, [emit, on, off]);

    return { sendAnswer };
};

export default useAnswerQuestion;
