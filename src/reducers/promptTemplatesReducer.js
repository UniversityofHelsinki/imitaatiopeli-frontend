const initialState = {
    promptTemplates: [],
    promptTemplatesLoading: false,
    promptTemplatesError: null,
    promptTemplatesLoaded: false
};

const promptTemplatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ALL_PROMPT_TEMPLATES_REQUEST':
            return {
                ...state,
                promptTemplatesLoading: true,
                promptTemplatesError: null
            };

        case 'FETCH_ALL_PROMPT_TEMPLATES_SUCCESS':
            return {
                ...state,
                promptTemplatesLoading: false,
                promptTemplates: action.payload,
                promptTemplatesLoaded: true,
                promptTemplatesError: null
            };

        case 'FETCH_ALL_PROMPT_TEMPLATES_FAILURE':
            return {
                ...state,
                promptTemplatesLoading: false,
                promptTemplatesError: action.payload,
                promptTemplatesLoaded: false
            };

        default:
            return state;
    }
};

export default promptTemplatesReducer;