import React from 'react';
import PropTypes from 'prop-types';
import './EndGameForm.css'
import { useTranslation } from 'react-i18next';
import Button from '../../misc/ds/Button';
import { useNavigate } from 'react-router-dom';

const EndGameForm = ({ game, endGame }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  if (!game) {
    return <></>;
  }

  const handleEndGame = async (event) => {
    event.preventDefault();
    await endGame(game.game_id);
  };

  const goBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <form className="end-game-form">
      <Button label={t('end_game_form_back_button')} type="reset" variant="secondary" onClick={goBack} />
      <span className="margin" />
      <Button label={t('end_game_form_submit_button')} type="submit" onClick={handleEndGame} />
    </form>
  );

};

EndGameForm.propTypes = {
  game: PropTypes.object,
  endGame: PropTypes.func
};

export default EndGameForm;