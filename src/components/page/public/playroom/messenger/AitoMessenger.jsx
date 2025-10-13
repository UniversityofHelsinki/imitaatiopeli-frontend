import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AitoMessenger.css'
import Messenger from './Messenger';
import useAnswerQuestion from '../../../../../hooks/useAnswerQuestion';
import { WaitingAnnouncement } from '../Playroom';
import { useTranslation } from 'react-i18next';
import Message, { InstructionMessage } from './Message';
import { useSocket } from "../../../../../contexts/SocketContext.jsx";
import localStorage  from "../../../../../utilities/localStorage.js";
import useWaitQuestion from "../../../../../hooks/useWaitQuestion.js";

const AitoMessenger = ({
  game
}) => {
  const { t } = useTranslation();

  const messages = [
    {
      content: 'AAAAAA?' + ' game:' + game + ' player_id:' + localStorage.get("player").player_id,
      type: 'received'
    },
    {
      content: 'BBBBB AA asdf.',
      type: 'sent'
    }
  ]

  const [currentState, setCurrentState] = useState('answer');
  const [answer, setAnswer] = useState('');
  const [game_id, setGame_id] = useState(game);
  const waitQuestion = useWaitQuestion(game);
  const sendAnswer = useAnswerQuestion(game);
  const { isConnected, emit, on, off } = useSocket();
  const localPlayer = localStorage.get("player");

  const answerQuestion = async (answer) => {
    //await sendAnswer(answer);
      /*
        game_id, player_id, judge_id, question_id, question_text
      */
    if (isConnected) {
          emit('send-answer', {
              questionId: "4", //question_id,
              playerId: "9", //localPlayer.player_id,
              gameId: "4", //game_id,
              answer: answer,
              timestamp: Date.now()
          });
    }
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
        {messages.map((msg, i) => (
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