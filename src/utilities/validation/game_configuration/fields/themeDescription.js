import { isEmpty } from "../../common";

export const validateThemeDescription = (game, property) => {
    const themeDescription = game[property];

    if (isEmpty(themeDescription)) {
        return {
            isValid: false,
            message: 'theme_description_field_is_required'
        };
    }

    return {
        isValid: true
    };
};