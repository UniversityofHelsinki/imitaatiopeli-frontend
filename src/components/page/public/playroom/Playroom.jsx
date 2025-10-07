import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './Playroom.css'
import PublicPage from '../PublicPage';
import Tabs from './tab/Tabs';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../misc/ds/Spinner';
import { useParams } from 'react-router-dom';
import JudgeMessenger from './messenger/JudgeMessenger';
import AitoMessenger from './messenger/AitoMessenger';

export const WaitingAnnouncement = ({ content, showSpinner = true }) => {
  return (
    <div className="playroom-waiting-announcement">
      {showSpinner
        && <Spinner text={content} position="right" />
        || <span>{content}</span>}
    </div>
  )
};

WaitingAnnouncement.propTypes = {
  content: PropTypes.string,
  showSpinner: PropTypes.bool,
};

const Playroom = () => {

  const [activeTab, setActiveTab] = useState(0);
  const { code } = useParams();
  const { t } = useTranslation();

  const tabs = [
    {
      heading: t('playroom_heading_judge'),
      children: (
        <JudgeMessenger game={code} />
      )
    },
    {
      heading: t('playroom_heading_aito'),
      notification: t('playroom_notification_new_messages'),
      children: (
        <AitoMessenger game={code} />
      )
    }
  ];

  tabs[activeTab].active = true;

  const switchTab = (heading) => {
    setActiveTab(tabs.findIndex(t => t.heading === heading));
  };

  return (
    <PublicPage heading={t('playroom_page_heading')} >
      <div className="playroom">
        <Tabs tabs={tabs} onTabSwitch={switchTab} />
      </div>
    </PublicPage>
  );

};

Playroom.propTypes = {
};

export default Playroom;