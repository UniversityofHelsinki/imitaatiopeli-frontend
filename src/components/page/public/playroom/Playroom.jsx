
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Playroom.css';
import PublicPage from '../PublicPage';
import Tabs from './tab/Tabs';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../misc/ds/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import JudgeMessenger from './messenger/JudgeMessenger';
import AitoMessenger from './messenger/AitoMessenger';
import useWaitQuestion from "../../../../hooks/useWaitQuestion.js";
import useWaitAnswers from "../../../../hooks/useWaitAnswers.js";
import localStorage from "../../../../utilities/localStorage.js";
import useGetInitialQuestion from '../../../../hooks/useGetInitialQuestion.js';
import useGetInitialAnswers from '../../../../hooks/useGetInitialAnswers.js';
import i18n from "i18next";
import useEndJudging, { useWaitEndJudging } from '../../../../hooks/useEndJudging';
import {useSocket} from "../../../../contexts/SocketContext.jsx";

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

    const { isConnected, on, off } = useSocket();
    const { code } = useParams();
    const { t } = useTranslation();
    let { question, clearQuestion } = useWaitQuestion();
    let { answers, clearAnswers, changeAnswers } = useWaitAnswers();
    const {initialQuestion} = useGetInitialQuestion(code);
    const {initialAnswers} = useGetInitialAnswers(code);
    const player = getPlayer();
    const judgingEnded = useWaitEndJudging();
    const { endJudging: stopJudging, questions: summaryQuestions } = useEndJudging();
    const [gameEnded, setGameEnded] = useState(false);
    const navigate = useNavigate();

    const [judgeState, setJudgeState] = React.useState(() => {
        try {
            return localStorage.get(`judgeState:${code}`) || '';
        } catch {
            return '';
        }
    });

    // Listen for game-ended event from Socket.IO
    useEffect(() => {
        const handleGameEnded = (data) => {
            const { gameId, message } = data;
            console.log('Game ended event received:', data);
            console.log('Current game ID:', code);

            const socketGameId = String(gameId);
            const currentGameId = String(code);

            if (socketGameId === currentGameId) {
                setGameEnded(true);
                navigate(`/games/${gameId}/endbyadmin`);
            }
        };

        localStorage.clear();

        const handleMessage = (data) => {
            console.log('Message from backend:', data);
        };

        // Listen for socket events
        on('game-ended', handleGameEnded);
        on('message', handleMessage);

        return () => {
            off('game-ended', handleGameEnded);
            off('message', handleMessage);
        };
    }, [on, off, isConnected, code]);


    useEffect(() => {
        if (code && (!player || player.game_id !== parseInt(code))) {
            localStorage.clear();
            navigate(`/`);
        }
    }, [code, player]);

    useEffect(() => {
        try {
            if (code) localStorage.set(`judgeState:${code}`, judgeState);
        } catch {
            // ignore write failures (e.g., private mode)
        }
    }, [code, judgeState]);

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

    // Get gameId and judgeId
    const gameId = question?.gameId || initialQuestion?.game_id || player?.game_id;
    const judgeId = question?.judgeId || initialQuestion?.judge_id || player?.player_id;

    const tabs = [
        {
            heading: t('playroom_heading_judge'),
            notification: answers?.length > 0 ? t('playroom_notification_new_messages') : null,
            children: <JudgeMessenger
                currentState={judgeState}
                setCurrentState={setJudgeState}
                game={code}
                answers={answers}
                onRateSubmitted={onRateSubmitted}
                stopJudging={stopJudging}
                summaryQuestions={summaryQuestions}
                gameId={gameId}
                judgeId={judgeId}
            />,
        },
        {
            heading: t('playroom_heading_aito'),
            notification: question ? t('playroom_notification_new_messages') : null,
            children: <AitoMessenger game={code} question={question} onQuestionAnswered={onQuestionAnswered} judgingEnded={judgingEnded} />,
        }
    ];

    return (
        <PublicPage heading={player?.theme_description} >
            <div className="playroom">
                <Tabs tabs={tabs} />
            </div>
        </PublicPage>
    );

};

Playroom.propTypes = {
};

export default Playroom;
