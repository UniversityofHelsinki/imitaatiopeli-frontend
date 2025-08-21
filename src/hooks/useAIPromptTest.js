import { useState, useCallback } from 'react';
import { usePOST } from './useHttp';

const useAIPromptTest = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const post = usePOST({
        path: '/api/testAIPrompt',
    });

    const testPrompt = useCallback(async (prompt, question) => {
        if (!prompt?.trim() || !question?.trim()) {
            setError('Both prompt and question are required');
            return null;
        }

        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const apiResponse = await post({
                prompt: prompt,
                question: question
            });

            if (apiResponse.status === 200) {
                const data = await apiResponse.json();
                setResponse(data);
                return data;
            } else if (apiResponse.status === 500) {
                const errorData = await apiResponse.json().catch(() => null);
                const errorMessage = errorData?.[0]?.message || 'Failed to test AI prompt';
                setError(errorMessage);
                return null;
            } else {
                const errorMessage = `HTTP ${apiResponse.status}: ${apiResponse.statusText}`;
                setError(errorMessage);
                return null;
            }
        } catch (err) {
            console.error('Error testing AI prompt:', err);
            setError(err.message || 'Network error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, [post]);

    const clearResults = useCallback(() => {
        setResponse(null);
        setError(null);
    }, []);

    const resetAll = useCallback(() => {
        setResponse(null);
        setError(null);
        setLoading(false);
    }, []);

    return {
        testPrompt,
        response,
        loading,
        error,
        clearResults,
        resetAll
    };
};

export default useAIPromptTest;
