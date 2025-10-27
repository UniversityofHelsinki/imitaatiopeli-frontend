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
import useWaitQuestion from "../../../../hooks/useWaitQuestion.js";
import useWaitAnswers from "../../../../hooks/useWaitAnswers.js";
import localStorage from "../../../../utilities/localStorage.js";

export const WaitingAnnouncement = ({ content, showSpinner = true }) => {
  return (
    <div className="playroom-waiting-announcement">
      {showSpinner
        && <Spinner text={content} position="right" />
        || <span>{content}</span>}
    </div>
  )
};

const getPlayer = () => localStorage.get('player');

WaitingAnnouncement.propTypes = {
  content: PropTypes.string,
  showSpinner: PropTypes.bool,
};

const Playroom = () => {

  const [activeTab, setActiveTab] = useState(0);
  const { code } = useParams();
  const { t } = useTranslation();
  const { question, clearQuestion } = useWaitQuestion();
  const { answers, clearAnswers } = useWaitAnswers();
  const player = getPlayer();

  const onQuestionAnswered = () => {
      console.log('clearing question');
      clearQuestion();
  };

  const onRateSubmitted = () => {
      console.log('HIT');
      clearAnswers();
      console.log(answers);
  }

  const tabs = [
    {
      heading: t('playroom_heading_judge'),
      children: (
        <JudgeMessenger game={code} answers={answers} onRateSubmitted={onRateSubmitted} />
      )
    },
    {
      heading: t('playroom_heading_aito'),
      notification: question ? t('playroom_notification_new_messages') : null,
      children: (
        <AitoMessenger game={code} question={question} onQuestionAnswered={onQuestionAnswered}  />
      )
    }
  ];

  tabs[activeTab].active = true;

  const switchTab = (heading) => {
    setActiveTab(tabs.findIndex(t => t.heading === heading));
  };

  return (
    <PublicPage heading={player?.theme_description} >
      <div className="playroom">
        <Tabs tabs={tabs} onTabSwitch={switchTab} />
      </div>
    </PublicPage>
  );

};

Playroom.propTypes = {
};

export default Playroom;
