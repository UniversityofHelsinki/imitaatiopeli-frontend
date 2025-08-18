import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import './AdminGameButtons.css';

const AdminGameButtons = ({ disabled }) => {
    const { t } = useTranslation();

    return (
        <div className="admin-game-buttons-row">
            <Button type="reset" label={t('admin_game_button_end_game')} variant="secondary" disabled={disabled} />
            <div className="margin"></div>
            <Button type="submit" label={t('admin_game_button_start_game')} disabled={disabled} />
        </div>
    );

};

AdminGameButtons.propTypes = {
    disabled: PropTypes.bool,
};

export default AdminGameButtons;