
import React from 'react';
import PropTypes from 'prop-types';
import './FinalReview.css'
import MessageReview from './MessageReview';
import { useTranslation } from 'react-i18next';
import FinalReviewForm from './FinalReviewForm';
import { InstructionMessage } from './Message';
import useJudgeFinalGuess from '../../../../../hooks/userJudgeFinalGuess.js';

const FinalReview = ({ messages, gameId, judgeId, setCurrentState, judgeStatusReload }) => {
    const { t } = useTranslation();
    const save = useJudgeFinalGuess();

    // Get the sorted answers from the first message to determine order
    const firstMessage = Object.values(messages)[0];
    const answers = firstMessage?.answers || [];

    // Sort answers: pretender's answer always last
    const sortedAnswers = [...answers].sort((a, b) => {
        if (a.is_pretender === b.is_pretender) return 0;
        return a.is_pretender ? 1 : -1;
    });

    // Find the pretender's answer ID
    const pretenderAnswerId = answers.find(a => a.is_pretender)?.answer_id;

    // Create answer info for radio buttons based on sorted order
    const answerOptions = [
        {
            index: 0,
            isPretender: sortedAnswers[0]?.is_pretender || false,
            answerId: sortedAnswers[0]?.answer_id
        },
        {
            index: sortedAnswers.length - 1,
            isPretender: sortedAnswers[sortedAnswers.length - 1]?.is_pretender || false,
            answerId: sortedAnswers[sortedAnswers.length - 1]?.answer_id
        }
    ];

    const handleSubmit = async (formValues) => {
        const selectedAnswerId = parseInt(formValues.selection);
        const isPretender = selectedAnswerId === pretenderAnswerId;

        const dataToSend = {
            gameId,
            judgeId,
            is_pretender: isPretender,
            confidence: formValues.confidence,
            argument: formValues.justification
        };

        try {
            const result = await save(dataToSend);
            judgeStatusReload();
            // Handle success (e.g., show success message, navigate to next screen)
        } catch (err) {
            console.error('Error saving final guess:', err);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="final-review">
            <div className="final-review-instructions">
                <InstructionMessage content={t('final_review_instructions_message')} />
            </div>
            <hr />
            <div className="final-review-message-reviews">
                {Object.entries(messages).map(([id, question], i) => (
                    <>
                        <h3>{i+1}. {t('final_review_question_heading')}</h3>
                        <MessageReview key={id} message={question} />
                        <hr />
                    </>
                ))}
            </div>
            <div className="final-review-final-review-form">
                <FinalReviewForm onSubmit={handleSubmit} answerOptions={answerOptions} />
            </div>
        </div>
    );

};

FinalReview.propTypes = {
    messages: PropTypes.object,
    gameId: PropTypes.number.isRequired,
    judgeId: PropTypes.number.isRequired,
};

export default FinalReview;
