import validateObject from '../validation';
import validateGameConfiguration from '../game_configuration/gameConfigurationValidation';

const validate = async (game) => {

  const validations = {
    configuration: () => validateGameConfiguration(game.configuration)
  };

  return await validateObject(game, validations);

};

export default validate;