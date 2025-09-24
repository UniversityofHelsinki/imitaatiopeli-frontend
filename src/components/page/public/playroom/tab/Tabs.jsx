import React from 'react';
import PropTypes from 'prop-types';
import './Tabs.css'

const TabHeading = ({ 
  heading, 
  notification = null,
  active = false,
  onClick
}) => {

  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick(heading);
    }
  };

  const activeClass = active ? 'tab-heading-active' : '';
  const notificationClass = notification ? 'tab-heading-notify' : '';

  return (
    <button className={`tab-heading ${activeClass} ${notificationClass}`} onClick={handleClick}>
      <div className="tab-heading-label">
        {heading}
      </div>
      <div className="tab-heading-notification" aria-live="polite">
        {notification}
      </div>
    </button>
  );
};


const Tabs = ({ 
  tabs = [],
  onTabSwitch = () => {}
}) => {

  const activeTab = tabs.find(tab => tab.active);
  const headings = tabs.map(tab => (
    <TabHeading 
      key={tab.heading} 
      heading={tab.heading} 
      notification={tab.notification} 
      active={tab.active} 
      onClick={onTabSwitch}
    />
  ));

  return (
    <div className="tabs">
      <div className="tabs-headings">
        {headings}
      </div>
      <div className="tabs-active-tab">
        {activeTab.children}
      </div>
    </div>
  );

};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.node,
    notification: PropTypes.string,
  })),
  onTabSwitch: PropTypes.func,
};

export default Tabs;