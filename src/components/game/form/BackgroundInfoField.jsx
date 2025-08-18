import React from 'react';
import CheckBox from '../../misc/ds/CheckBox';
import './BackgroundInfoField.css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const BackgroundInfoField = ({ checked, onChange, disabled }) => {
    const { t } = useTranslation();

    return (
        <div className="research-permission-field">
            <CheckBox
                label={t('game_form_backgroundinfo_field_label')}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                required={false}
                optional={false}
            />
        </div>
    );

};

BackgroundInfoField.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

export default BackgroundInfoField;