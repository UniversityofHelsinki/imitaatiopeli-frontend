import React from 'react';
import PropTypes from 'prop-types';
import './MessageArea.css'
import { useTranslation } from 'react-i18next';
import Message, { InstructionMessage } from './Message';

const MessageArea = ({
   instructions = '',
   messages = []
}) => {
  const { t } = useTranslation();

  return (
    <div className="messenger-message-area">
      <ul className="message-area-messages">
        {instructions && <li className="message-area-instructions message-area-item">
          <InstructionMessage content={instructions} />
        </li>}
        {messages.filter(r => r).map((msg, i) => (
          <li key={`${msg}-${i}`} className={`message-area-item message-area-item-${msg.type}`}>
            <Message>{msg.content}</Message>
          </li>
        ))}
      </ul>
    </div>
  );

};

MessageArea.propTypes = {
  instructions: PropTypes.string,
  messages: PropTypes.array,
};

export default MessageArea;