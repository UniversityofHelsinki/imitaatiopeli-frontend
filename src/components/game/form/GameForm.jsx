import PropTypes from 'prop-types';
import React from 'react';
import './GameForm.css';
import PromptField from './PromptField';
import ResearchPermissionField from './ResearchPermissionField';
import ThemeField from './ThemeField';
import { BottomRow } from './BottomRow';
import FormButtons from './FormButtons';
import NameField from "./NameField.jsx";

const GameForm = ({
  game,
  saving,
  onChange,
  onSubmit,
  onReset,
  validations
}) => {

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
        <ResearchPermissionField
          checked={game.researchPermission}
          onChange={e => onChange('researchPermission', e.target.checked)}
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