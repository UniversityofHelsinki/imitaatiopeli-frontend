import React from 'react';
import PropTypes from 'prop-types';
import './AssistiveText.css';

const AssistiveText = ({ id, children }) => {

  return (
    <span id={id} className="ds-assistive-text">
      {children}
    </span>
  );

};

AssistiveText.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default AssistiveText;