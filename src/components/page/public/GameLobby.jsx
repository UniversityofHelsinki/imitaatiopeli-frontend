
import React, { useEffect, useState } from 'react';
import './GameLobby.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { get } from '../../../hooks/useHttp';
import localStorage from '../../../utilities/localStorage';
import Spinner from '../../misc/ds/Spinner.jsx';
import { useNotification } from '../../notification/NotificationContext.jsx';
import { useSocket } from '../../../contexts/SocketContext.jsx';
import PublicPage from './PublicPage.jsx';

const GameLobby = () => {
    const { isConnected, emit, on, off } = useSocket();
    const { code } = useParams();
    const { t } = useTranslation();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasJoined, setJoined] = useState(false);
    const [playerConfiguration, setPlayerConfiguration] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const { setNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        const joinGameIfReady = async () => {
            const localPlayer = localStorage.get("player");

            if (isConnected && game && localPlayer?.player_id) {
                try {
                    const playerResponse = await get({
                        path: `/public/getPlayerById/${localPlayer.player_id}`,
                        tag: `PLAYER_${localPlayer.player_id}`
                    });

                    const playerFromBackend = playerResponse.body;

                    const canJoinGame = game?.game_id &&
                        playerFromBackend?.player_id === localPlayer?.player_id &&
                        playerFromBackend?.gameId === game?.game_id;

                    if (canJoinGame) {
                        emit('join-game', {
                            userId: playerFromBackend.player_id,
                            gameId: game.game_id,
                            nickname: playerFromBackend.nickname
                        });
                    }
                } catch (error) {
                    console.error('Error fetching player from backend:', error);
                }
            }
        };

        joinGameIfReady();
    }, [isConnected, emit, game]);

    // Listen for game-started event from Socket.IO
    useEffect(() => {
        const handleGameStarted = (data) => {
            const { gameId, message } = data;
            console.log('Game started event received:', data);
            console.log('Current game ID:', game?.game_id);

            const socketGameId = String(gameId);
            const currentGameId = String(game?.game_id);

            if (socketGameId === currentGameId) {
                setGameStarted(true);
                setNotification(message || t('game_started_notification'), 'success', true);
                navigate(`/games/${gameId}/play`);
            }
        };

        const handleMessage = (data) => {
            console.log('Message from backend:', data);
        };

        // Listen for socket events
        on('game-started', handleGameStarted);
        on('message', handleMessage);

        return () => {
            off('game-started', handleGameStarted);
            off('message', handleMessage);
        };
    }, [on, off, game?.game_id, setNotification, t]);

    useEffect(() => {
        (async () => {
            try {
                const gameResponse = await get({
                    path: `/public/games/${code}`,
                    tag: `GAME_${code}`
                });

                setGame({ ...gameResponse.body });
                setPlayerConfiguration(gameResponse.body.configuration?.[0]);

                const localPlayer = localStorage.get("player");

                if (localPlayer?.player_id) {
                    const playerResponse = await get({
                        path: `/public/getPlayerById/${localPlayer.player_id}`,
                        tag: `PLAYER_${localPlayer.player_id}`
                    });
                    const hasJoined = playerResponse.body?.gameId === gameResponse.body.game_id;
                    setJoined(hasJoined);

                    // Check if game is already started
                    if (gameResponse.body.start_time) {
                        setGameStarted(true);
                    }
                } else {
                    console.log("No player found in localStorage");
                    setJoined(false);
                }

                setLoading(false);

            } catch (error) {
                console.error('Error loading game/player:', error);
                setLoading(false);
            }
        })();
    }, [code]);

    // Handle navigation when game ends (keep this if needed)
    useEffect(() => {
        const checkGameEnd = async () => {
            if (game?.game_id) {
                try {
                    const response = await get({
                        path: `/public/game/${game.game_id}`,
                        tag: `GAME_DATA_${game.game_id}`
                    });

                    if (response.body?.end_time) {
                        navigate(`/games/${game.game_id}/end`);
                    }
                } catch (error) {
                    console.error('Error checking game end:', error);
                }
            }
        };

        // Only check for game end occasionally, not every 15 seconds
        if (gameStarted && game?.game_id) {
            const interval = setInterval(checkGameEnd, 30000); // Check every 30 seconds
            return () => clearInterval(interval);
        }
    }, [gameStarted, game?.game_id, navigate]);

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
                {!gameStarted
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
