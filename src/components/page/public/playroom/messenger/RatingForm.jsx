import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './RatingForm.css'
import Message, { RatingMessage } from './Message';
import Button from '../../../../misc/ds/Button';
import { useTranslation } from 'react-i18next';
import TextArea from '../../../../misc/ds/TextArea';
          
const ConfidenceMeter = () => {
  const id = useId();
  const { t } = useTranslation();
  return (<>
    <label htmlFor="confidence">{t('rating_form_confidence_meter_label')}</label>
    <input type="range" name="confidence" id={id} min={1} max={5} />
  </>);
};

const RatingForm = ({
  question,
  answers,
  onSubmit
}) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('rating submit', event);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  
  return (
    <div className="rating-form">
      <div className="message-area-item message-area-item-sent">
        <Message>
          {question.content}
        </Message>
      </div>
      <div className="rating-form-heading">
        {t('rating_form_instructive_heading')}
      </div>
      <form onSubmit={handleSubmit} className="rating-form-form" onChange={handleChange}>
        {answers.map((answer, i) => (
          <div key={`${answer.type}-${i}`} className="message-area-item message-area-item-received rating-form-answers">
            <RatingMessage i={i} name="rating-answers">
              {answer.content}
            </RatingMessage>
          </div>
        ))}
        <div className="rating-form-confidence">
          <ConfidenceMeter />
        </div>
        <div className="rating-form-justifications">
          <TextArea 
            label={t('rating_form_justifications_label')}
            assistiveText={t('rating_form_justifications_assistive_text')}
            placeholder={t('rating_form_justifications_placeholder')}
          />
        </div>
        <Button type="submit" label={t('rating_form_submit_rating')} />
        <Button variant="secondary" label={t('rating_form_end_game')} />
      </form>
    </div>
  );

};

RatingForm.propTypes = {
  question: PropTypes.string,
  answers: PropTypes.array,
  onSubmit: PropTypes.func,
};

export default RatingForm;