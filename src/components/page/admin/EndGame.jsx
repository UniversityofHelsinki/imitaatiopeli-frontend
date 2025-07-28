import React, { useEffect, useState } from 'react';
import EndGameForm from '../../game/form/EndGameForm';
import Page from '../Page';
import './EndGame.css';
import useEndGame from '../../../hooks/useEndGame';
import { useNotification } from '../../notification/NotificationContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { get } from '../../../hooks/useHttp';

const EndGame = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const end = useEndGame(id);
  
  useEffect(() => {
    (async () => {
      const response = await get({
        path: `/api/game/${id}`,
        tag: `GAME_${id}`
      });
      setGame({ ...response.body });
      setLoading(false);
    })();
  }, []);
  
  const endGame = async () => {
    await end();
    setNotification(t('end_game_page_success_notification'), 'success', true);
    navigate('/admin/games');
  };

  const isAlreadyEnded = game?.end_time;
  const alreadyEnded = (
    <div className="start-game-page-already-started">
      peli on jo lopetettu
    </div>
  );

  return (
    <Page loading={loading} heading={t('end_game_page_heading')}>
      {isAlreadyEnded 
        && alreadyEnded 
        || <EndGameForm game={game} endGame={endGame} />}
    </Page>
  );
};

EndGame.propTypes = {
};

export default EndGame;