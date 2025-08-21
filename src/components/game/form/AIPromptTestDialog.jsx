
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dialog from '../../dialog/Dialog.jsx';
import Button from '../../misc/ds/Button.jsx';
import useAIPromptTest from '../../../hooks/useAIPromptTest.js';
import TextArea from '../../misc/ds/TextArea';

const AIPromptTestDialog = ({ isOpen, onClose, prompt }) => {
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

        await testPrompt(prompt, question);
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

                <div className="form-field game-form-field">
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
                    <div className="loading-indicator">
                        <div className="spinner"></div>
                        <span>{t('processing_request')}</span>
                    </div>
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
                        <TextArea
                            value={response?.answer}
                            readOnly
                            rows={10}
                        />
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
};

export default AIPromptTestDialog;
