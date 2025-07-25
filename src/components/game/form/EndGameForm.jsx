import React from 'react';
import PropTypes from 'prop-types';
import './EndGameForm.css'
import { useTranslation } from 'react-i18next';
import Button from '../../misc/ds/Button';

const EndGameForm = ({ game, endGame }) => {
  const { t } = useTranslation();
  
  if (!game) {
    return <></>;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await endGame(game.game_id);
  };

  return (
    <form className="start-game-form" onSubmit={onSubmit}>
      <Button label={t('end_game_form_submit_button')} type="submit" />
    </form>
  );

};

EndGameForm.propTypes = {
  game: PropTypes.object,
  endGame: PropTypes.func
};

export default EndGameForm;