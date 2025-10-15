import { useSocket } from '../contexts/SocketContext';
import { useCallback } from 'react';
import localStorage from '../utilities/localStorage';

export const useAskQuestion = (gameId) => {
  const { emit, on, off } = useSocket();

  const askQuestion = useCallback((content) => {
    return new Promise((resolve, reject) => {
      const judge = localStorage.get('player');
      console.log('judge object:', judge);

      if (!judge || !judge.player_id) {
        reject(new Error('No judge data found'));
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
        judgeId: judge.player_id,
        gameId: parseInt(gameId, 10),
        content: content.question_text
      });
    });
  }, [emit, on, off, gameId]);

  return { askQuestion };
};

export default useAskQuestion;