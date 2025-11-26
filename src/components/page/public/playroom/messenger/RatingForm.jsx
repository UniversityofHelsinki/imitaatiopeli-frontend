import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './RatingForm.css';
import Message, {QuestionMessage, RatingMessage} from './Message';
import Button from '../../../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import TextArea from '../../../../misc/ds/TextArea';
import RadioButtonGroup from "../../../../misc/ds/RadioButtonGroup.jsx";
import RadioButton from "../../../../misc/ds/RadioButton.jsx";

export const ConfidenceMeter = ({
                             value,
                             onChange
                         }) => {
    const id = useId();
    const { t } = useTranslation();

    const levels = [1, 2, 3, 4];

    console.log("Confidence Meter: ", value);

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
                        onChange={() => onChange?.(level)}
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
                        required={true}
                    />
                    <span className="rating-form-justifications-character-count">{justifications.length} / 500</span>
                </div>
                <Button disabled={!justifications || !confidence || (selectedIndex === null)} type="submit" label={t('rating_form_submit_rating')} />
                {answers[0]?.content?.questionCount >= 3 && <Button disabled={!justifications || (selectedIndex === null)} onClick={handleEndGame} variant="secondary" label={t('rating_form_end_game')} />}
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
