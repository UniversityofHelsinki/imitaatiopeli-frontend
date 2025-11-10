import { useState, useEffect, useCallback } from 'react';

const LOCAL_STORAGE_KEY = 'judgeQuestion';

const useJudgeAskedQuestion = () => {
    // Initialize from localStorage or default to null
    const [question, setQuestion] = useState(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    });

    // Save to localStorage whenever it changes
    useEffect(() => {
        if (question !== null) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(question));
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
    }, [question]);

    const setAskedQuestion = useCallback((value) => {
        setQuestion(value);
    }, []);

    return [question, setAskedQuestion];
};

export default useJudgeAskedQuestion;
