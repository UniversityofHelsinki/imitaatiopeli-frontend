import React, { useEffect, useState } from 'react';
import './StartGame.css';
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../Page';
import { useTranslation } from 'react-i18next';
import { get } from '../../../hooks/useHttp';
import useStartGame from '../../../hooks/useStartGame';
import StartGameForm from '../../game/form/StartGameForm';
import { useNotification } from '../../notification/NotificationContext.jsx';
import useStartGameValidation from '../../../hooks/useStartGameValidation';

const StartGame = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const start = useStartGame(id);
  const validate = useStartGameValidation(players);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gameResponse, playersResponse] = await Promise.all([
          get({
            path: `/api/game/${id}`,
            tag: `GAME_${id}`
          }),
          get({
            path: `/api/games/${id}/players`,
            tag: `GAME_PLAYERS_${id}`
          })
        ]);
        setGame({ ...gameResponse.body });
        setPlayers(playersResponse.body);
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotification(t('error_loading_data'), 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const startGame = async () => {
    await start();
    setNotification(t('start_game_page_success_notification'), 'success', true);
    navigate('/admin/games');
  };

  const isAlreadyStarted = game?.start_time;
  const validation = validate();

  const getPageContent = () => {
    if (isAlreadyStarted) {
      return (
          <div className="start-game-page-error">
            {t('start_game_page_already_started')}
          </div>
      );
    }

    if (!validation.isValid) {
      return (
          <div className="start-game-page-error">
            {validation.message}
          </div>
      );
    }

    return <StartGameForm game={game} startGame={startGame} />;
  };

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
        {getPageContent()}
      </Page>
  );
};

export default StartGame;