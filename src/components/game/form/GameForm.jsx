import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import './GameForm.css';
import PromptField from './PromptField';
import ThemeField from './ThemeField';
import { BottomRow } from './BottomRow';
import FormButtons from './FormButtons';
import NameField from "./NameField.jsx";
import LanguageField from "./LanguageField.jsx";
import Button from "../../misc/ds/Button.jsx";
import {useTranslation} from "react-i18next";
import InstructionsField from "./InstructionsField.jsx";
import ResearchField from "./ResearchField.jsx";
import ResearchDescriptionField from "./ResearchDescriptionField.jsx";
import LocationField from './LocationField.jsx';
import GenderField from "./GenderField.jsx";
import AgeField from "./AgeField.jsx";
import BackgroundInfoField from "./BackgroundInfoField.jsx";

const GameForm = ({
  game,
  saving,
  onChange,
  onSubmit,
  onReset,
  validations
}) => {
  const { t } = useTranslation();
  const textRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (onSubmit) {
      await onSubmit(event);
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    if (onReset) {
      onReset(event);
    }
  };

  return (
    <form
      className="form game-form"
      onSubmit={handleSubmit}
      onReset={handleReset}
      method="POST"
    >
      <div className="form-field game-form-field">
        <ThemeField
          value={game.configuration.theme_description}
          onChange={e => onChange('configuration', {
            ...game.configuration,
            theme_description: e.target.value
          })}
          disabled={saving}
          validation={validations?.configuration?.theme_description}
        />
      </div>
      <div className="form-field game-form-field">
        <NameField
            value={game.configuration.game_name}
            onChange={e => onChange('configuration', {
              ...game.configuration,
              game_name: e.target.value
            })}
            disabled={saving}
            validation={validations?.configuration?.game_name}
        />
      </div>
      <div className="form-field game-form-field">
        <LanguageField
            value={game.configuration.language}
            onChange={e => onChange('configuration', {
              ...game.configuration,
              language: e.target.value
            })}
            disabled={saving}
            validation={validations?.configuration?.language}
        />
      </div>
      <div className="form-field game-form-field">
        <PromptField
          value={game.configuration.ai_prompt}
          onChange={e => onChange('configuration', {
            ...game.configuration,
            ai_prompt: e.target.value
          })}
          disabled={saving}
          validation={validations?.configuration?.ai_prompt}
        />
      </div>
      <div className="form-field game-form-field">
          <Button type="submit" label={t('game_form_prompt_field_button')} />
      </div>
      <div className="form-field game-form-field">
        <InstructionsField
            value={game.configuration.instructions}
            onChange={e => onChange('configuration', {
              ...game.configuration,
              instructions: e.target.value
            })}
            disabled={saving}
            validation={validations?.configuration?.instructions}
        />
      </div>
      <div className="form-field game-form-field">
        <ResearchField
            value={game.configuration.isResearch}
            onChange={e => onChange('configuration',  {
              ...game.configuration,
              isResearch: e.target.value === true
            })}
            disabled={saving}
        />
      </div>
      <div className="form-field game-form-field">
        <ResearchDescriptionField
            value={game.configuration.research_description}
            onChange={e => onChange('configuration', {
              ...game.configuration,
                research_description: e.target.value
            })}
            disabled={saving}
            validation={validations?.configuration?.research_description}
        />
      </div>
      <div className="form-field-text-field">
            {t('game_players_background_info')}
      </div>
      <div className="game-form-field">
        <LocationField
          checked={game.is_habitation_mandatory}
          onChange={e => onChange('is_habitation_mandatory', e.target.checked)}
          disabled={saving}
        />
      </div>
      <div className="game-form-field">
        <GenderField
            checked={game.is_gender_mandatory}
            onChange={e => onChange('is_gender_mandatory', e.target.checked)}
            disabled={saving}
        />
      </div>
      <div className="game-form-field">
        <AgeField
            checked={game.is_age_mandatory}
            onChange={e => onChange('is_age_mandatory', e.target.checked)}
            disabled={saving}
        />
      </div>
      <div className="game-form-field">
        <BackgroundInfoField
            checked={game.is_background_info_mandatory}
            onChange={e => onChange('is_background_info_mandatory', e.target.checked)}
            disabled={saving}
        />
      </div>
      <div className="horizontal-divider"></div>
      <div className="game-form-bottom-row">
        <BottomRow saving={saving}>
          <FormButtons disabled={saving} />
        </BottomRow>
      </div>
    </form>
  );
};

GameForm.propTypes = {
  game: PropTypes.shape({
    configuration: PropTypes.shape({
      game_name: PropTypes.string,
      ai_prompt: PropTypes.string,
    }),
    researchPermission: PropTypes.bool
  }),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  saving: PropTypes.bool,
  validations: PropTypes.object,
};

export default GameForm;