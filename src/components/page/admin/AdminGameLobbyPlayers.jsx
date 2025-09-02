
import PropTypes from 'prop-types';
import React from 'react';
import usePlayer from '../../../hooks/usePlayer.js';
import './AdminGameLobbyPlayers.css';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../components/misc/ds/Spinner.jsx';

const AdminGameLobbyPlayers = ({ game }) => {
    const { t } = useTranslation();
    const [players= [], error, reload] = usePlayer(null, game.game_id);


    if (!players || error) {
        return (
            <div className="error-container">
                <span>{t('error_loading_data')}</span>
            </div>
        );
    }

    return (
        <div className="player-list-container">
            <h3>{t('lobby_players_heading')}</h3>
            {players.length === 0 ? (
                <Spinner text={t('spinner_awaiting_players')} position="side" size="medium" />
            ) : (
                <div>
                    <span className="player-count">{t('lobby_player_count')}: {players.length}</span>
                    <ul className="player-list">
                        {players.map(player => (
                            <li key={player.player_id} className="player-item margin">
                                <span className="player-nickname">{player.nickname}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

AdminGameLobbyPlayers.propTypes = {
    game: PropTypes.shape({
        game_id: PropTypes.number.isRequired,
    }).isRequired,
};

export default AdminGameLobbyPlayers;