import { isEmpty } from "../../common";

export const validatePrompt = async (game, property, t) => {

  const prompt = game[property];

  if (isEmpty(prompt)) {
    return {
      isValid: false,
      message: t('game_validation_ai_prompt_is_empty'),
    };
  }

  return {
    isValid: true
  };

};