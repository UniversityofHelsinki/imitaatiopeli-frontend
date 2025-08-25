import { isEmpty } from "../../common";

export const validateInstructions = async (game, property) => {

    const instructions = game[property];

    if (isEmpty(instructions)) {
        return {
            isValid: false,
            message: 'game_validation_instructions_is_required'
        };
    }

    return {
        isValid: true
    };

};