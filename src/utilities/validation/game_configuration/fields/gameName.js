import {isEmpty, isTooLong} from "../../common";

export const validateGameName = (game, property) => {
  const gameName = game[property];


  if (isTooLong(gameName, 100)) {
    return {
      isValid: false,
      message: 'game_name_is_too_long'
    };
  }
  if (isEmpty(gameName)) {
    return {
      isValid: false,
      message: 'game_name_is_required'
    };
  }

  return {
    isValid: true
  };
};