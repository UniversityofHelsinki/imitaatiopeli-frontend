import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './NickNameField.css'
import TextInput from '../../misc/ds/TextInput';
import { useTranslation } from 'react-i18next';

const RelevantBackgroundField = ({ value, disabled, onChange, validation }) => {
    const { t } = useTranslation();
    const id = useId();

    const errorText = validation && !validation.isValid && validation.message || '';

    return (
        <div className="relevant-background">
            <TextInput
                id={id}
                placeholder={t('relevant_background_field_placeholder')}
                onInput={event => onChange(event.target.value)}
                disabled={disabled}
                value={value}
                errorText={errorText}
            />
        </div>
    )
};

RelevantBackgroundField.propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    validation: PropTypes.object,
};

export default RelevantBackgroundField;