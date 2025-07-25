import React from 'react';
import PropTypes from 'prop-types';
import './StartGameForm.css'
import Button from '../../misc/ds/Button';
import { useTranslation } from 'react-i18next';

const StartGameForm = ({ game, startGame }) => {
  const { t } = useTranslation();
  
  if (!game) {
    return <></>;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await startGame(game.game_id);
  };

  return (
    <form className="start-game-form" onSubmit={onSubmit}>
      <Button label={t('start_game_form_submit_button')} type="submit" />
    </form>
  );
};

StartGameForm.propTypes = {
  game: PropTypes.object,
  startGame: PropTypes.func,
};

export default StartGameForm;