import {isEmpty, isTooLong} from "../../common";

export const validatePrompt = async (game, property) => {

  const prompt = game[property];


  if (isTooLong(prompt, 2000)) {
    return {
      isValid: false,
      message: 'game_ai_prompt_is_too_long'
    };
  }
  if (isEmpty(prompt)) {
    return {
      isValid: false,
      message: 'game_ai_prompt_is_required'
    };
  }

  return {
    isValid: true
  };

};