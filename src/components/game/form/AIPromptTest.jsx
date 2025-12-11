import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import Button from '../../misc/ds/Button.jsx';
import useAIPromptTest from '../../../hooks/useAIPromptTest.js';
import useLanguageModels from '../../../hooks/useLanguageModels.js';
import TextArea from '../../misc/ds/TextArea';
import Spinner from '../../misc/ds/Spinner.jsx';
import './AIPromptTest.css';
import usePromptTemplates from "../../../hooks/usePromptTemplates.js";

const AIPromptTest = ({ prompt, temperature, languageModel, languageUsed }) => {
    const { t } = useTranslation();
    const [question, setQuestion] = useState('');
    const { models } = useLanguageModels();
    const { currentLanguageSuffix, loading: promptTemplateLoading} = usePromptTemplates(languageUsed);

    const {
        testPrompt,
        response,
        loading,
        error,
        clearResults
    } = useAIPromptTest();

    const selectedModel = models.find(model => {
        return model.model_id === languageModel;
    });

    const modelName = selectedModel ? selectedModel.name : t('no_model_selected');

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!question.trim() || !languageModel) return;

        await testPrompt(prompt, question, temperature, languageModel);
    };

    const handleClear = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setQuestion('');
        clearResults();
    };

    const hasPrompt = prompt?.trim();
    const hasModel = languageModel;

    return (
        <div className="ai-prompt-test">
            <div className="form-field game-form-field">
                <label>{t('default_system_prompt')}</label>
                <div className="prompt-text">
                    {promptTemplateLoading ?
                        t('prompt_template_loading') :
                        currentLanguageSuffix?.suffix_template || t('prompt_template_not_found')
                    }
                </div>
            </div>

            <div className="form-field game-form-field">
                <label>{t('current_prompt')}:</label>
                <div className="prompt-text">{prompt || t('no_prompt_available')}</div>
            </div>

            <div className="form-field game-form-field">
                <label>{t('selected_language_model')}:</label>
                <div className="model-display">{modelName}</div>
            </div>

            <div className="form-field game-form-field">
                <label>{t('temperature_setting')}:</label>
                <div className="temperature-display">
                    {temperature}
                    <span className="temperature-label">
                        ({temperature < 0.3 ? t('temperature_conservative') :
                        temperature > 0.7 ? t('temperature_creative') :
                            t('temperature_balanced')})
                    </span>
                </div>
            </div>

            <div className="form-field game-form-field">
                <label htmlFor="test-question">{t('test_question')}:</label>
                <TextArea
                    id="test-question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={t('test_question_placeholder')}
                    rows={4}
                    disabled={loading || !hasPrompt || !hasModel}
                    required
                />
            </div>

            {(!hasPrompt || !hasModel) && (
                <div className="form-field game-form-field">
                    <div className="info-message">
                        <ds-icon dsName={'info'} dsSize={'1.5rem'} />
                        {!hasPrompt && !hasModel
                            ? t('prompt_and_model_required_message')
                            : !hasPrompt
                                ? t('prompt_required_message')
                                : t('model_required_message')
                        }
                    </div>
                </div>
            )}

            <div className="form-field game-form-field button-group">
                <Button
                    type="button"
                    label={loading ? t('testing') : t('test_prompt')}
                    onClick={handleSubmit}
                    disabled={loading || !question.trim() || !hasPrompt || !hasModel}
                    variant="primary"
                />
                <Button
                    type="button"
                    label={t('clear')}
                    onClick={handleClear}
                    disabled={loading}
                    variant="secondary"
                />
            </div>

            {loading && (
                <div className="form-field game-form-field">
                    <Spinner
                        position="side"
                        size="large"
                        text={t('receiving_ai_response')}
                    />
                </div>
            )}

            {error && (
                <div className="form-field game-form-field">
                    <div className="error-message">
                        <strong>{t('error')}:</strong> {error}
                    </div>
                </div>
            )}

            {response && (
                <div className="form-field game-form-field">
                    <h3>{t('ai_response')}:</h3>
                    <div className="response-content">
                        {response?.answer}
                    </div>
                </div>
            )}
        </div>
    );
};

AIPromptTest.propTypes = {
    prompt: PropTypes.string,
    temperature: PropTypes.number.isRequired,
    languageModel: PropTypes.number.isRequired,
    languageUsed: PropTypes.string
};

export default AIPromptTest;
