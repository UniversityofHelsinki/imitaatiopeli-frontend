import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Playroom.css';
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
import useGetInitialQuestion from '../../../../hooks/useGetInitialQuestion.js';
import useGetInitialAnswers from '../../../../hooks/useGetInitialAnswers.js';
import i18n from "i18next";

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
    let { question, clearQuestion } = useWaitQuestion();
    let { answers, clearAnswers, changeAnswers } = useWaitAnswers();
    const {initialQuestion, clearInitialQuestion} = useGetInitialQuestion(code);
    const {initialAnswers, clearInitialAnswers} = useGetInitialAnswers(code);
    const player = getPlayer();

    useEffect(() => {
        const player = localStorage.get('player');
        const languageUsed = player?.language_used;

        if (languageUsed && i18n.language !== languageUsed) {
            i18n.changeLanguage(languageUsed);
            document.documentElement.lang = languageUsed;
        }
    }, [i18n]);

    if (!question && initialQuestion && Object.keys(initialQuestion).length > 0) {
        question = {};
        question.questionId = initialQuestion.question_id;
        question.gameId = initialQuestion.game_id;
        question.content = initialQuestion.question_text;
        question.judgeId = initialQuestion.judge_id;
        question.created = initialQuestion.created;
        question.type = 'received';
    }

    useEffect(() => {
        console.log(answers);
        console.log(initialAnswers);
        if ((!answers || answers.length === 0) && initialAnswers?.length > 0) {
            const newAnswers = initialAnswers.map(initialAnswer => ({
                ...answers,
                content: initialAnswer
            }));
            changeAnswers(newAnswers);
            console.log(answers);
        }
    }, [answers, initialAnswers]);


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
            active: activeTab  === 0,
            notification: answers?.length > 0 && activeTab !== 0 ? t('playroom_notification_new_messages') : null,
            children: (
                <JudgeMessenger game={code} answers={answers} onRateSubmitted={onRateSubmitted} />
            )
        },
        {
            heading: t('playroom_heading_aito'),
            active: activeTab  === 1,
            notification: question && activeTab !== 1 ? t('playroom_notification_new_messages') : null,
            children: (
                <AitoMessenger game={code} question={question} onQuestionAnswered={onQuestionAnswered}  />
            )
        }
  ];

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
