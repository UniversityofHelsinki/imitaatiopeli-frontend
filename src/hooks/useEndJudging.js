import { useEffect, useMemo, useState } from "react";
import { useSocket } from "../contexts/SocketContext";

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

const useEndJudging = () => {
  const { isConnected, emit, on } = useSocket();

  const [questions, setQuestions] = useState(null);

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
    });
  }, [on, questions]);
  

  const endJudging = async (game) => {
    if (isConnected) {
      await emit('end-judging', { game });
    }
  };

  const memoed = useMemo(() => ({
    endJudging,
    questions,
  }), [questions]);

  console.log('questions', questions);

  return memoed;

};

export default useEndJudging;