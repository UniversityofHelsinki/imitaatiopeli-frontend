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
            <label htmlFor="confidence">{t('rating_form_confidence_meter_label')}</label>
            <input type="range" name="confidence" value={(value - 1) * 33} id={id} step="33" max="99" list="confidence-values" onChange={handleChange} />
            <datalist id="confidence-values">
                <option value="0" />
                <option value="33" />
                <option value="66" />
                <option value="99" />
            </datalist>
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
                        onSubmit
                    }) => {
    const { t } = useTranslation();

    const [selected, setSelected] = useState(null);
    const [confidence, setConfidence] = useState(2);
    const [justifications, setJustifications] = useState('');
    const [ratingCount, setRatingCount] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('rating submit', event);

        onSubmit({
            selectedAnswer: selected,
            confidence: confidence,
            justifications: justifications
        });

        setRatingCount(ratingCount + 1);
    };

    const handleChange = (event) => {
        const button = event.target.closest('.rating-message');

        if (button) {
            const answerIndex = parseInt(button.getAttribute('data-index'));
            const selectedAnswerObject = answers[answerIndex];
            setSelected(selectedAnswerObject);
        }
    };

    const isFormDisabled = () => {
        return selected === null || confidence === 0 || justifications.length === 0;
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
            <form onSubmit={handleSubmit} className="rating-form-form" onClick={handleChange}>
                {answers.map((answer, i) => (
                    <div key={`${answer.type}-${i}`} className="message-area-item message-area-item-received rating-form-answers">
                        <RatingMessage
                            i={i}
                            name="rating-answers"
                            isSelected={selected && answers.indexOf(selected) === i}
                        >
                            {answer.content}
                        </RatingMessage>
                    </div>
                ))}
                <div className="rating-form-confidence">
                    <ConfidenceMeter value={confidence} onChange={v => setConfidence(v)} />
                </div>
                <div className="rating-form-justifications">
                    <TextArea
                        label={t('rating_form_justifications_label')}
                        assistiveText={t('rating_form_justifications_assistive_text')}
                        placeholder={t('rating_form_justifications_placeholder')}
                        value={justifications}
                        onChange={e => setJustifications(e.target.value?.substring(0, 500))}
                        autocomplete="off"
                    />
                    <span className="rating-form-justifications-character-count">{justifications.length} / 500</span>
                </div>
                <Button type="submit" label={t('rating_form_submit_rating')}  disabled={isFormDisabled()} />
                {ratingCount > 2 && <Button variant="secondary" label={t('rating_form_end_game')} />}
            </form>
        </div>
    );

};

RatingForm.propTypes = {
    question: PropTypes.object,
    answers: PropTypes.array,
    onSubmit: PropTypes.func,
};

export default RatingForm;
