import {isEmpty, isTooLong} from "../../common";

export const validateInstructions = async (game, property) => {

    const instructions = game[property];

    if (isTooLong(instructions, 2000)) {
        return {
            isValid: false,
            message: 'game_instructions_is_too_long'
        };
    }
    if (isEmpty(instructions)) {
        return {
            isValid: false,
            message: 'game_instructions_is_required'
        };
    }

    return {
        isValid: true
    };

};