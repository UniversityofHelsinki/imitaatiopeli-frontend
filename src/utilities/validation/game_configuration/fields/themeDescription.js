import { isEmpty } from "../../common";

export const validateThemeDescription = (game, property, t) => {
    const themeDescription = game[property];

    if (isEmpty(themeDescription)) {
        return {
            isValid: false,
            message: t('theme_description_field_is_required')
        };
    }

    return {
        isValid: true
    };
};