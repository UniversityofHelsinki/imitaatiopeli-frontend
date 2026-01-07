import { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { get } from './useHttp';

export const useWaitEndJudging = () => {
    const { on, off, isConnected } = useSocket();
    const [judgingEnded, setJudgingEnded] = useState(false);

    useEffect(() => {
        const handleNoMoreAnswers = () => {
            setJudgingEnded(true);
        };

        // De-dup any previous handlers and (re)attach on connect/reconnect
        off('no-more-answers', handleNoMoreAnswers);
        on('no-more-answers', handleNoMoreAnswers);

        return () => {
            off('no-more-answers', handleNoMoreAnswers);
        };
    }, [on, off, isConnected]);

    return judgingEnded;
};

const useEndJudging = () => {
    const { isConnected, emit, on, off } = useSocket();

    const storageKey = 'judging-summary';
    const [questions, setQuestions] = useState(() => {
        try {
            return localStorage.get(storageKey) || null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        const handleSummary = (response) => {
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

                const answer = { ...o };
                delete answer.question_created;
                delete answer.question_text;
                delete answer.quess_id;

                questions[o.question_id].answers.push(answer);
                questions[o.question_id].answers.sort(a => a.is_pretender ? 1 : -1);
                questions[o.question_id].selectedAnswer = questions[o.question_id].answers.findIndex(a => a.guess_created);
            });

            setQuestions(questions);
            try {
                localStorage.set(storageKey, questions);
            } catch {
                // ignore storage errors
            }
        };

        // De-dup and attach
        off('judging-summary', handleSummary);
        on('judging-summary', handleSummary);

        return () => {
            off('judging-summary', handleSummary);
        };
    }, [isConnected, on, off, storageKey]);

    const endJudging = async (game, rating) => {
        await get({ path: '/public/judge/ready-for-final-review' });
        if (!isConnected) {
            console.warn('Socket not connected; skipping end-judging emit');
            return;
        }
        emit('end-judging', { game, rating });
    };

    return {
        endJudging,
        questions,
    };
};

export default useEndJudging;