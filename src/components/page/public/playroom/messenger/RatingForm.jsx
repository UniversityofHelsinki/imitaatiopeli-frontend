import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './RatingForm.css';
import { QuestionMessage, RatingMessage } from './Message';
import Button from '../../../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import TextArea from '../../../../misc/ds/TextArea';
import RadioButtonGroup from '../../../../misc/ds/RadioButtonGroup.jsx';
import RadioButton from '../../../../misc/ds/RadioButton.jsx';
import { useNotification } from '../../../../notification/NotificationContext.jsx';
import ConfirmModalDialog from "../../../../../utilities/ConfirmModalDialog.jsx";

export const ConfidenceMeter = ({ value, onChange }) => {
    const id = useId();
    const { t } = useTranslation();

    const levels = [1, 2, 3, 4];

    const handleChange = (event) => {
        const newValue = event.target.value;
        onChange?.(newValue);
    };

    return (
        <div className="confidence-meter-container">
            <RadioButtonGroup
                label={t('rating_form_confidence_meter_label')}
                value={String(value)}
                dsDirection='horizontal'
                dsRequired='true'
            >
                {levels.map((level) => (
                    <RadioButton
                        key={level}
                        id={`confidence_level_${level}`}
                        name="confidence_level"
                        value={String(level)}
                        label={`${level} ${t(`confidence_meter_value_${level}`)}`}
                        onClick={handleChange}
                        checked={String(value) === String(level)}
                    />
                ))}
            </RadioButtonGroup>
        </div>
    );
};

ConfidenceMeter.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
};

const RatingForm = ({
                        question,
                        answers,
                        onSubmit,
                        onEndGame,
                        justifications,
                        onJustificationsChange,
                        selectedIndex,
                        onSelectedIndexChange,
                        confidence,
                        onConfidenceChange
                    }) => {
    const { t } = useTranslation();
    const { setNotification } = useNotification();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleSelect = (i) => {
        onSelectedIndexChange?.(i);
    };

    const selectedAnswer = Number.isInteger(selectedIndex) ? answers[selectedIndex] : null;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedAnswer) return;
        try {
            const payload = {
                selectedAnswer: selectedAnswer,
                confidence: confidence,
                justifications: justifications ?? ''
            };
            onSubmit?.(payload);
            setNotification(t('rating_form_submit_success_notification'), 'success', true);
        } catch (error) {
            console.error('Failed to submit rating:', error);
            setNotification(t('rating_form_submit_error_notification'), 'error', true);
        }

    };

    const handleEndGame = (event) => {
        event.preventDefault();
        if (onEndGame) {
            try {
                onEndGame({
                    selectedAnswer: selectedAnswer,
                    confidence: confidence ?? 2,
                    justifications: justifications ?? ''
                });
                setConfirmOpen(false);
                setNotification(t('rating_form_end_game_submit_success_notification'), 'success', true);
            } catch (error) {
                console.error('Error sending final rating', error);
                setNotification(t('rating_form_end_game_submit_error_notification'), 'error', true);
            }
        }
    };

    const renderEndGameConfirm = () => (
        <div className="confirm-dialog-container" id="end-game-dialog-container" aria-live="assertive">
            <ConfirmModalDialog
                id="end-game-dialog"
                open={confirmOpen}
                message={t('rating_form_end_game_confirm_message')}
                confirmLabel={t('rating_form_end_game_confirm')}
                cancelLabel={t('rating_form_end_game_cancel')}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={handleEndGame}
            />
        </div>
    );

    return (
        <div className="rating-form">
            <div className="message-area-item message-area-item-sent rating-form-question">
                <QuestionMessage>
                    {question.content}
                </QuestionMessage>
            </div>

            <form onSubmit={handleSubmit} className="rating-form-form">
                <div className="rating-form-block">
                    <div className="rating-form-answers-container">
                        <div className="rating-form-heading">
                            {t('rating_form_instructive_heading')}
                        </div>
                        {answers.map((answer, i) => (
                            <div
                                key={`${answer.type}-${i}`}
                                className="message-area-item  rating-form-answers"
                            >
                                <RatingMessage
                                    i={i}
                                    name="rating-answers"
                                    isSelected={selectedIndex === i}
                                    onClick={() => handleSelect(i)}
                                >
                                    {answer.content}
                                </RatingMessage>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rating-form-confidence">
                    <ConfidenceMeter
                        value={confidence ?? 0}
                        onChange={(...args) => {
                            // Support both signatures:
                            // 1) onChange(value)
                            // 2) onChange(event, value)
                            const val = args.length === 1 ? args[0] : args[1];
                            if (val != null) onConfidenceChange?.(Number(val));
                        }}
                    />
                </div>

                <div className="rating-form-justifications">
                    <TextArea
                        label={t('rating_form_justifications_label')}
                        assistiveText={t('rating_form_justifications_assistive_text')}
                        placeholder={t('rating_form_justifications_placeholder')}
                        value={justifications ?? ''}
                        onChange={e => onJustificationsChange?.(e.target.value?.substring(0, 2000))}
                        autocomplete="off"
                        required={true}
                    />
                    <span className="rating-form-justifications-character-count">{justifications.length} / 2000</span>
                </div>

                <div className="rating-form-buttons">
                    <div className="rating-form-instruction-grid">
                        <p className="grid-col-1">{t('rating_form_submit_rating_instructions')}</p>
                        {answers[0]?.content?.questionCount >= 3 && (
                            <p className="rating-form-end-instructions grid-col-2">
                                {t('rating_form_end_game_instructions')}
                            </p>
                        )}

                        <div className="grid-col-1">
                            <Button
                                disabled={!justifications || !confidence || (selectedIndex === null)}
                                type="submit"
                                label={t('rating_form_submit_rating')}
                            />
                        </div>

                        {answers[0]?.content?.questionCount >= 3 && (
                            <div className="grid-col-2">
                                <Button
                                    disabled={!justifications || (selectedIndex === null)}
                                    onClick={() => setConfirmOpen(true)}
                                    label={t('rating_form_end_game')}
                                />
                                {confirmOpen && renderEndGameConfirm()}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

RatingForm.propTypes = {
    question: PropTypes.object,
    answers: PropTypes.array,
    onSubmit: PropTypes.func,
    onEndGame: PropTypes.func,
};

export default RatingForm;
