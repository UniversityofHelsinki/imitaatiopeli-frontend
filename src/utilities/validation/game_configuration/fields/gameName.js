import { isEmpty } from "../../common";

export const validateGameName = (game, property) => {
  const gameName = game[property];

  if (isEmpty(gameName)) {
    return {
      isValid: false,
      message: 'game_name_field_is_required'
    };
  }

  return {
    isValid: true
  };
};