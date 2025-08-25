import { isEmpty } from "../../common";

export const validatePrompt = async (game, property) => {

  const prompt = game[property];

  if (isEmpty(prompt)) {
    return {
      isValid: false,
      message: 'game_validation_ai_prompt_is_required'
    };
  }

  return {
    isValid: true
  };

};