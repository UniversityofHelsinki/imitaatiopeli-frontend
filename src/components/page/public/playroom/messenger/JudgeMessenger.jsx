import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JudgeMessenger.css'
import { useTranslation } from 'react-i18next';
import useAskQuestion from '../../../../../hooks/useAskQuestion';
import { WaitingAnnouncement } from '../Playroom';
import Messenger from './Messenger';
import { InstructionMessage } from './Message';
import RatingForm from './RatingForm';


const JudgeMessenger = ({
  game
}) => {
  const { t } = useTranslation();
  const ask = useAskQuestion(game);
  const [currentState, setCurrentState] = useState('rate');
  const [question, setQuestion] = useState('');

  const disabledAnnouncements = {
    'wait': <WaitingAnnouncement content={t('playroom_waiting_for_answers')} />,
    'rate': <WaitingAnnouncement content={t('playroom_waiting_for_rating')} showSpinner={false} />
  };

  const askQuestion = async (question) => {
    await ask(question);
    setCurrentState('wait');
  };

  return (
    <Messenger 
      onMessageSubmit={askQuestion}
      messageFieldDisabled={currentState !== 'ask'}
      announcement={disabledAnnouncements[currentState]}
      message={question}
      onMessageChange={m => setQuestion(m)}>
        <ul className="message-area-messages">
          <li className="message-area-instructions message-area-item">
            <InstructionMessage content={t('playroom_instructions_judge')} />
          </li>
        </ul>
        <RatingForm 
          question={{ content: 'AAAAAA?', type: 'sent' }}
          answers={[{ content: 'ASJLAJLJAS', type: 'received' }, { content: 'KKKKK', type: 'received' }]}
          onSubmit={console.log}
        />
    </Messenger>
  );

};

JudgeMessenger.propTypes = {
  game: PropTypes.string,
};

export default JudgeMessenger;