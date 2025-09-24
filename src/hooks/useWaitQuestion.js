import { useEffect, useState } from "react";

const useWaitQuestion = (game) => {
  const [question, setQuestion] = useState({
    content: 'Asdf?',
    type: 'received'
  });

  const clearQuestion = () => setQuestion(null);
  
  useEffect(() => {
  }, [game, question]);

  return {
    question,
    clearQuestion
  };
  
};

export default useWaitQuestion;