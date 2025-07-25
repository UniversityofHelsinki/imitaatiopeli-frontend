import { validateGameName } from "./fields/gameName";
import { validatePrompt } from "./fields/prompt";
import validateObject from '../validation';


const validate = async (configuration) => {

  const validations = {
    game_name: validateGameName,
    ai_prompt: validatePrompt
  };

  return await validateObject(configuration, validations);

};

export default validate;