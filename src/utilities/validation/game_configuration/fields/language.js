import { isEmpty } from "../../common";

export const validateLanguage = (game, property) => {
    const gameLanguage = game[property];

    if (isEmpty(gameLanguage)) {
        return {
            isValid: false,
            message: 'game_language_not_selected'
        };
    }

    return {
        isValid: true
    };
};