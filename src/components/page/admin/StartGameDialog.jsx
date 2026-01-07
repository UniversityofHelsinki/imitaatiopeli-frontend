import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './StartGameDialog.css'
import Button from '../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import ConfirmModalDialog from '../../../utilities/ConfirmModalDialog';
import { useSocket } from '../../../contexts/SocketContext';
import useStartGame from '../../../hooks/useStartGame';
import { useNotification } from '../../notification/NotificationContext';
import { useNavigate } from 'react-router-dom';

const StartGameDialog = ({ game, validation }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { isConnected, emit } = useSocket();
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const start = useStartGame(game);

  const startGame = async () => {
    if (isConnected && game) {
      emit('start-game', {
        gameId: game,
      });
      await start();
      setNotification(t('start_game_page_success_notification'), 'success', true);
      navigate(`/admin/games/${game}/monitor`);
    }
  };

  const showError = () => {
    setNotification(validation.message, 'error', true);
    setOpen(false);
  };

  const dialog = () => {
    return (
      <div className="confirm-dialog-container" id="start-game-dialog-container" aria-live="assertive">
        <ConfirmModalDialog
          id="start-game-dialog"
          open={open}
          message={t('game_confirm_start_game')}
          confirmLabel={t('game_confirm_start_confirm')}
          cancelLabel={t('game_confirm_start_cancel')}
          onCancel={() => setOpen(false)}
          onConfirm={validation.isValid ? startGame : showError}
        />
      </div>
    );
  };

  return (
    <div>
      <Button 
        icon="play_arrow" 
        label={t('admin_game_button_start_game')}
        variant="secondary"
        onClick={() => setOpen(true)}
      />
      {dialog()}
    </div>
  );

};

StartGameDialog.propTypes = {
  game: PropTypes.string,
  validation: PropTypes.object,
};

export default StartGameDialog;