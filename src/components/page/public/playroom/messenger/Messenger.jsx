import React, { useEffect, useId, useState } from 'react';
import PropTypes from 'prop-types';
import './Messenger.css'
import MessageArea from './MessageArea';
import MessageField from './MessageField';

const Messenger = ({ 
  instructions, 
  messageFieldDisabled,
  announcement,
  onMessageSubmit,
  message,
  messages,
  onMessageChange
}) => {

  const handleMessageSubmit = (message) => {
    if (onMessageSubmit) {
      onMessageSubmit(message);
      onMessageChange('');
    }
  };

  return (
      <div className="messenger">
        <MessageArea instructions={instructions} messages={messages} />
        <MessageField
          onSubmit={handleMessageSubmit}
          onChange={onMessageChange}
          disabled={messageFieldDisabled}
          announcement={announcement}
          message={message}
        />
      </div>
  );

};

Messenger.propTypes = {
  instructions: PropTypes.string,
  messageFieldDisabled: PropTypes.bool,
  announcement: PropTypes.node,
  onMessageSubmit: PropTypes.func,
  received: PropTypes.array,
  messages: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['received', 'sent'])
  })),
};

export default Messenger;