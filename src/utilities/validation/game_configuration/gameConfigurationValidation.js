import { validateGameName } from "./fields/gameName";
import { validatePrompt } from "./fields/prompt";
import validateObject from '../validation';
import {validateThemeDescription} from "./fields/themeDescription";

const validate = async (configuration, t) => {

  const validations = {
    game_name: validateGameName,
    theme_description: validateThemeDescription,
    ai_prompt: validatePrompt
  };

  return await validateObject(configuration, validations, t);

};

export default validate;