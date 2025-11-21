import {isEmpty, isTooLong} from "../../common";

export const validateResearchDescription = (game, property) => {
    if (!game?.is_research_game) {
        return { isValid: true };
    }

    const researchDescription = game[property];

    if (isTooLong(researchDescription, 4000)) {
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