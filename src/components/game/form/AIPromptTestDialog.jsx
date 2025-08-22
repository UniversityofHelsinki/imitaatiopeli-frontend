import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dialog from '../../dialog/Dialog.jsx';
import Button from '../../misc/ds/Button.jsx';
import useAIPromptTest from '../../../hooks/useAIPromptTest.js';
import TextArea from '../../misc/ds/TextArea';
import Spinner from '../../misc/ds/Spinner.jsx';
import  './AIPromptTestDialog.css';

const AIPromptTestDialog = ({ isOpen, onClose, prompt, temperature }) => {
    const { t } = useTranslation();
    const [question, setQuestion] = useState('');

    const {
        testPrompt,
        response,
        loading,
        error,
        clearResults,
        resetAll
    } = useAIPromptTest();

    // Reset everything when dialog opens/closes
    useEffect(() => {
        if (isOpen) {
            resetAll();
            setQuestion('');
        }
    }, [isOpen, resetAll]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        await testPrompt(prompt, question, temperature);
    };

    const handleClose = () => {
        setQuestion('');
        resetAll();
        onClose();
    };

    const handleClear = () => {
        setQuestion('');
        clearResults();
    };

    // Convert temperature to percentage for display
    const temperaturePercentage = Math.round(temperature * 100);

    const footerActions = (
        <Button
            type="button"
            label={t('close')}
            onClick={handleClose}
            variant="secondary"
        />
    );

    return (
        <Dialog
            isOpen={isOpen}
            onClose={handleClose}
            title={t('ai_prompt_test_dialog_title')}
            size="large"
            footerActions={footerActions}
            className="ai-prompt-test-dialog"
            preventClose={loading}
        >
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

            <form onSubmit={handleSubmit} className="form game-form">
                <div className="form-field game-form-field">
                    <label htmlFor="test-question">{t('test_question')}:</label>
                    <TextArea
                        id="test-question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder={t('enter_test_question_placeholder')}
                        rows={4}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-field game-form-field button-group">
                    <Button
                        type="submit"
                        label={loading ? t('testing') : t('test_prompt')}
                        disabled={loading || !question.trim()}
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
            </form>

            {loading && (
                <div className="form-field game-form-field">
                    <Spinner
                    position="side"
                    size="large"
                    text={t('receiving_ai_response')} />
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
        </Dialog>
    );
};

AIPromptTestDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    prompt: PropTypes.string,
    temperature: PropTypes.number.isRequired,
};

export default AIPromptTestDialog;
