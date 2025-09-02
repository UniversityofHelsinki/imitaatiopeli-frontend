import {isEmpty, isTooLong} from "../../common";

export const validateThemeDescription = (game, property) => {
    const themeDescription = game[property];


    if (isTooLong(themeDescription, 255)) {
        return {
            isValid: false,
            message: 'game_theme_description_is_too_long'
        };
    }
    if (isEmpty(themeDescription)) {
        return {
            isValid: false,
            message: 'game_theme_description_is_required'
        }
    }

    return {
        isValid: true
    };
};