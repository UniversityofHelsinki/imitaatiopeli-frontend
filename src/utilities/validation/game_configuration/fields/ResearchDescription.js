import { isEmpty } from "../../common";

export const validateResearchDescription = (game, property) => {
    const researchDescription = game[property];

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