import React from 'react';
import CheckBox from '../../misc/ds/CheckBox';
import './GenderField.css';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const GenderField = ({ value, onChange, disabled, validation }) => {
    const { t } = useTranslation();

    const errorText = validation && !validation.isValid && t(validation.message) || '';

    const handleChange = (e) => {
        onChange?.({ target: { value: e.target.checked } });
    };

    return (
        <div className="gender-field">
            <CheckBox
                id="gender-field"
                name="gender-field"
                label={t('game_form_gender_field_label')}
                checked={value}
                onChange={handleChange}
                errorText={errorText}
                disabled={disabled}
                required={false}
                optional={false}
            />
        </div>
    );

};

GenderField.propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    validation: PropTypes.object,
};

export default GenderField;