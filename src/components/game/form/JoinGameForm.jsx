import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JoinGameForm.css'
import NickNameField from './NickNameField';
import { useTranslation } from 'react-i18next';
import useJoinGame from '../../../hooks/useJoinGame';
import BottomRow from './BottomRow';
import FormButtons from './FormButtons';
import localStorage from '../../../utilities/localStorage';
import { useNavigate } from 'react-router-dom';
import ResearchPermissionForm from './ResearchPermissionForm';

const emptyJoining = {
  nickname: '',
};

const JoinGameForm = ({ game }) => {
  const { t } = useTranslation();

  const [player, setPlayer] = useState(emptyJoining);
  const join = useJoinGame(game);
  const [saving, setSaving] = useState(false);
  const [phase, setPhase] = useState('nickname');
  const navigate = useNavigate();

  const onChange = (key, value) => {
    setPlayer({ ...player, [key]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const researchPermissionRequired = phase === 'nickname' && game.configuration[0].is_research_game;
    if (researchPermissionRequired) {
      setPhase('research-permission');
      return;
    }
    setSaving(true);
    const response = await join({ ...player, code: game.game_code });
    localStorage.set("player", JSON.stringify(await response.json()));
    setSaving(false);
    navigate(`/games/${game.game_code}`);
  };

  const handleReset = (event) => {
    event.preventDefault();
  };

  const basicForm = (
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

  const form = (() => {
    if (phase === 'research-permission') {
      return <ResearchPermissionForm
        game={game}
        onSubmit={handleSubmit}
        saving={saving}
        configuration={game.configuration[0]}
      />
    }
    return basicForm;
  })();

  return form;

};

JoinGameForm.propTypes = {
  game: PropTypes.object,
};

export default JoinGameForm;
