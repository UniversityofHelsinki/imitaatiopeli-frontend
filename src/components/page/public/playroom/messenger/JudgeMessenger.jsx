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
import useJudgeStatus from "../../../../../hooks/useJudgeStatus.js";

const JudgeMessenger = ({ currentState, setCurrentState, game, answers, onRateSubmitted, stopJudging, summaryQuestions, gameId, judgeId, judgingEnded, input, onInputChange, ratingJustifications, onRatingJustificationsChange, ratingSelectedIndex, onRatingSelectedIndexChange, ratingConfidence, onRatingConfidenceChange
                        }) => {
    const { judgeStatus, errorMsg, fetchNowAsync, setJudgeStatus } = useJudgeStatus();
    const { isConnected, emit } = useSocket();
    const { t } = useTranslation();
    const { askQuestion } = useAskQuestion(game);
    const [askedQuestion, setAskedQuestion] = useJudgeAskedQuestion();
    const { setNotification } = useNotification();
    const navigate = useNavigate();
    const playerId = localStorage.get('player')?.player_id;
    const { response, error, fetchFinalGuessResult } = useFinalGuessResult(gameId, playerId);
    const hasFetchedFinalResultRef = React.useRef(false);
    const [fetchNowJudgeStatus, setFetchNowJudgeStatus] = React.useState(null);

    if (!summaryQuestions) {
        summaryQuestions = localStorage.get('judging-summary');
    }

    // Keep the async trigger in a ref (define BEFORE using it)
    const fetchNowRef = React.useRef(fetchNowAsync);
    useEffect(() => {
        fetchNowRef.current = fetchNowAsync;
    }, [fetchNowAsync]);

    // Fetch once on mount (avoid calling in render)
    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const updated = await fetchNowRef.current?.();
                if (isMounted) setFetchNowJudgeStatus(updated);
            } catch (e) {
                console.error('fetchNowAsync failed on mount', e);
            }
        })();
        return () => { isMounted = false; };
    }, []);

    // Define the current status value and an in-flight guard
    const statusVal = judgeStatus?.status;
    const isRefreshingRef = React.useRef(false);
    const didRefreshForUndefinedRef = React.useRef(false);

    // If judgeStatus is "undefined" (string), force exactly one refresh per occurrence
    useEffect(() => {
        if (statusVal === 'undefined') {
            if (didRefreshForUndefinedRef.current || isRefreshingRef.current) return;

            didRefreshForUndefinedRef.current = true;
            let isMounted = true;
            isRefreshingRef.current = true;

            (async () => {
                try {
                    const updated = await fetchNowRef.current?.();
                    if (isMounted) setFetchNowJudgeStatus(updated);
                } catch (e) {
                    console.error('fetchNowAsync failed for string "undefined" judgeStatus', e);
                } finally {
                    isRefreshingRef.current = false;
                }
            })();

            return () => { isMounted = false; };
        } else {
            // Reset the one-shot guard when status moves away from "undefined"
            didRefreshForUndefinedRef.current = false;
        }
    }, [statusVal]);

    // If judgeStatus is missing or has undefined status, force a refresh
    useEffect(() => {
        const needsRefresh =
            judgeStatus == null ||
            typeof statusVal === 'undefined' || // actual undefined
            statusVal === 'undefined' ||        // string "undefined" coming from backend
            statusVal === 'unavailable' ||      // explicit unavailable
            statusVal === 'unavaible';          // tolerate misspelling if it appears

        if (!needsRefresh || isRefreshingRef.current) return;

        let isMounted = true;
        isRefreshingRef.current = true;

        (async () => {
            try {
                const updated = await fetchNowRef.current?.();
                if (isMounted) setFetchNowJudgeStatus(updated);
            } catch (e) {
                console.error('fetchNowAsync failed (missing/undefined judgeStatus)', e);
            } finally {
                isRefreshingRef.current = false;
            }
        })();

        return () => { isMounted = false; };
    }, [judgeStatus]);

    // On socket reconnection, force a refresh to avoid stale caches
    useEffect(() => {
        if (!isConnected || isRefreshingRef.current) return;
        let isMounted = true;
        (async () => {
            try {
                const updated = await fetchNowRef.current?.();
                if (isMounted) setFetchNowJudgeStatus(updated);
            } catch (e) {
                console.error('fetchNowAsync failed on reconnect', e);
            } finally {
                isRefreshingRef.current = false;
            }
        })();
        return () => { isMounted = false; };
    }, [isConnected]);

    const prevRef = React.useRef(currentState);
    useEffect(() => {
        const triggerStates = new Set(['ask', 'wait', 'rate', 'final-review', 'end']);
        const prev = prevRef.current;
        const enteredNewTrackedState = currentState !== prev && triggerStates.has(currentState);
        if (enteredNewTrackedState) {
            (async () => {
                try {
                    const updated = await fetchNowRef.current?.();
                    setFetchNowJudgeStatus(updated); // <- store latest status
                } catch (e) {
                    console.error('fetchNowAsync failed', e);
                }
            })();
        }
        prevRef.current = currentState;
    }, [currentState]);
    if (statusVal === 'undefined') return;

    const isOneOfThesePhases =
        ['final-review', 'end', 'rate'].includes(currentState ?? '') ||
        ['final-review', 'end', 'rate'].includes(judgeStatus?.status ?? '');

    const isNotOneOfThesePhases =
        !['final-review', 'end', 'rate'].includes(currentState ?? '') ||
        !['final-review', 'end', 'rate'].includes(judgeStatus?.status ?? '');

    if (typeof judgeStatus?.status !== 'undefined' && judgeStatus?.status !== null && judgeStatus?.status !== 'undefined' && currentState !== judgeStatus?.status) {
        setCurrentState(judgeStatus?.status);
    };

    const isFinalReview = judgeStatus?.status === 'final-review';
    const notFinalReview = judgeStatus?.status !== 'final-review';
    const isRateState = judgeStatus?.status === 'rate';
    const notRateState = judgeStatus?.status !== 'rate';
    let isEndState = judgeStatus?.status === 'end';
    const notEndState = judgeStatus?.status !== 'end';
    const notWaitState = judgeStatus?.status !== 'wait';
    useEffect(() => {
        if (notEndState) {
            if (summaryQuestions && notEndState) {
                setCurrentState(judgeStatus?.status);
            } else if (answers && answers?.length > 0 && askedQuestion) {
                (async () => {
                    try {
                        setJudgeStatus(null);
                        setFetchNowJudgeStatus(await fetchNowRef.current?.());
                    } catch (e) {
                        console.error('fetchNowAsync failed', e);
                    }
                })();
            } else if (answers.length === 0 && askedQuestion && notEndState && notRateState) {
                setCurrentState(judgeStatus?.status);
            } else if (notEndState && notRateState && notWaitState) {
                setCurrentState(judgeStatus?.status);
            }
        }
    }, [answers, askedQuestion, summaryQuestions, currentState]);
    // Define this BEFORE the effect so it's initialized
    const readyToFetch = Boolean(judgingEnded && isEndState);

    // Keep function refs stable (optional but avoids extra re-runs)
    const fetchFinalGuessResultRef = React.useRef(fetchFinalGuessResult);
    useEffect(() => { fetchFinalGuessResultRef.current = fetchFinalGuessResult; }, [fetchFinalGuessResult]);

    const navigateRef = React.useRef(navigate);
    useEffect(() => { navigateRef.current = navigate; }, [navigate]);

    const readyPrevRef = React.useRef(false);

    useEffect(() => {
        const risingEdge = !readyPrevRef.current && readyToFetch;
        readyPrevRef.current = readyToFetch;
        if (!risingEdge || hasFetchedFinalResultRef.current) return;

        let isMounted = true;
        hasFetchedFinalResultRef.current = true;

        (async () => {
            try {
                const result = await fetchFinalGuessResultRef.current({waitForResult: true, timeoutMs: 7000, intervalMs: 400});
                const userGuessedCorrectly = Boolean(result?.final_was_correct);
                const finalGuessText = userGuessedCorrectly && 'game_final_guess_correct' || 'game_final_guess_incorrect'; 
                if (!isMounted) return;
                localStorage.clear();
                navigateRef.current(`/games/${gameId}/gameend`, {
                    state: { reason: 'game_end_reason_game_ended', gameresult: finalGuessText }
                });
            } catch (err) {
                console.error('Error fetching final guess result:', err);
                // Consider NOT resetting the flag to avoid tight loops.
                // hasFetchedFinalResultRef.current = false;
            }
        })();

        return () => { isMounted = false; };
    }, [readyToFetch, gameId]);

    const handleAskQuestion = async (questionText) => {
        try {
            await askQuestion(questionText);
            setAskedQuestion({ content: questionText, type: 'sent' });
            setNotification(t('question_sent_success_notification'), 'success', true);
            setJudgeStatus(null);
            setFetchNowJudgeStatus(await fetchNowRef.current?.());
            setCurrentState('wait');
        } catch (error) {
            console.error('Failed to ask question:', error);
            if (error.error === 'judge_messenger_missing_judge_guess') {
                setJudgeStatus(null);
                setFetchNowJudgeStatus(await fetchNowRef.current?.());
                setCurrentState('rate');
            } else {
                setJudgeStatus(null);
                setFetchNowJudgeStatus(await fetchNowRef.current?.());
                setCurrentState('ask');
            }
            setNotification(t(error?.error), 'error', true);
        }
    };

    const disabledAnnouncements = {
        'wait': <WaitingAnnouncement content={t('playroom_waiting_for_answers')} />,
        'rate': <WaitingAnnouncement content={t('playroom_waiting_for_rating')} showSpinner={false} />
    };

    const handleRatingSubmit = async (data) => {
        if (isConnected) {
            emit('send-guess-to-answer', {
                answerId: data.selectedAnswer.content.answer_id,
                confidence: data.confidence,
                argument: data.justifications
            });
            setAskedQuestion(null);
            setJudgeStatus(null);
            setFetchNowJudgeStatus(await fetchNowRef.current?.());
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
        setJudgeStatus(null);
        setFetchNowJudgeStatus(await fetchNowRef.current?.());
        setCurrentState('final-review');
    };

    const judgeStatusReload = async () => {
        setJudgeStatus(null);
        setFetchNowJudgeStatus(await fetchNowRef.current?.());
        setCurrentState('end');
    }

    const finalReview = (() => {
        if (isFinalReview && summaryQuestions) {
            return (
                <FinalReview
                    messages={summaryQuestions}
                    gameId={gameId}
                    judgeId={judgeId}
                    setCurrentState={setCurrentState}
                    judgeStatusReload={judgeStatusReload}
                />
            );
        }
        return <></>;
    })();

    const end = (() => {
        if (isEndState) {
            return (
                <GameEnd reason={'game_end_reason_by_judge'} />
            )
        }
    })();

    return (
        <Messenger
            onMessageSubmit={handleAskQuestion}
            messageFieldDisabled={currentState !== 'ask'}
            messageFieldHidden={isOneOfThesePhases}
            message={input}
            onMessageChange={onInputChange}
            msglength={2000}
            storageKey="messageArea.judgeMessenger.showInstructions"
        >
            {notFinalReview && <ul className="message-area-messages">
                <li className="message-area-instructions message-area-item">
                    <InstructionMessage content={t('playroom_instructions_judge')} />
                </li>
                {isNotOneOfThesePhases && disabledAnnouncements[currentState] && (
                    <li className="judge-message-area-item">
                        {disabledAnnouncements[currentState]}
                    </li>
                )}
            </ul> || finalReview}
            {isRateState && askedQuestion &&
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
            {isEndState && end}

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
