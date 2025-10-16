import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './JudgeMessenger.css'
import { useTranslation } from 'react-i18next';
import useAskQuestion from '../../../../../hooks/useAskQuestion';
import { WaitingAnnouncement } from '../Playroom';
import Messenger from './Messenger';
import { InstructionMessage } from './Message';
import RatingForm from './RatingForm';


const JudgeMessenger = ({
  game, answers
}) => {
  const { t } = useTranslation();
  const ask = useAskQuestion(game);
  const [currentState, setCurrentState] = useState('ask');
  const [question, setQuestion] = useState('');

    useEffect(() => {
        if (answers && answers.length > 0) {
            setCurrentState('rate'); // vai rate
        }
    }, [answers]);

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
          answers={ answers }
          onSubmit={console.log}
        />
    </Messenger>
  );

};

JudgeMessenger.propTypes = {
  game: PropTypes.string,
};

export default JudgeMessenger;