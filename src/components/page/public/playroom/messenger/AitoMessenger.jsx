import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AitoMessenger.css';
import Messenger from './Messenger';
import useAnswerQuestion from '../../../../../hooks/useAnswerQuestion';
import { WaitingAnnouncement } from '../Playroom';
import { useTranslation } from 'react-i18next';
import Message, { InstructionMessage } from './Message';
import { useWaitEndJudging } from '../../../../../hooks/useEndJudging';
import {useNavigate} from "react-router-dom";
import localStorage from "../../../../../utilities/localStorage.js";
import {useNotification} from "../../../../notification/NotificationContext.jsx";

const AitoMessenger = ({
                           game, question, onQuestionAnswered, judgingEnded, judgeState, gameId, input, onInputChange
                       }) => {
    const { t } = useTranslation();
    const [currentState, setCurrentState] = useState('wait');
    const [askedQuestion, setAskedQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const { sendAnswer } = useAnswerQuestion(game);
    const navigate = useNavigate();
    const { setNotification } = useNotification();

    console.log('judgingEnded', judgingEnded);

    useEffect(() => {
        console.log('Question changed:', question);
        if (judgeState === 'end' && judgingEnded) {
            localStorage.clear();
            navigate(`/games/${gameId}/gameend`, { state: { reason: 'game_end_reason_game_ended' } });
        }
        if (judgingEnded) {
          setCurrentState('judging-ended');
        } else if (question) {
            setAskedQuestion(question);
            setCurrentState('answer');
        } else {
            setCurrentState('wait');
        }
    }, [question, judgingEnded]);

    const answerQuestion = async (answerContent) => {
        console.log('current state:', currentState);
        onInputChange('');
        setAskedQuestion(null);
        setCurrentState('wait');
        try {
            const result = await sendAnswer(answerContent, question);
            console.log('Answer sent successfully:', result);
            setNotification(t('answer_sent_success_notification'), 'success', true);
            if (result) {
                setMessages(prev => [...prev, {
                    content: result,
                    type: 'received'
                }]);
                onQuestionAnswered();
                console.log(currentState);
                console.log(askedQuestion);
            }
        } catch (error) {
            setNotification(error.cause?.status, 'error', true);
            console.error('Error sending answer:', error);
        }
    };

    const disabledAnnouncements = {
        wait: <WaitingAnnouncement content={t('playroom_waiting_for_questions')} />,
        'judging-ended': <WaitingAnnouncement content={t('playroom_no_more_answers_accepted')} showSpinner={false} />
    };

  return (
    <Messenger
      onMessageSubmit={answerQuestion}
      messageFieldDisabled={currentState !== 'answer'}
      announcement={disabledAnnouncements[currentState]}
      message={input}
      onMessageChange={onInputChange}
      msglength={500}
    >
      <ul className="message-area-messages">
        <li className="message-area-instructions message-area-item">
          <InstructionMessage content={t('playroom_instructions_aito')} />
        </li>
          {askedQuestion && (
              <li key={`question-0`} className={`message-area-item message-area-item-${askedQuestion.type}`}>
                  <Message>{askedQuestion.content}</Message>
              </li>
          )}
      </ul>
    </Messenger>
  );
};

AitoMessenger.propTypes = {
    game: PropTypes.string,
    question: PropTypes.object,
    onQuestionAnswered: PropTypes.func,
    input: PropTypes.string,
    onInputChange: PropTypes.func,
};

export default AitoMessenger;
