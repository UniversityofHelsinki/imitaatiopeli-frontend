import { isNull } from '../../common';

export const validateLanguageModel = async (game, property) => {
    const languageModel = game[property];

    if (isNull(languageModel)) {
        return {
            isValid: false,
            message: 'game_validation_language_model_is_required'
        };
    }

    return {
        isValid: true
    };
};
