import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './JudgeMessenger.css';
import { useTranslation } from 'react-i18next';
import useAskQuestion from '../../../../../hooks/useAskQuestion';
import { WaitingAnnouncement } from '../Playroom';
import Messenger from './Messenger';
import { InstructionMessage } from './Message';
import RatingForm from './RatingForm';
import { useNotification } from '../../../../notification/NotificationContext.jsx';
import { useSocket } from '../../../../../contexts/SocketContext.jsx';
import FinalReview from './FinalReview';
import useJudgeAskedQuestion from '../../../../../hooks/useJudgeAskedQuestion.js';
import {useNavigate} from "react-router-dom";
import localStorage from "../../../../../utilities/localStorage.js";
import GameEnd from "./GameEnd.jsx";
import useFinalGuessResult from "../../../../../hooks/useFinalGuessResult.js";

const JudgeMessenger = ({ currentState, setCurrentState, game, answers, onRateSubmitted, stopJudging, summaryQuestions, gameId, judgeId, judgingEnded, input, onInputChange, ratingJustifications, onRatingJustificationsChange, ratingSelectedIndex, onRatingSelectedIndexChange, ratingConfidence, onRatingConfidenceChange
                        }) => {
    const { isConnected, emit } = useSocket();
    const { t } = useTranslation();
    const { askQuestion } = useAskQuestion(game);
    const [askedQuestion, setAskedQuestion] = useJudgeAskedQuestion();
    const { setNotification } = useNotification();
    const navigate = useNavigate();
    const playerId = localStorage.get('player')?.player_id;
    const { response, error, fetchFinalGuessResult } = useFinalGuessResult(gameId, playerId);
    const hasFetchedFinalResultRef = React.useRef(false);

    useEffect(() => {
        if (currentState !== 'end') {
            console.log('judge useEffect');
            if (currentState === 'rate' || currentState === 'final-review') {
                console.log('currentState', currentState);
            } else if (summaryQuestions && currentState !== 'end') {
                setCurrentState('final-review');
            } else if (answers && answers?.length > 0 && askedQuestion) {
                setCurrentState('rate');
            } else if (answers.length === 0 && askedQuestion && currentState !== 'end') {
                setCurrentState('wait');
            } else if (currentState !== 'end') {
                setCurrentState('ask');
            }
        }
    }, [answers, askedQuestion, summaryQuestions, currentState]);

    useEffect(() => {
        const handleFetch = async () => {
            if (judgingEnded && currentState === 'end' && !hasFetchedFinalResultRef.current) {
                hasFetchedFinalResultRef.current = true;
                try {
                    const result = await fetchFinalGuessResult({ waitForResult: true, timeoutMs: 7000, intervalMs: 400 });
                    //console.log('RESPONSE_JUDGE:', JSON.stringify(result, null, 2));
                    const finalResult = result?.show_result === true ? result?.final_was_correct : null;
                    const finalGuessResult = finalResult ?? null;
                    const finalGuessText = finalGuessResult === true ? 'game_final_guess_correct' : finalGuessResult === false ? 'game_final_guess_incorrect' : null;
                    localStorage.clear();
                    navigate(`/games/${gameId}/gameend`, { state: { reason: 'game_end_reason_game_ended',  gameresult: finalGuessText } });
                } catch (err) {
                    console.error('Error fetching final guess result:', err);
                    // Allow retry if it failed
                    hasFetchedFinalResultRef.current = false;
                }
            }
        }
        handleFetch();
    }, [judgingEnded, currentState, gameId, fetchFinalGuessResult, navigate]);


    const handleAskQuestion = async (questionText) => {
        try {
            await askQuestion(questionText);
            setAskedQuestion({ content: questionText, type: 'sent' });
            setNotification(t('question_sent_success_notification'), 'success', true);
            setCurrentState('wait');
        } catch (error) {
            console.error('Failed to ask question:', error);
            setCurrentState('ask');
            setNotification(t('judge_messenger_send_question_error_notification'), 'error', true);
        }
    };

    const disabledAnnouncements = {
        'wait': <WaitingAnnouncement content={t('playroom_waiting_for_answers')} />,
        'rate': <WaitingAnnouncement content={t('playroom_waiting_for_rating')} showSpinner={false} />
    };

    const handleRatingSubmit = (data) => {
        if (isConnected) {
            emit('send-guess-to-answer', {
                answerId: data.selectedAnswer.content.answer_id,
                confidence: data.confidence,
                argument: data.justifications
            });
            setAskedQuestion(null);
            setCurrentState('ask');
            onRatingJustificationsChange?.('');
            onRatingSelectedIndexChange?.(null);
            onRatingConfidenceChange?.(null);
            onRateSubmitted();
        }
    };

    const endJudging = async (data) => {
        await stopJudging(game, {
            answerId: data.selectedAnswer.content.answer_id,
            confidence: data.confidence,
            argument: data.justifications
        });
        onRatingJustificationsChange?.('');
        onRatingSelectedIndexChange?.(null);
        onRatingConfidenceChange?.(null);
        setCurrentState('final-review');
    };

    const finalReview = (() => {
        if (currentState === 'final-review' && summaryQuestions) {
            return (
                <FinalReview
                    messages={summaryQuestions}
                    gameId={gameId}
                    judgeId={judgeId}
                    setCurrentState={setCurrentState}
                />
            );
        }
        return <></>;
    })();

    const end = (() => {
        if (currentState === 'end') {
            return (
                <GameEnd reason={'game_end_reason_by_judge'} />
            )
        }
    })();

    return (
        <Messenger
            onMessageSubmit={handleAskQuestion}
            messageFieldDisabled={currentState !== 'ask'}
            announcement={disabledAnnouncements[currentState]}
            messageFieldHidden={['final-review', 'end', 'rate'].includes(currentState)}
            message={input}
            onMessageChange={onInputChange}
            msglength={2000}
        >
            {currentState !== 'final-review' && <ul className="message-area-messages">
                <li className="message-area-instructions message-area-item">
                    <InstructionMessage content={t('playroom_instructions_judge')} />
                </li>
            </ul> || finalReview}
            {currentState === 'rate' && askedQuestion &&
                <RatingForm
                    question={askedQuestion}
                    answers={ answers }
                    onSubmit={handleRatingSubmit}
                    onEndGame={endJudging}
                    justifications={ratingJustifications}
                    onJustificationsChange={onRatingJustificationsChange}
                    selectedIndex={ratingSelectedIndex}
                    onSelectedIndexChange={onRatingSelectedIndexChange}
                    confidence={ratingConfidence}
                    onConfidenceChange={onRatingConfidenceChange}
                />}
            {currentState === 'end' && end}

        </Messenger>
    );
};

JudgeMessenger.propTypes = {
    game: PropTypes.string,
    answers: PropTypes.array,
    onRateSubmitted: PropTypes.func,
    currentState: PropTypes.string,
    setCurrentState: PropTypes.func,
    stopJudging: PropTypes.func,
    summaryQuestions: PropTypes.object,
    gameId: PropTypes.number.isRequired,
    judgeId: PropTypes.number.isRequired,
    input: PropTypes.string,
    onInputChange: PropTypes.func,
    ratingJustifications: PropTypes.string,
    onRatingJustificationsChange: PropTypes.func,
    ratingSelectedIndex: PropTypes.number,
    onRatingSelectedIndexChange: PropTypes.func,
    ratingConfidence: PropTypes.number,
    onRatingConfidenceChange: PropTypes.func,
};

export default JudgeMessenger;
