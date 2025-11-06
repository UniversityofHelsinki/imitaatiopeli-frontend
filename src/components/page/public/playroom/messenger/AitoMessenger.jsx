import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AitoMessenger.css';
import Messenger from './Messenger';
import useAnswerQuestion from '../../../../../hooks/useAnswerQuestion';
import { WaitingAnnouncement } from '../Playroom';
import { useTranslation } from 'react-i18next';
import Message, { InstructionMessage } from './Message';
import { useWaitEndJudging } from '../../../../../hooks/useEndJudging';

const AitoMessenger = ({
                           game, question, onQuestionAnswered, judgingEnded
                       }) => {
    const { t } = useTranslation();
    const [currentState, setCurrentState] = useState('wait');
    const [answer, setAnswer] = useState('');
    const [askedQuestion, setAskedQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const { sendAnswer } = useAnswerQuestion(game);
    console.log('judgingEnded', judgingEnded);

    useEffect(() => {
        console.log('Question changed:', question);
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
        setAnswer('');
        setAskedQuestion(null);
        setCurrentState('wait');
        try {
            const result = await sendAnswer(answerContent, question);
            console.log('Answer sent successfully:', result);
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
      message={answer}
      onMessageChange={m => setAnswer(m)}
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
};

export default AitoMessenger;
