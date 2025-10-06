import React, { useId } from 'react';
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

export const RatingMessage = ({ i, name, children }) => {
  const id = useId();
  return (
    <div className="messenger-message rating-message">
      <span>{i+1}.</span>
      <input name={name} type="radio" value={i} id={id} />
      <label htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

RatingMessage.propTypes = {
  i: PropTypes.number,
  name: PropTypes.string,
  children: PropTypes.node,
};

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