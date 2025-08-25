import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../../misc/ds/Button.jsx';
import useAIPromptTest from '../../../hooks/useAIPromptTest.js';
import TextArea from '../../misc/ds/TextArea';
import Spinner from '../../misc/ds/Spinner.jsx';
import './AIPromptTest.css';

const AIPromptTest = ({ prompt, temperature }) => {
    const { t } = useTranslation();
    const [question, setQuestion] = useState('');

    const {
        testPrompt,
        response,
        loading,
        error,
        clearResults
    } = useAIPromptTest();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!question.trim()) return;

        await testPrompt(prompt, question, temperature);
    };

    const handleClear = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setQuestion('');
        clearResults();
    };

    const temperaturePercentage = Math.round(temperature * 100);
    const hasPrompt = prompt?.trim();

    return (
        <div className="ai-prompt-test">
            <div className="form-field game-form-field">
                <label>{t('current_prompt')}:</label>
                <div className="prompt-text">{prompt || t('no_prompt_available')}</div>
            </div>

            <div className="form-field game-form-field">
                <label>{t('temperature_setting')}:</label>
                <div className="temperature-display">
                    {temperaturePercentage}%
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
                    placeholder={hasPrompt ? t('enter_test_question_placeholder') : t('add_prompt_first_placeholder')}
                    rows={4}
                    disabled={loading || !hasPrompt}
                    required
                />
            </div>

            {!hasPrompt && (
                <div className="form-field game-form-field">
                    <div className="info-message">
                        <strong>{t('info')}:</strong> {t('prompt_required_message')}
                    </div>
                </div>
            )}

            <div className="form-field game-form-field button-group">
                <Button
                    type="button"
                    label={loading ? t('testing') : t('test_prompt')}
                    onClick={handleSubmit}
                    disabled={loading || !question.trim() || !hasPrompt}
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
};

export default AIPromptTest;
