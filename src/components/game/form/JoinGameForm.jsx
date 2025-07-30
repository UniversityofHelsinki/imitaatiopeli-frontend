import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JoinGameForm.css'
import NickNameField from './NickNameField';
import Button from '../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import useJoinGame from '../../../hooks/useJoinGame';
import BottomRow from './BottomRow';
import FormButtons from './FormButtons';

const emptyJoining = {
  nickname: '',
};

const JoinGameForm = ({ game }) => {
  const { t } = useTranslation();

  const [player, setPlayer] = useState(emptyJoining);
  const join = useJoinGame(game);
  const [saving, setSaving] = useState(false);

  const onChange = (key, value) => {
    setPlayer({ ...player, [key]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    await join({ ...player, code: game.game_code });
    setSaving(false);
  };

  const handleReset = (event) => {
    event.preventDefault();
  };

  return (
    <form className="form join-game-form" onSubmit={handleSubmit} onReset={handleReset}>
      <div className="form-field join-game-form-field">
        <NickNameField 
          value={player.nickname} 
          disabled={saving}
          onChange={(value) => onChange('nickname', value)}
          validation={undefined} 
        />
      </div>
      <div className="horizontal-divider"></div>
      <div className="join-game-form-bottom-row">
        <BottomRow saving={saving}>
          <FormButtons disabled={saving} />
        </BottomRow>
      </div>
    </form>
  );

};

JoinGameForm.propTypes = {
};

export default JoinGameForm;