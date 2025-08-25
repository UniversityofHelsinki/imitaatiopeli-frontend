import {isEmpty, isTooLong} from "../../common";

export const validateResearchDescription = (game, property) => {
    const researchDescription = game[property];

    if (isTooLong(researchDescription, 2000)) {
        return {
            isValid: false,
            message: 'game_research_description_is_too_long'
        };
    }
    if (isEmpty(researchDescription)) {
        return {
            isValid: false,
            message: 'game_research_description_is_required'
        };
    }

    return {
        isValid: true
    };
};