import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './StartGame.css'
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../Page';
import { useTranslation } from 'react-i18next';
import { get } from '../../../hooks/useHttp';
import useStartGame from '../../../hooks/useStartGame';
import StartGameForm from '../../game/form/StartGameForm';
import { useNotification } from '../../notification/NotificationContext';

const StartGame = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const start = useStartGame(id);
  
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
  
  const startGame = async () => {
    await start();
    setNotification(t('start_game_page_success_notification'), 'success', true);
    navigate('/admin/games');
  };

  const isAlreadyStarted = game?.start_time;
  const alreadyStarted = (
    <div className="start-game-page-already-started">
      {t('start_game_page_already_started')}
    </div>
  );

  const crumbs = [
    {
      label: 'bread_crumb_home',
      href: '/'
    },
    {
      label: 'bread_crumb_admin',
      href: '/admin/',
    },
    {
      label: 'bread_crumb_admin_games',
      href: '/admin/games/'
    },
    {
      label: 'bread_crumb_admin_games_start',
      href: `/admin/games/start/${id}`,
      current: true
    }
  ];

  return (
    <Page loading={loading} heading={t('start_game_page_heading')} crumbs={crumbs}>
      {isAlreadyStarted 
        && alreadyStarted 
        || <StartGameForm game={game} startGame={startGame} />}
    </Page>
  );
};

StartGame.propTypes = {
};

export default StartGame;