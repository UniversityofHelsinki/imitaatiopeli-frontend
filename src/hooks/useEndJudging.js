import { useEffect, useMemo, useState } from "react";
import { useSocket } from "../contexts/SocketContext";
import localStorage from '../utilities/localStorage.js';

export const useWaitEndJudging = () => {
  const { on } = useSocket();
  const [judgingEnded, setJudgingEnded] = useState(false);

  useEffect(() => {
    on('no-more-answers', () => {
      setJudgingEnded(true);
    });
  }, [on]);
  

  return judgingEnded;
};

const useEndJudging = (game) => {
  const { isConnected, emit, on } = useSocket();

      const storageKey = game ? `judging-summary:${game}` : 'judging-summary';
      const [questions, setQuestions] = useState(() => {
          try {
              return localStorage.get(storageKey) || null;
          } catch {
              return null;
          }
      });

    useEffect(() => {
        on('judging-summary', response => {
          const questions = {};
          response.map(o => {
            if (!questions[o.question_id]) {
              questions[o.question_id] = {
                question_id: o.question_id,
                question_created: o.question_created,
                question_text: o.question_text,
                quess_id: o.quess_id,
                argument: o.argument,
                answers: []
              };
            }

            const answer = {
              ...o
            };

            delete answer.question_created;
            delete answer.question_text;
            delete answer.quess_id;

            questions[o.question_id].answers.push(answer);
            questions[o.question_id].answers.sort(a => a.is_pretender ? 1 : -1);

            questions[o.question_id].selectedAnswer = questions[o.question_id].answers.findIndex(a => a.guess_created);

          });
          setQuestions(questions);
          // Persist latest questions to localStorage
          try {
              localStorage.set(storageKey, questions);
          } catch {
              // ignore storage errors
          }
        });
  }, [isConnected, on, storageKey]);
  

  const endJudging = async (game, rating) => {
    if (isConnected) {
      await emit('end-judging', { game, rating });
    }
  };
  // Return plain object; questions is persisted via localStorage
  return {
      endJudging,
      questions,
  };

};

export default useEndJudging;