
import React, { useEffect, useState } from 'react';
import './GameLobby.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { get } from '../../../hooks/useHttp';
import localStorage from '../../../utilities/localStorage';
import Spinner from '../../misc/ds/Spinner.jsx';
import { useSocket } from '../../../contexts/SocketContext.jsx';
import PublicPage from './PublicPage.jsx';

const GameLobby = () => {
    const { isConnected, on, off } = useSocket();
    const { code } = useParams();
    const { t } = useTranslation();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasJoined, setJoined] = useState(undefined);
    const [playerConfiguration, setPlayerConfiguration] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const navigate = useNavigate();

    console.log(isConnected);
    console.log(on);
    console.log(off);

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
    }, [on, off, isConnected, game]);

    useEffect(() => {
        (async () => {
            try {
                const gameResponse = await get({
                    path: `/public/games/${code}`,
                    tag: `GAME_${code}`
                });

                setGame({ ...gameResponse.body });
                setPlayerConfiguration(gameResponse.body?.configuration?.[0]);

                const localPlayer = localStorage.get("player");

                if (localPlayer?.player_id) {
                    const playerResponse = await get({
                        path: `/public/getPlayerById/${localPlayer.player_id}`,
                        tag: `PLAYER_${localPlayer.player_id}`
                    });
                    if (playerResponse?.body == undefined || gameResponse?.body == undefined) {
                        setJoined(false);
                    } else {
                        const hasJoined = playerResponse.body.gameId === gameResponse.body.game_id;
                        setJoined(hasJoined);
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
    }, [game]);

    useEffect(() => {
        if (!game || hasJoined === undefined) return; // wait until game is set
        const notStarted = game.start_time == null; // true for null or undefined
        const notEnded = game.end_time == null;

        if (!hasJoined && notStarted && notEnded) {
            navigate(`/games/${code}/join`, { replace: true });
        }
    }, [hasJoined, game, navigate]);

    return (
        <PublicPage className="page-heading"
            loading={loading}
            heading={playerConfiguration?.theme_description}
            configuration={playerConfiguration}
        >
            <div className="game-lobby-double-rule" />
                {hasJoined ? (<span>{t('game_lobby_player_joined')}</span>) : (<span>{t('game_lobby_player_not_joined')}</span>)}
            <div className="medium-margin"></div>
            <div className="game-lobby-page-instructions">
                {playerConfiguration?.instructions_for_players}
            </div>
            <div>
                {!gameStarted && (
                    <Spinner text={t('spinner_awaiting_game_starting')} position="side" size="medium" />
                )}
            </div>
        </PublicPage>
    )
};

GameLobby.propTypes = {
};

export default GameLobby;
