import { useEffect, useState } from "react";
import { useSocket } from "../contexts/SocketContext.jsx";

const useWaitAnswers = () => {
    const [answers, setAnswers] = useState([]);
    const { on, off } = useSocket();

    const clearAnswers = () => setAnswers([]);

    useEffect(() => {
        const handleReceiveAnswers = (data) => {
            console.log('Received answers:', data);
            // Transform the answers array from backend to match your format
            const formattedAnswers = data.answers.map(answer => ({
                content: answer,
                type: 'received',
            }));

            setAnswers(formattedAnswers);
        };
        // Listen for answers from backend
        on('send_answers_to_judge', handleReceiveAnswers);

        // Cleanup listener on unmount
        return () => {
            off('send_answers_to_judge', handleReceiveAnswers);
        };
    }, [on, off]);

    return {
        answers,
        clearAnswers,
    };
};

export default useWaitAnswers;
