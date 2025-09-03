import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GameLobby.css'
import { useParams } from 'react-router-dom';
import Page from '../Page';
import { useTranslation } from 'react-i18next';
import {get, invalidate, useGET} from '../../../hooks/useHttp';
import localStorage from '../../../utilities/localStorage';
import Spinner from "../../misc/ds/Spinner.jsx";
import {useNotification} from "../../notification/NotificationContext.js";

const GameLobby = () => {
  const { code } = useParams();
  const { t } = useTranslation();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasJoined, setJoined] = useState(false);
  const [playerConfiguration, setPlayerConfiguration] = useState(null);
  const [joinedGame, setJoindedGame] = useState(null);
  const { setNotification } = useNotification();

  useEffect(() => {
    (async () => {
      const response = await get({
        path: `/public/games/${code}`,
        tag: `GAME_${code}`
      });
      setGame({ ...response.body });
      setLoading(false);

      const player = JSON.parse(localStorage.get("player"));
      const hasJoined = player?.game_id === response.body.game_id;
      setJoined(hasJoined);
      setPlayerConfiguration(response.body.configuration[0]);

    })();
  }, []);

    useEffect(() => {
        if (game && game.game_id) {
            const fetchGame = async () => {
                try {
                    const response = await get({
                        path: `/public/game/${game.game_id}`,
                        tag: `GAME_DATA_${game.game_id}`
                    });
                    setJoindedGame({ ...response.body });
                    console.log("gameData:", response?.body.start_time);
                } catch (error) {
                    console.error('Error fetching game:', error);
                    setNotification(t('game_fetch_error'), 'error');
                } finally {
                    setLoading(false);
                }
            };

            const schedule = () => {
                setTimeout(() => {
                    invalidate([`GAME_DATA_${game?.game_id}`]);
                    fetchGame().then(schedule) // recursively reload players
                }, 5000);
            };
            schedule();
        }
    }, [game]);

  const crumbs = [
    {
      label: 'bread_crumb_home',
      href: '/'
    },
    {
      label: 'bread_crumb_games',
      href: '/games'
    },
    {
      label: 'bread_crumb_games_lobby',
      href: `/games/${code}`,
      current: true
    }
  ]

  return (
      <Page loading={loading} heading={t('game_lobby_heading')} crumbs={crumbs}>
        {hasJoined ? <span>{t('game_lobby_player_joined')}</span> : <span>{t('game_lobby_player_not_joined')}</span>}
        <br/>
        <br/>
        <div className="game-lobby-page-instructions">
          {playerConfiguration?.instructions_for_players}
        </div>
        <div>
            {joinedGame?.start_time == null
                ? <Spinner text={t('spinner_awaiting_game_starting')} position="side" size="medium" /> :
                <div>{t('game_lobby_game_started')}</div>
            }
        </div>

      </Page>
  )

};

GameLobby.propTypes = {
};

export default GameLobby;