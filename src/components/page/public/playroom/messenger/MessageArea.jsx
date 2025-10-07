import React from 'react';
import PropTypes from 'prop-types';
import './MessageArea.css'

const MessageArea = ({
   children
}) => {

  return (
    <div className="messenger-message-area">
      {children}
    </div>
  );

};

MessageArea.propTypes = {
  instructions: PropTypes.string,
  children: PropTypes.node,
};

export default MessageArea;