import React from 'react';
import CheckBox from '../../misc/ds/CheckBox';
import './BackgroundInfoField.css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const BackgroundInfoField = ({ value, onChange, disabled, validation  }) => {
    const { t } = useTranslation();

    const errorText = validation && !validation.isValid && t(validation.message) || '';

    const handleChange = (e) => {
        onChange?.({ target: { value: e.target.checked } });
    };

    return (
        <div className="backgroundinfo-field">
                <CheckBox
                    id="backgroundinfo-field"
                    name="backgroundinfo-field"
                    label={t('game_form_backgroundinfo_field_label')}
                    checked={value}
                    onChange={handleChange}
                    disabled={disabled}
                    errorText={errorText}
                    required={false}
                    optional={false}
                />
        </div>
    );
};

BackgroundInfoField.propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    validation: PropTypes.object,
};

export default BackgroundInfoField;