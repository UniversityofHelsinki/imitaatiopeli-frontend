import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const usePromptTemplates = (languageCode = null) => {
    const dispatch = useDispatch();
    const baseUrl = import.meta.env.VITE_APP_IMITATION_BACKEND_SERVER || '';

    const { promptTemplates, loading, error, loaded } = useSelector(
        state => state.promptTemplates
    );

    const fetchAllPromptTemplates = async () => {
        dispatch({ type: 'FETCH_ALL_PROMPT_TEMPLATES_REQUEST' });

        try {
            const response = await fetch(`${baseUrl}/api/promptTemplates`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to fetch prompt templates');
            }

            const promptTemplateArray = Array.isArray(data) ? data : data.promptTemplates || data.data || [];

            dispatch({
                type: 'FETCH_ALL_PROMPT_TEMPLATES_SUCCESS',
                payload: promptTemplateArray
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_ALL_PROMPT_TEMPLATES_FAILURE',
                payload: error.message
            });
        }
    };

    useEffect(() => {
        if (!loaded && !loading) {
            fetchAllPromptTemplates();
        }
    }, [loaded, loading]);

    const currentLanguageSuffix = languageCode && Array.isArray(promptTemplates)
        ? promptTemplates.find(template => template.language_code === languageCode)
        : null;

    return {
        promptTemplates,
        currentLanguageSuffix,
        loading,
        error,
        loaded,
        fetchAllPromptTemplates
    };
};

export default usePromptTemplates;