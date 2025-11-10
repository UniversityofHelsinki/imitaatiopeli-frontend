import React from 'react';
import PropTypes from 'prop-types';
import './MessageReview.css'
import { useTranslation } from 'react-i18next';

const MessageReview = ({ message }) => {

  const { t } = useTranslation();

  const question = message.question_text;
  const answers = message.answers;
  const selectedAnswer = message.selectedAnswer;
  const justification = message.argument;

  const selectedAnswerClass = i => i === selectedAnswer ? 'message-review-answer-selected' : '';

  return (
    <div className="message-review">
      <div className="message-review-question">
        {question}
      </div>
      <div className="message-review-answers">
        {answers.map((answer, i) => (
          <div key={`${answer.answer_id}`} className={`message-review-answer ${selectedAnswerClass(i)}`}>
            <h4>{i+1}. {t('message_review_nth_answer')}</h4>
            <p>{answer.answer_text}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

MessageReview.propTypes = {
};

export default MessageReview;