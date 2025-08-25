import { isEmpty } from "../../common";

export const validateLanguageModelUrl = async (game, property) => {
    const languageModelUrl = game[property];

    if (isEmpty(languageModelUrl)) {
        return {
            isValid: false,
            message: 'game_validation_language_model_url_is_required'
        };
    }

    return {
        isValid: true
    };
};
