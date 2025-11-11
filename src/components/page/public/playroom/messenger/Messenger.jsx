import React, { useEffect, useId, useState } from 'react';
import PropTypes from 'prop-types';
import './Messenger.css'
import MessageArea from './MessageArea';
import MessageField from './MessageField';

const Messenger = ({ 
  messageFieldDisabled,
  announcement,
  onMessageSubmit,
  message,
  onMessageChange,
  children,
  msglength = null
}) => {

  const handleMessageSubmit = (message) => {
    if (onMessageSubmit) {
      onMessageSubmit(message);
      onMessageChange('');
    }
  };

  return (
      <div className="messenger">
        <MessageArea>
          {children}
        </MessageArea>
        <MessageField
          onSubmit={handleMessageSubmit}
          onChange={onMessageChange}
          disabled={messageFieldDisabled}
          announcement={announcement}
          message={message}
          msglength={msglength}
        />
      </div>
  );

};

Messenger.propTypes = {
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
