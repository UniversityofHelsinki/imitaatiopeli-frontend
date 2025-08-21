import validateObject from '../validation';
import validateGameConfiguration from '../game_configuration/gameConfigurationValidation';

const validate = async (game, t) => {

  const validations = {
    configuration: () => validateGameConfiguration(game.configuration, t)
  };

  return await validateObject(game, validations);

};

export default validate;