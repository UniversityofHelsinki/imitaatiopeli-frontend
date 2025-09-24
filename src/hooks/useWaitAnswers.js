import { useEffect, useState } from "react";

const useWaitAnswers = (game) => {
  const [answers, setAnswers] = useState([
    {
      content: 'AAA BBB CCC',
      type: 'received',
    },
    {
      content: 'DDD EEE FFF',
      type: 'received'
    }
  ]);

  const clearAnswers = () => setAnswers([]);

  useEffect(() => {
  }, [game, answers]);

  return {
    answers,
    clearAnswers,
  };
  

};

export default useWaitAnswers;