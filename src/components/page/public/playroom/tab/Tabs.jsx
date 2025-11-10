import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './Tabs.css'

const TabHeading = ({ 
  heading, 
  notification = null,
  active = false,
  onClick
}) => {

  const [notificationCleared, setNotificationCleared] = useState(false);

  
  useEffect(() => {
    setNotificationCleared(false);
  }, [notification]);
  

  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick(heading);
    }
    setNotificationCleared(true);
  };

  const activeClass = active ? 'tab-heading-active' : '';
  const notificationClass = notification && !notificationCleared && !active ? 'tab-heading-notify' : '';
  const showNotification = notificationClass;

  return (
    <button className={`tab-heading ${activeClass} ${notificationClass}`} onClick={handleClick}>
      <div className="tab-heading-label">
        {heading}
      </div>
      <div className="tab-heading-notification" aria-live="polite">
        {showNotification && notification}
      </div>
    </button>
  );
};

const Tabs = ({ 
  tabs = [],
  onTabSwitch = () => {}
}) => {

  const [activeTab, setActiveTab] = useState(0);

  const children = useMemo(
    () => tabs.map(t => t.children),
    [tabs.map(t => t.children)]
  );

  const switchTab = (i) => {
    setActiveTab(i);
  };

  const headings = tabs.map((tab, i) => (
    <TabHeading 
      key={tab.heading} 
      heading={tab.heading} 
      notification={tab.notification} 
      active={activeTab === i} 
      onClick={() => switchTab(i)}
    />
  ));

  return (
    <div className="tabs">
      <div className="tabs-headings">
        {headings}
      </div>
      <div className="tabs-active-tab">
        {children[activeTab]}
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