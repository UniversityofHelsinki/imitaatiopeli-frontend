import React from 'react';
import PropTypes from 'prop-types';
import './Tab.css'

const TabContent = ({ children }) => {
  return (
    <div className="tab-content">
    </div>
  );
};

TabContent.propTypes = {
  children: PropTypes.node,
}

const Tab = ({
  children
}) => {

  return (
    <div className="tab">
      <TabContent>
        {children}
      </TabContent>
    </div>
  );
};

Tab.propTypes = {
  children: PropTypes.node
};

export default Tab;