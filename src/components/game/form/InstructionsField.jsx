import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextArea from '../../misc/ds/TextArea';
import { useTranslation } from 'react-i18next';
import './InstructionsField.css';
import Button from "../../misc/ds/Button.jsx";

const InstructionsField = ({ value, onChange, disabled, validation }) => {
    const { t } = useTranslation();
    const [originalValue, setOriginalValue] = useState(value);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        if (!hasChanged) {
            setOriginalValue(value);
        }
    }, [value, hasChanged]);

    const errorText = validation && !validation.isValid && t(validation.message) || '';

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
                    errorText={errorText}
                    required
                />
                <Button
                    onClick={handleUndo}
                    disabled={disabled || !hasChanged || value === originalValue}
                    variant="standalone"
                    icon="rotate_left"
                    size="2xLarge"
                    colour="black"
                    className="undo-button"
                />
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
