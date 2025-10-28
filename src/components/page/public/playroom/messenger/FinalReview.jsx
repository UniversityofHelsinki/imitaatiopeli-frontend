import React from 'react';
import PropTypes from 'prop-types';
import './FinalReview.css'
import MessageReview from './MessageReview';
import { useTranslation } from 'react-i18next';
import FinalReviewForm from './FinalReviewForm';
import { InstructionMessage } from './Message';

const FinalReview = ({ messages, onSubmit }) => {
  const { t } = useTranslation();

  return (
   <div className="final-review">
    <div className="final-review-instructions">
      <InstructionMessage content={t('final_review_instructions_message')} />
    </div>
    <hr />
    <div className="final-review-message-reviews">
      {messages.map((message, i) => (
        <>
          <h3>{i+1}. {t('final_review_question_heading')}</h3>
          <MessageReview key={i + message.question} message={message} />
          <hr />
        </>
      ))}
    </div>
    <div className="final-review-final-review-form">
      <FinalReviewForm onSubmit={onSubmit} />
    </div>
   </div>
  );

};

FinalReview.propTypes = {
  messages: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default FinalReview;