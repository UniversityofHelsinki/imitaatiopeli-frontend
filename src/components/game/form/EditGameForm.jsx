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

const EditGameForm = ({ 
  game,
  saveGame 
}) => {
  const { t } = useTranslation();
  const { setNotification } = useNotification();
  const [modifiedGame, setModifiedGame] = useState(null);
  const [saving, setSaving] = useState(false);

  const [validations, setValidations] = useState({});
  
  useEffect(() => {
    const newGame = { ...game };
    setModifiedGame(newGame);
    (async () => {
      setValidations(await validate(newGame));
    })();
  }, [game]);

  if (!modifiedGame) {
    return <></>;
  }

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
      await saveGame(modifiedGame);
      setNotification(t('edit_game_form_game_saved_notification'), 'success', true);
    } catch (error) {
      setNotification(error?.cause.status, 'error');
    }
    setSaving(false);
  };

  return (
    <div className="edit-game-form">
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