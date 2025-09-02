import { useGET } from './useHttp';

const useLanguageModels = () => {
    const [response, error, reload] = useGET({
        path: `/api/languageModels`,
        tag: `LANGUAGE_MODELS`,
    });

    return {
        models: response || [], // Use response instead of undefined models
        loading: !response && !error, // Calculate loading state
        error,
        reload
    };
};

export default useLanguageModels;
