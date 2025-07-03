import React from 'react';
import PropTypes from 'prop-types';
import './HyMenuLabel.css';
import DsIcon from './ds/Icon';

const HyMenuLabel = ({ Icon, caretUp, children }) => {

  const caretUpIcon = <DsIcon name="keyboard_arrow_up" />; 
  const caretDownIcon = <DsIcon name="keyboard_arrow_down" />; 

  return (
    <div className="hy-menu-label">
      <div className="hy-menu-label-icon">
        <Icon />
      </div>
      <span className="hy-menu-label-content">
        {children}
      </span>
      <div className="hy-menu-label-caret">
        {caretUp ? caretUpIcon : caretDownIcon }
      </div>
    </div>
  );
};

HyMenuLabel.propTypes = {
  Icon: PropTypes.object,
  caretUp: PropTypes.bool,
  children: PropTypes.node
};

export default HyMenuLabel;
