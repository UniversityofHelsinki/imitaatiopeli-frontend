import PropTypes from 'prop-types';
import React from 'react';
import usePlayer from '../../../hooks/usePlayer.js';
import './AdminGameLobbyPlayers.css';
import { useTranslation } from 'react-i18next';

const AdminGameLobbyPlayers = ({ game}) => {
    const { t } = useTranslation();
    const [players, error, reload] = usePlayer(null, game.id);

    if (!players) {
        return <div>{t('loading_players')}</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <span>{t('error_loading__players')}</span>
            </div>
        );
    }

    return (
        <div className="player-list-container">
            <h3>{t('lobby_players_heading')}</h3>
            {players.length === 0 ? (
                <p className="no-players-message">{t('no_players')}</p>
            ) : (
                <ul className="player-list">
                    {players.map(player => (
                        <li key={player.id} className="player-item">
                            <span className="player-nickname">{player.nickname}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

AdminGameLobbyPlayers.propTypes = {
    game: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default AdminGameLobbyPlayers;