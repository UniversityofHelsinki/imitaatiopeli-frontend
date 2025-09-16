import React, { useEffect, useState } from 'react';
import './GameLobby.css';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { get, invalidate } from '../../../hooks/useHttp';
import localStorage from '../../../utilities/localStorage';
import Spinner from '../../misc/ds/Spinner.jsx';
import { useNotification } from '../../notification/NotificationContext.js';
import { useSocket } from '../../../contexts/SocketContext.jsx';
import PublicPage from './PublicPage.jsx';
import {useNavigate} from "react-router-dom";

const GameLobby = () => {
    const { isConnected, emit, on, off } = useSocket();
    const { code } = useParams();
    const { t } = useTranslation();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasJoined, setJoined] = useState(false);
    const [playerConfiguration, setPlayerConfiguration] = useState(null);
    const [joinedGame, setJoinedGame] = useState(null);
    const { setNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
    (async () => {
      const response = await get({
        path: `/public/games/${code}`,
        tag: `GAME_${code}`
      });
      setGame({ ...response.body });
      setLoading(false);
    // Test the websocket connection
    useEffect(() => {
        if (isConnected && game && game.configuration?.[0]?.game_name) {
            console.log('Socket.IO is ready to use!');
            emit('test-message', { message: `Hello ${game.configuration[0]?.game_name}!` });
        }
    }, [isConnected, emit, game]);



    // Listen for messages from backend
    useEffect(() => {
        const handleMessage = (data) => {
            console.log('message from backend:', data);
        };

        on('message', handleMessage);

        return () => {
            off('message', handleMessage);
        };
    }, [on, off]);


            const player = JSON.parse(localStorage.get("player"));
            const hasJoined = player?.game_id === response.body.game_id;
            setJoined(hasJoined);
            setPlayerConfiguration(response.body.configuration?.[0]);
        })();
    }, [code]);

    useEffect(() => {
        if (game && game.game_id) {
            const fetchGame = async () => {
                try {
                    const response = await get({
                        path: `/public/game/${game.game_id}`,
                        tag: `GAME_DATA_${game.game_id}`
                    });
                    setJoinedGame({ ...response.body });
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
                    fetchGame().then(schedule) // recursively reload game
                }, 15000);
            };
            schedule();
        }
    }, [game]);

    useEffect(() => {
        if (joinedGame?.end_time && game?.game_id) {
            navigate(`/games/${game.game_id}/end`);
        }
    }, [joinedGame?.end_time, game?.game_id, navigate]);

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
        <PublicPage className="page-heading"
                    loading={loading}
                    heading={playerConfiguration?.theme_description}
                    crumbs={crumbs}
                    configuration={playerConfiguration}
        >
            <div className="game-lobby-double-rule" />
            {hasJoined ? (<span>{t('game_lobby_player_joined')}</span>) : (<span>{t('game_lobby_player_not_joined')}</span>)}
            <br /><br />
            <div className="game-lobby-page-instructions">
                {playerConfiguration?.instructions_for_players}
            </div>
            <div>
                {joinedGame?.start_time == null
                    ? <Spinner text={t('spinner_awaiting_game_starting')} position="side" size="medium" /> :
                    <div className="game-lobby-font-size">{t('game_lobby_game_started')}</div>
                }
            </div>
        </PublicPage>
    )

};

GameLobby.propTypes = {
};

export default GameLobby;