import { useEffect, useState } from "react";
import { useSocket } from "../contexts/SocketContext.jsx";

const useWaitQuestion = (game) => {
    const [question, setQuestion] = useState(null);
    const { on, off } = useSocket();

    const clearQuestion = () => setQuestion(null);

    useEffect(() => {
        const handleReceiveQuestion = (data) => {
            console.log('Received question:', data);
            setQuestion({
                questionId: data.questionId,
                gameId: data.gameId,
                content: data.content,
                judgeId: data.judgeId,
                created: data.created,
                type: 'received'
            });
        };

        // Listen for questions from backend
        on('send-question', handleReceiveQuestion);

        // Cleanup listener on unmount
        return () => {
            off('send-question', handleReceiveQuestion);
        };
    }, [on, off]);

    return {
        question,
        clearQuestion
    };

};

export default useWaitQuestion;