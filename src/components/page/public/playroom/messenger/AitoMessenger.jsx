import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './AitoMessenger.css'
import Messenger from './Messenger';
import useAnswerQuestion from '../../../../../hooks/useAnswerQuestion';
import { WaitingAnnouncement } from '../Playroom';
import { useTranslation } from 'react-i18next';
import Message, { InstructionMessage } from './Message';

const AitoMessenger = ({
  game, question
}) => {
  const { t } = useTranslation();
  const [currentState, setCurrentState] = useState('wait');
  const [answer, setAnswer] = useState('');
  const [messages, setMessages] = useState([]);
  const { sendAnswer } = useAnswerQuestion(game);

     useEffect(() => {
         if (question) {
             setCurrentState('answer');
         }
    }, [question, currentState]);

    const answerQuestion = async (answerContent) => {
        // Add the answer to messages
        setMessages(prev => [...prev, {
            content: answerContent,
            type: 'sent'
        }]);

        try {
            await sendAnswer(answerContent, question);
        } catch (error) {
            console.error('Error sending answer:', error);
        }

        setAnswer('');
        setCurrentState('wait');
    };

  const disabledAnnouncements = {
    wait: <WaitingAnnouncement content={t('playroom_waiting_for_questions')} />
  };

  return (
    <Messenger
      onMessageSubmit={answerQuestion}
      messageFieldDisabled={currentState !== 'answer'}
      announcement={disabledAnnouncements[currentState]}
      message={answer}
      onMessageChange={m => setAnswer(m)}
    >
      <ul className="message-area-messages">
        <li className="message-area-instructions message-area-item">
          <InstructionMessage content={t('playroom_instructions_aito')} />
        </li>
        {[question].map((msg, i) => (
          <li key={`${msg.type}-i`} className={`message-area-item message-area-item-${msg.type}`}>
            <Message>{msg.content}</Message>
          </li>
        ))}
      </ul>
    </Messenger>
  )
};

AitoMessenger.propTypes = {
  game: PropTypes.string,
};

export default AitoMessenger;