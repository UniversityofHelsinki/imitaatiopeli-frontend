import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CreateGameForm.css';
import GameForm from './GameForm';
import { useNotification } from '../../notification/NotificationContext';
import useSaveGameConfiguration from '../../../hooks/useSaveGameConfiguration';
import { useNavigate } from 'react-router-dom';

const emptyGame = {
  configuration: {
    ai_prompt: '',
    game_name: '',
  },
  researchPermission: false,
};

const CreateGameForm = () => {
  const { t } = useTranslation();
  const [game, setGame] = useState(emptyGame);
  const save = useSaveGameConfiguration();
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const [disabled, setDisabled] = useState(false);
  const [saving, setSaving] = useState(false);

  const onChange = (key, value) => {
    setGame({
      ...game,
      [key]: value
    });
  };

  const onReset = () => {
    setGame({ ...emptyGame });
  };

  const onSubmit = async () => {
    setSaving(true);
    setDisabled(true);
    try {
      const saved = await save(game);
      navigate(`/admin/game/${saved.game_id}`);
      setNotification(t('create_game_form_game_created_notification'), 'success', true);
    } catch (error) {
      setNotification(error.cause?.status, 'error');
    }
    setDisabled(false);
    setSaving(false);
  };

  return (
    <div className="create-game-form">
      <h2>{t('create_game_form_heading')}</h2>
      <GameForm
        game={game}
        onChange={onChange}
        onReset={onReset}
        onSubmit={onSubmit}
        saving={saving}
      />
    </div>
  );
};

CreateGameForm.propTypes = {
};

export default CreateGameForm;