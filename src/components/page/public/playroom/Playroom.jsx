import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Playroom.css';
import PublicPage from '../PublicPage';
import Tabs from './tab/Tabs';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../misc/ds/Spinner';
import { useParams } from 'react-router-dom';
import JudgeMessenger from './messenger/JudgeMessenger';
import AitoMessenger from './messenger/AitoMessenger';
import useWaitQuestion from '../../../../hooks/useWaitQuestion.js';
import useWaitAnswers from '../../../../hooks/useWaitAnswers.js';
import useGetInitialQuestion from '../../../../hooks/useGetInitialQuestion.js';
import useGetInitialAnswers from '../../../../hooks/useGetInitialAnswers.js';
import useJudgeAskedQuestion from '../../../../hooks/useJudgeAskedQuestion.js';

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
    let { question, clearQuestion } = useWaitQuestion();
    let { answers, clearAnswers, changeAnswers } = useWaitAnswers();
    const {initialQuestion, clearInitialQuestion} = useGetInitialQuestion(code);
    const {initialAnswers, clearInitialAnswers} = useGetInitialAnswers(code);
    const [askedQuestion, setAskedQuestion] = useJudgeAskedQuestion();

    if (!question && initialQuestion && Object.keys(initialQuestion).length > 0) {
        question = {};
        question.questionId = initialQuestion.question_id;
        question.gameId = initialQuestion.game_id;
        question.content = initialQuestion.question_text;
        question.judgeId = initialQuestion.judge_id;
        question.created = initialQuestion.created;
        question.type = 'received';
    }

    if ((!answers || answers.length === 0) && initialAnswers?.length > 0) {
        const newAnswers = initialAnswers.map(answer => ({
            ...answer,
            content: answer.answer_text,
        }));

        setAskedQuestion({ content: initialAnswers[0].answer_text, type: 'sent' });
        changeAnswers(newAnswers);
    }


    const onQuestionAnswered = () => {
        console.log('clearing question');
        clearQuestion();
        clearInitialQuestion();
    };

    const onRateSubmitted = () => {
        console.log('HIT');
        clearAnswers();
        clearInitialAnswers();
        console.log(answers);
    }

    const tabs = [
        {
            heading: t('playroom_heading_judge'),
            children: (
                <JudgeMessenger game={code} answers={answers} onRateSubmitted={onRateSubmitted}   />
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
