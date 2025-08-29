import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextArea from '../../misc/ds/TextArea';
import { useTranslation } from 'react-i18next';
import './InstructionsField.css';
import Button from "../../misc/ds/Button.jsx";
import Icon from "../../misc/ds/Icon.jsx";

const InstructionsField = ({ value, onChange, disabled, validation }) => {
    const { t } = useTranslation();
    const [originalValue, setOriginalValue] = useState(value);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        if (!hasChanged) {
            setOriginalValue(value);
        }
    }, [value, hasChanged]);

    const isEmptyOrDefaultText = !value || value.trim() === '' || value === t('game_form_instructions_field_text');

    const errorText = validation && !validation.isValid && t(validation.message) || isEmptyOrDefaultText;

    const handleChange = (e) => {
        setHasChanged(true);
        onChange(e);
    };

    const handleUndo = () => {
        setHasChanged(false);
        onChange({ target: { value: originalValue } });
    };

    return (
        <div className="instructions-field">
            <div className="instructions-field-container">
                <TextArea
                    placeholder={t('game_form_instructions_field_placeholder')}
                    label={t('game_form_instructions_field_label')}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    assistiveText={t('game_form_instructions_field_assistive_text')}
                    errorText={errorText}
                    required
                />
                <button
                    aria-label={t('game_form_instructions_undo_button_aria_label')}
                    className="button-plain undo-button"
                    onClick={handleUndo}
                    disabled={disabled || !hasChanged || value === originalValue}
                >
                    <Icon name="rotate-left" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

InstructionsField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    validation: PropTypes.object,
};

export default InstructionsField;
