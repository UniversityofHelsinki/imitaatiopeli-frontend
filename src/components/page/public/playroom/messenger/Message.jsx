import React from 'react';
import PropTypes from 'prop-types';
import './Message.css'

export const InstructionMessage = ({ content }) => {
  return (
    <div className="messenger-message messenger-message-instructions">
      {content}
    </div>
  )
};

InstructionMessage.propTypes = {
  content: PropTypes.node,
}

const Message = ({ children }) => {
  return (
    <div className="messenger-message">
      {children}
    </div>
  );
};

Message.propTypes = {
  children: PropTypes.node,
};

export default Message;