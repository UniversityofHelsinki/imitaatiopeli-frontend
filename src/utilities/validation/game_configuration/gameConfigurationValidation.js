import { validateGameName } from "./fields/gameName";
import { validatePrompt } from "./fields/prompt";
import validateObject from '../validation';
import {validateThemeDescription} from "./fields/themeDescription";
import {validateLanguage} from "./fields/language.js";
import {validateInstructions} from "./fields/Instructions.js";
import {validateResearchDescription} from "./fields/ResearchDescription.js";
const validate = async (configuration) => {

  const validations = {
    game_name: validateGameName,
    theme_description: validateThemeDescription,
    ai_prompt: validatePrompt,
    language: validateLanguage,
    instructions: validateInstructions,
    research_description: validateResearchDescription

  };

  return await validateObject(configuration, validations);

};

export default validate;