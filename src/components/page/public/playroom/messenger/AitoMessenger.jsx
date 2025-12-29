import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AitoMessenger.css';
import Messenger from './Messenger';
import useAnswerQuestion from '../../../../../hooks/useAnswerQuestion';
import { WaitingAnnouncement } from '../Playroom';
import { useTranslation } from 'react-i18next';
import Message, { InstructionMessage } from './Message';
import { useNavigate } from "react-router-dom";
import localStorage from "../../../../../utilities/localStorage.js";
import { useNotification } from "../../../../notification/NotificationContext.jsx";
import useFinalGuessResult from "../../../../../hooks/useFinalGuessResult.js";

const AitoMessenger = ({
                           game, question, onQuestionAnswered, judgingEnded, judgeState, gameId, input, onInputChange
                       }) => {
    const { t } = useTranslation();
    const [currentState, setCurrentState] = useState('wait');
    const [askedQuestion, setAskedQuestion] = useState(null);
    const [answeredQuestionId, setAnsweredQuestionId] = useState(null);
    const { sendAnswer } = useAnswerQuestion(game);
    const navigate = useNavigate();
    const { setNotification } = useNotification();

    const playerId = localStorage.get('player')?.player_id;
    const { fetchFinalGuessResult } = useFinalGuessResult(gameId, playerId);
    const hasFetchedFinalResultRef = React.useRef(false);

    // Handle final guess result when judging ends
    useEffect(() => {
        const handleFetch = async () => {
            if (judgeState === 'end' && judgingEnded && !hasFetchedFinalResultRef.current) {
                hasFetchedFinalResultRef.current = true;
                try {
                    const result = await fetchFinalGuessResult({ waitForResult: true, timeoutMs: 7000, intervalMs: 400 });
                    const finalResult = result?.show_result === true ? result?.final_was_correct : null;
                    const finalGuessText = finalResult === true ? 'game_final_guess_correct' : finalResult === false ? 'game_final_guess_incorrect' : null;
                    localStorage.clear();
                    navigate(`/games/${gameId}/gameend`, { state: { reason: 'game_end_reason_game_ended', gameresult: finalGuessText } });
                } catch (err) {
                    console.error('Error fetching final guess result:', err);
                    hasFetchedFinalResultRef.current = false;
                }
            }
        }
        handleFetch();
    }, [judgingEnded, judgeState, fetchFinalGuessResult, navigate]);

    // Handle state changes based on judging status
    useEffect(() => {
        if (judgingEnded) {
            setCurrentState('judging-ended');
            setAskedQuestion(null);
        } else {
            setCurrentState('wait');
        }
    }, [judgingEnded]);

    // Handle incoming questions
    useEffect(() => {
        if (question && !judgingEnded && (!askedQuestion || question.id !== askedQuestion.id)) {
            setAskedQuestion(question);
            setAnsweredQuestionId(null);
            setCurrentState('answer');
        }
    }, [question, judgingEnded]);

    const answerQuestion = async (answerContent) => {
        onInputChange('');
        setAskedQuestion(null);
        setAnsweredQuestionId(question.id);
        setCurrentState('wait');
        try {
            await sendAnswer(answerContent, question);
            setNotification(t('answer_sent_success_notification'), 'success', true);
            onQuestionAnswered();
        } catch (error) {
            setNotification(t(error?.error ?? 'judge_messenger_send_answer_error_notification'), 'error', true);
            console.error('Error sending answer:', error);
            setAnsweredQuestionId(null);
        }
    };

    const disabledAnnouncements = {
        wait: <WaitingAnnouncement content={t('playroom_waiting_for_questions')} />,
        'judging-ended': <WaitingAnnouncement content={<strong>{t('playroom_no_more_answers_accepted')}</strong>} showSpinner={false} />
    };

    return (
        <Messenger
            onMessageSubmit={answerQuestion}
            messageFieldDisabled={currentState !== 'answer'}
            message={input}
            onMessageChange={onInputChange}
            msglength={2000}
            storageKey="messageArea.aitoMessenger.showInstructions"
        >
            <ul className="message-area-messages">
                <li className="message-area-instructions message-area-item">
                    <InstructionMessage content={t('playroom_instructions_aito')} />
                </li>
                {(currentState !== 'answer' || judgeState === 'end') && (
                    <li className="message-area-item">
                        {disabledAnnouncements[currentState]}
                    </li>
                )}
                {askedQuestion && (
                    <li key={`question-${askedQuestion.id}`} className={`message-area-item message-area-item-${askedQuestion.type}`}>
                        <Message>{askedQuestion.content}</Message>
                    </li>
                )}
            </ul>
        </Messenger>
    );
};

AitoMessenger.propTypes = {
    game: PropTypes.string,
    question: PropTypes.object,
    onQuestionAnswered: PropTypes.func,
    input: PropTypes.string,
    onInputChange: PropTypes.func,
};

export default AitoMessenger;
