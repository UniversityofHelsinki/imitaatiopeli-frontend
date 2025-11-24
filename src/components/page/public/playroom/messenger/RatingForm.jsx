import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './RatingForm.css';
import Message, {QuestionMessage, RatingMessage} from './Message';
import Button from '../../../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import TextArea from '../../../../misc/ds/TextArea';

export const ConfidenceMeter = ({
                             value,
                             onChange
                         }) => {
    const id = useId();
    const { t } = useTranslation();

    const handleChange = (event) => {
        if (onChange) {
            onChange(event.target.value / 33 + 1);
        }
    }

    return (
        <div className="confidence-meter-container">
            <label htmlFor={id}>{t('rating_form_confidence_meter_label')}</label>
            <input
                type="range"
                name="confidence"
                value={(value - 1) * 33}
                id={id}
                step="33"
                min="0"
                max="99"
                onChange={handleChange}
                aria-valuemin="1"
                aria-valuemax="4"
                aria-valuenow={value}
            />
            <div className="confidence-meter-ticks">
                <span className="tick"></span>
                <span className="tick"></span>
                <span className="tick"></span>
                <span className="tick"></span>
            </div>
            <div className="confidence-meter-numbers">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
            </div>
            <div className="confidence-meter-labels">
                <span>{t('confidence_meter_value_1')}</span>
                <span>{t('confidence_meter_value_2')}</span>
                <span>{t('confidence_meter_value_3')}</span>
                <span>{t('confidence_meter_value_4')}</span>
            </div>
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

    const handleSelect = (i) => {
        onSelectedIndexChange?.(i);
    };

    const selectedAnswer = Number.isInteger(selectedIndex) ? answers[selectedIndex] : null;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('rating submit', event);
        if (!selectedAnswer) return;
        const payload = {
            selectedAnswer: selectedAnswer,
            confidence: confidence,
            justifications: justifications ?? ''
        };
        onSubmit?.(payload);
    };

    const handleEndGame = (event) => {
      event.preventDefault();
      if (onEndGame) {
        onEndGame({
          selectedAnswer: selectedAnswer,
          confidence: confidence ?? 2,
          justifications: justifications ?? ''
        });
      }
    };

    return (
        <div className="rating-form">
            <div className="message-area-item message-area-item-sent rating-form-question">
                <QuestionMessage>
                  {question.content}
                </QuestionMessage>
            </div>
            <div className="rating-form-heading">
                {t('rating_form_instructive_heading')}
            </div>
            <form onSubmit={handleSubmit} className="rating-form-form" >
                {answers.map((answer, i) => (
                    <div key={`${answer.type}-${i}`} className="message-area-item message-area-item-received rating-form-answers">
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
                <div className="rating-form-confidence">
                    <ConfidenceMeter value={confidence ?? 0} onChange={(...args) => {
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
                        onChange={e => onJustificationsChange?.(e.target.value?.substring(0, 500))}
                        autocomplete="off"
                    />
                    <span className="rating-form-justifications-character-count">{justifications.length} / 500</span>
                </div>
                <Button type="submit" label={t('rating_form_submit_rating')} />
                {answers[0]?.content?.questionCount >= 3 && <Button onClick={handleEndGame} variant="secondary" label={t('rating_form_end_game')} />}
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
