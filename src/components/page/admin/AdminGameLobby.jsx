import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AdminGameLobby.css'
import { useParams } from 'react-router-dom';
import Page from '../Page';
import { useTranslation } from 'react-i18next';
import { get } from '../../../hooks/useHttp';
import AdminGameLobbyPlayers from './AdminGameLobbyPlayers';
import {useNotification} from "../../notification/NotificationContext.js";
import BottomRow from "../../game/form/BottomRow.jsx";
import AdminGameButtons from "./AdminGameButtons.jsx";

const AdminGameLobby = () => {
    const { id: gameId } = useParams();
    const { t } = useTranslation();
    const { setNotification } = useNotification();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchGame = async () => {
        try {
            const response = await get({
                path: `/api/games/${gameId}/lobby`,
                tag: `GAME_${gameId}`
            });
            setGame({ ...response.body });
        } catch (error) {
            console.error('Error fetching game:', error);
            setNotification(t('game_fetch_error'), 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGame();
    }, []);

    const crumbs = [
        {
            label: 'bread_crumb_games',
            href: '/admin/games'
        },
        {
            label: 'bread_crumb_games_lobby',
            href: `/admin/games/${gameId}/lobby`,
            current: true
        }
    ];

    return (
        <Page loading={loading} heading={t('admin_game_lobby_heading')} crumbs={crumbs}>
            {game ? (
                <div className="admin-game-lobby-details-container">
                        <div className="admin-game-details">
                            <p>
                                <strong>{t('admin_game_lobby_details_join_link')}: </strong>
                                {game.game_code || t('no_code')}
                            </p>
                            <p>
                                <strong>{t('admin_game_lobby_details_name')}: </strong>
                                {game.configuration?.game_name || t('no_name')}
                            </p>
                            <p>
                                <strong>{t('admin_game_lobby_details_theme')}: </strong>
                                {game.configuration?.theme_description || t('no_theme')}
                            </p>
                        </div>
                    <div className="admin-game-lobby-players-container">
                        <AdminGameLobbyPlayers game={game} onPlayerUpdate={fetchGame} />
                    </div>
                    <div className="game-form-bottom-row">
                        <BottomRow saving={null}>
                            <AdminGameButtons disabled={null} />
                        </BottomRow>
                    </div>
                </div>
            ) : (
                <div className="admin-game-lobby-no-game-data">
                    {t('admin_game_lobby_no_game_data')}
                </div>
            )}
        </Page>
    );
};

export default AdminGameLobby;
