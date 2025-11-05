import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './JudgeMessenger.css';
import { useTranslation } from 'react-i18next';
import useAskQuestion from '../../../../../hooks/useAskQuestion';
import { WaitingAnnouncement } from '../Playroom';
import Messenger from './Messenger';
import { InstructionMessage } from './Message';
import RatingForm from './RatingForm';
import { useNotification } from '../../../../notification/NotificationContext.jsx';
import { useSocket } from '../../../../../contexts/SocketContext.jsx';
import FinalReview from './FinalReview';
import useJudgeAskedQuestion from '../../../../../hooks/useJudgeAskedQuestion.js';
import useEndJudging from '../../../../../hooks/useEndJudging';

const JudgeMessenger = ({ currentState, setCurrentState, game, answers, onRateSubmitted }) => {
    const { isConnected, emit } = useSocket();
    const { t } = useTranslation();
    const { askQuestion } = useAskQuestion(game);
    //const [currentState, setCurrentState] = useState('ask');
    const [questionInput, setQuestionInput] = useState('');
    const [askedQuestion, setAskedQuestion] = useJudgeAskedQuestion();
    const { setNotification } = useNotification();
    const { endJudging: stopJudging, questions: summaryQuestions } = useEndJudging();

    useEffect(() => {
        console.log('received answers:', answers);
        console.log('asked question:', askedQuestion);
        if (currentState === 'rate' || currentState === 'final-review') {
            console.log('currentState', currentState);
        } else if (answers && answers.length > 0 && askedQuestion) {
            setCurrentState('rate');
            console.log('rate');
        } else if (answers.length === 0 && askedQuestion) {
            setCurrentState('wait');
            console.log('wait');
        } else {
            setCurrentState('ask');
            console.log('ask');
        }
    }, [answers, askedQuestion]);

    const handleAskQuestion = async (questionText) => {
        try {
            await askQuestion(questionText);
            setAskedQuestion({ content: questionText, type: 'sent' });
            setCurrentState('wait');
        } catch (error) {
            console.error('Failed to ask question:', error);
            setCurrentState('ask');
            setNotification(t('judge_messenger_send_question_error_notification'), 'error', true);
        }
    };

    const disabledAnnouncements = {
        'wait': <WaitingAnnouncement content={t('playroom_waiting_for_answers')} />,
        'rate': <WaitingAnnouncement content={t('playroom_waiting_for_rating')} showSpinner={false} />
    };

    const handleRatingSubmit = (data) => {
        if (isConnected) {
            emit('send-guess-to-answer', {
                answerId: data.selectedAnswer.content.answer_id,
                confidence: data.confidence,
                argument: data.justifications
            });
            setAskedQuestion(null);
            setCurrentState('ask');
            onRateSubmitted();
        }
    };

    const endJudging = async (data) => {
      handleRatingSubmit(data)
      await stopJudging(game);
      setCurrentState('final-review');
    };

    const finalReview = (() => {
      if (currentState === 'final-review' && summaryQuestions) {
        return (
          <FinalReview messages={summaryQuestions} onSubmit={console.log} />
        );
      }
      return <></>;
    })();

    return (
        <Messenger
            onMessageSubmit={handleAskQuestion}
            messageFieldDisabled={currentState !== 'ask'}
            announcement={disabledAnnouncements[currentState]}
            message={questionInput}
            onMessageChange={m => setQuestionInput(m)}
            msglength={255}>
            {currentState !== 'final-review' && <ul className="message-area-messages">
                <li className="message-area-instructions message-area-item">
                    <InstructionMessage content={t('playroom_instructions_judge')} />
                </li>
            </ul> || finalReview}
            {currentState === 'rate' && askedQuestion &&
                <RatingForm
                    question={askedQuestion}
                    answers={ answers }
                    onSubmit={handleRatingSubmit}
                    onEndGame={endJudging}
                />}

        </Messenger>
    );
};

JudgeMessenger.propTypes = {
    game: PropTypes.string,
    answers: PropTypes.array,
    onRateSubmitted: PropTypes.func,
};

export default JudgeMessenger;
