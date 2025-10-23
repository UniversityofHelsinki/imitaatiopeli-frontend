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

const JudgeMessenger = ({ game, answers }) => {
    const { isConnected, emit } = useSocket();
    const { t } = useTranslation();
    const { askQuestion } = useAskQuestion(game);
    const [currentState, setCurrentState] = useState('ask');
    const [questionInput, setQuestionInput] = useState('');
    const [askedQuestion, setAskedQuestion] = useState(null);
    const { setNotification } = useNotification();

    useEffect(() => {
        if (answers && answers.length > 0) {
            setCurrentState('rate'); // vai rate
        }
    }, [answers]);

    const handleAskQuestion = async (questionText) => {
        try {
            const result = await askQuestion(questionText);
            console.log('Asked question sent successfully:', result);
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
        console.log('Received rating data:', data);
        if (isConnected) {
            emit('send-guess-to-answer', {
                answerId: data.selectedAnswer.content.answer_id,
                confidence: data.confidence,
                argument: data.justifications
            });
            setCurrentState('ask');
        }
    };

    return (
        <Messenger
            onMessageSubmit={handleAskQuestion}
            messageFieldDisabled={currentState !== 'ask'}
            announcement={disabledAnnouncements[currentState]}
            message={questionInput}
            onMessageChange={m => setQuestionInput(m)}>
            <ul className="message-area-messages">
                <li className="message-area-instructions message-area-item">
                    <InstructionMessage content={t('playroom_instructions_judge')} />
                </li>
            </ul>
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
};

export default JudgeMessenger;
