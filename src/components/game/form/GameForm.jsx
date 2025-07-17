import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from '../../misc/ds/Spinner';
import './GameForm.css';
import GameFormButtons from './GameFormButtons';
import PromptField from './PromptField';
import ResearchPermissionField from './ResearchPermissionField';
import ThemeField from './ThemeField';

const BottomRow = ({ saving, disabled }) => {
  const { t } = useTranslation();

  const content = (() => {
    if (saving) {
      return <Spinner
        position="side"
        size="large"
        text={t('game_form_bottom_row_saving')}
      />;
    }
    return <></>;
  })();

  return <>
    <div className="game-form-bottom-row-state-text">{content}</div>
    <GameFormButtons disabled={disabled} />
  </>
};

BottomRow.propTypes = {
  saving: PropTypes.bool,
  disabled: PropTypes.bool,
};

const GameForm = ({
  game,
  saving,
  onChange,
  onSubmit,
  onReset,
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
          value={game.configuration.game_name}
          onChange={e => onChange('configuration', { 
            ...game.configuration, 
            game_name: e.target.value
          })}
          disabled={saving}
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
      <div className="form-bottom-row game-form-bottom-row">
        <BottomRow
          saving={saving}
          disabled={saving}
        />
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
};

export default GameForm;