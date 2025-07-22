import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { get } from '../../../hooks/useHttp';
import LoadingPage from '../../misc/LoadingPage';
import './EditGameForm.css';
import GameForm from './GameForm';
import useEditGame from '../../../hooks/useEditGame';
import { useNotification } from '../../notification/NotificationContext';
import validate from '../../../utilities/validation/game/gameValidation';

const EditGameForm = () => {
  const { id: gameId } = useParams();
  const { t } = useTranslation();
  const save = useEditGame(gameId);
  const { setNotification } = useNotification();

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [modifiedGame, setModifiedGame] = useState(null)
  const [saving, setSaving] = useState(false);

  const [validations, setValidations] = useState({});
  
  useEffect(() => {
    (async () => {
      const response = await get({ 
        path: `/api/game/${gameId}`, 
        tag: `GAME_${gameId}` 
      });
      setGame({ ...response.body });
      setModifiedGame({ ...response.body });
      setLoading(false);
    })();
  }, []);
  
  const onChange = async (key, value) => {
    const changed = {
      ...modifiedGame,
      [key]: value
    };
    setValidations(await validate(changed))
    setModifiedGame(changed);
  };

  const onReset = async () => {
    setModifiedGame({ ...game });
    setValidations(await validate({ ...game }))
  };

  const onSubmit = async () => {
    try {
      setSaving(true);
      const saved = await save(modifiedGame);
      setNotification(t('edit_game_form_game_saved_notification'), 'success', true);
    } catch (error) {
      setNotification(error?.cause.status, 'error');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <LoadingPage>
        <span>{t('edit_game_form_loading_game')}</span>
      </LoadingPage>
    );
  }

  return (
    <div className="edit-game-form">
      <h2>{t('edit_game_form_heading')}</h2>
      <p className="edit-game-form-details">
        {t('edit_game_form_details_game_code', { game_code: modifiedGame.game_code})}
      </p>
      <GameForm 
        game={modifiedGame} 
        onChange={onChange} 
        onReset={onReset} 
        onSubmit={onSubmit} 
        saving={saving}
        validations={validations}
      />
    </div>
  );
};

EditGameForm.propTypes = {
};

export default EditGameForm;