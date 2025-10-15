import { useSocket } from '../contexts/SocketContext';
import { useCallback } from 'react';
import localStorage from '../utilities/localStorage';

export const useAskQuestion = (gameId) => {
    const { emit, on, off } = useSocket();

    const ask = useCallback((content) => {

        return new Promise((resolve, reject) => {
            const player = localStorage.get('player');
            console.log('player object:', player);

            console.log('questiooni data:', {
                gameId,
                judgeId: player.judge_player_id,
                playerId: player?.player_id,
            });

            if (!player) {
                reject(new Error('No player data found'));
                return;
            }

            if (!player.player_id_for_question_receiver) {
                reject(new Error('No player to receive question'));
                return;
            }

            const onSuccess = (data) => {
                off('question-sent-success', onSuccess);
                off('question-sent-error', onError);
                resolve(data);
            };

            const onError = (error) => {
                off('question-sent-success', onSuccess);
                off('question-sent-error', onError);
                reject(error);
            };

            on('question-sent-success', onSuccess);
            on('question-sent-error', onError);

            emit('send-question', {
                gameId: parseInt(gameId, 10),
                content,
                judgeId: player.judge_player_id,
                playerId: player.player_id_for_question_receiver
            });
        });
    }, [emit, on, off, gameId]);

    return { ask };
};

export default useAskQuestion;