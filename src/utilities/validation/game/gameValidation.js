import validateObject from '../validation';
import validateGameConfiguration from '../game_configuration/gameConfigurationValidation';

const validate = async (game, t) => {
  const validations = {
    configuration: () => validateGameConfiguration(game.configuration, t),
    canEdit: () => {
      if (game.playerCount > 0) {
        return {
            isValid: false,
          message: 'edit_game_player_joined_validation'
        };
      }
      return {
          isValid: true,
        message: null
      };
    }
  };

  return await validateObject(game, validations);
};

export default validate;