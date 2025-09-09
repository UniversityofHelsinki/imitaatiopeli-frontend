import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import './AdminGameButtons.css';
import {useNavigate} from "react-router-dom";

const AdminGameButtons = ({ disabled, game }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleEndGameClick = () => {
        if (disabled) return;
        if (!game?.config_id) return;
        navigate(`/admin/games/${game.config_id}/end`);
    };

    return (
        <div className="admin-game-buttons-row">
            <Button type="button" label={t('admin_game_button_end_game')} variant="secondary" disabled={disabled}
                    onClick={handleEndGameClick}
            />
            <div className="margin"></div>
            <Button type="submit" label={t('admin_game_button_start_game')} disabled={disabled} />
        </div>
    );

};

AdminGameButtons.propTypes = {
    disabled: PropTypes.bool,
};

export default AdminGameButtons;