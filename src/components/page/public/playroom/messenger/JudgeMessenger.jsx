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

const JudgeMessenger = ({ game, answers, onRateSubmitted }) => {
    const { isConnected, emit } = useSocket();
    const { t } = useTranslation();
    const { askQuestion } = useAskQuestion(game);
    const [currentState, setCurrentState] = useState('ask');
    const [questionInput, setQuestionInput] = useState('');
    const [askedQuestion, setAskedQuestion] = useJudgeAskedQuestion();
    const { setNotification } = useNotification();

    useEffect(() => {
        console.log('Answers changed:', answers);
        console.log('Asked question:', askedQuestion);
        console.log(currentState);
        if (answers && answers.length > 0 && askedQuestion) {
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
            const result = await askQuestion(questionText);
            console.log('Asked question sent successfully:', result);
            setAskedQuestion({ content: questionText, type: 'sent' });
            console.log('Dispatched setAskedQuestion:', questionText);
            setCurrentState('wait');
            onRateSubmitted();
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
        console.log('Received rating data:', data);
        if (isConnected) {
            emit('send-guess-to-answer', {
                answerId: data.selectedAnswer.content.answer_id,
                confidence: data.confidence,
                argument: data.justifications
            });
            setAskedQuestion(null);
            setCurrentState('ask');
        }
    };

    const finalReview = (() => {
      const mockMessages = [
        {
          question: 'AAAAA?',
          answers: [
            'OoO?',
            'EEEE?'
          ],
          selectedAnswer: 0,
          justification: 'Joo hyvä meno.'
        },
        {
          question: 'BBBBB?',
          answers: [
            'KKAKAKAKAKAKAKAKAKAK?',
            'HEHEHEHEHEHEHEHEH?'
          ],
          selectedAnswer: 1,
          justification: 'Joo hyvä meno.'
        },
        {
          question: 'CCCCCC?',
          answers: [
            'Vastaus joo?',
            'Hehe?'
          ],
          selectedAnswer: 1,
          justification: 'Perustelut koska joo'
        }
      ];
      if (currentState === 'final-review') {
        return (
          <FinalReview messages={mockMessages} onSubmit={console.log} />
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
