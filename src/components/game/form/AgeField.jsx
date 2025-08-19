import React from 'react';
import CheckBox from '../../misc/ds/CheckBox';
import './AgeField.css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const AgeField = ({  value, onChange, disabled, validation }) => {
    const { t } = useTranslation();

    const errorText = validation && !validation.isValid && t(validation.message) || '';

    const handleChange = (e) => {
        onChange?.({ target: { value: e.target.checked } });
    };

    return (
        <div className="age-field">
            <CheckBox
                id="age-field"
                name="age-field"
                label={t('game_form_age_field_label')}
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

AgeField.propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    validation: PropTypes.object,
};

export default AgeField;