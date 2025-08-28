import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useLanguageModels from '../../../hooks/useLanguageModels.js';
import Select, { Option } from '../../../components/misc/ds/Select.jsx';

const LanguageModelField = ({ value, onChange, disabled, validation }) => {
    const { t } = useTranslation();
    const { models, loading, error } = useLanguageModels();

    const handleChange = (e) => {
        const selectedId = e.detail || e.target?.value;
        const numericId = selectedId ? parseInt(selectedId, 10) : null;
        onChange({ target: { value: numericId } });
    };

    const errorText = validation && !validation.isValid && t(validation.message) || '';

    return (
        <div className="form-field">
            <Select
                id="language-model-select"
                title={t('language_model')}
                placeholder={t('select_language_model')}
                value={value || ''}
                onChange={handleChange}
                disabled={disabled}
                loading={loading}
                loadingText={t('loading_models')}
                optionsError={!!error}
                optionsErrorText={error ? `${t('failed_to_load_models')}: ${error}` : undefined}
                invalid={validation && !validation.isValid}
                errorText={errorText}
                clearable={true}
            >
                {models.map((model) => (
                    <Option key={model.model_id} value={model.model_id}>
                        {model.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

LanguageModelField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    validation: PropTypes.object, // Match other field components
};

export default LanguageModelField;
