import {useParams, useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import React, {useEffect, useState} from "react";
import { get, invalidate } from '../../../hooks/useHttp';
import './AdminMonitor.css'
import AdminMonitorTable from "./AdminMonitorTable.jsx";
import {Row} from "react-bootstrap";
import Page from "../Page.jsx";
import CopyGameUrlButton from "./CopyGameUrlButton.jsx";
import usePlayroomJudgePlayerPairs from "../../../hooks/usePlayroomJudgePlayerPairs.js";
import Button from "../../misc/ds/Button.jsx";
import useEndGame from "../../../hooks/useEndGame.js";
import {useNotification} from "../../notification/NotificationContext.jsx";
import {useSocket} from "../../../contexts/SocketContext.jsx";
import ConfirmModalDialog from "../../../utilities/ConfirmModalDialog.jsx";

const AdminMonitor = () => {
    const { isConnected, emit } = useSocket();
    const { id: gameId } = useParams();
    const navigate = useNavigate();
    const { t} = useTranslation();
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState(null);
    const [gamePlayers, error, reload] = usePlayroomJudgePlayerPairs(gameId);
    const endOngoingGame = useEndGame(gameId);
    const { setNotification } = useNotification();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [displayPlayers, setDisplayPlayers] = useState([]);
    const [allHaveFinalGuess, setAllHaveFinalGuess] = useState(false);

    const ASCENDING = 1;
    const DESCENDING = -1;
    const [sortOpts, setSortOpts] = useState({
        criteria: 'judge_nickname',
        direction: ASCENDING,
    });
    const comparators = {
        judge_nickname: (direction) => (a, b) => direction * a?.judge_nickname?.localeCompare(b?.judge_nickname),
    };

    const sortDirections = {
        judge_nickname: ASCENDING,
    };

    const setSortOptsCriteria = () => {
            setSortOpts({ criteria: 'judge_nickname', direction: sortOpts.direction * -1 });
    };

    const sorted = (displayPlayers || []).sort(comparators[sortOpts.criteria](sortOpts.direction));

    useEffect(() => {
        (async () => {
            const response = await get({
                path: `/api/game/${gameId}`,
                tag: `GAME_${gameId}`
            });
            setGame({ ...response.body });
            setLoading(false);
        })();
    }, []);

    // Force-refresh gamePlayers whenever the monitor is opened (or gameId changes)
    useEffect(() => {
        invalidate([`PLAYROOM_JUDGE_PLAYER_PAIRS_${gameId}`]);
        reload();
    }, [gameId]);

    // Polling: refresh every 60 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            invalidate([`PLAYROOM_JUDGE_PLAYER_PAIRS_${gameId}`]);
            reload();
        }, 60000);

        return () => clearInterval(intervalId);
    }, [reload]);

    const crumbs = [
        {
            label: 'bread_crumb_home',
            href: '/'
        },
        {
            label: 'bread_crumb_admin',
            href: '/admin/',
        },
        {
            label: 'bread_crumb_admin_games',
            href: '/admin/games/'
        },
        {
            label: 'bread_crumb_games_monitor',
            href: `/admin/games/${gameId}/monitor`,
            current: true
        }
    ]

    const formatDate = (releaseDate) => {
        if (!releaseDate) return '';
        const d = new Date(releaseDate);
        const dateStr = new Intl.DateTimeFormat('fi-FI', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        }).format(new Date(d));

        const timeStr = new Intl.DateTimeFormat('fi-FI', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23', // 24h, no AM/PM
        }).format(d);

        const formattedDate = `${dateStr} ${timeStr}`;

        return formattedDate;
    };

    const content = (() => {
        return (
            displayPlayers && <AdminMonitorTable gamePlayers={displayPlayers}
               sortOpts={sortOpts}
               onSortCriteria={setSortOptsCriteria}
            />
        );
    })();

    const endGame = async () => {
        if (isConnected && game.game_id) {
            emit('end-game', {
                gameId: game.game_id,
            });
            await endOngoingGame();
            setNotification(t('end_game_page_success_notification'), 'success', true);
            navigate(`/admin/games/${gameId}/summary`);
        }
    }

    console.log("ALL:" + allHaveFinalGuess);

    const renderEndGameConfirm = () => (
        <div className="" id="end-game-dialog-container" aria-live="assertive">
            <ConfirmModalDialog
                id="end-game-dialog"
                open={confirmOpen}
                message=<>
                        {t('admin_monitor_end_game_confirm_message')}{' '}
                        {!allHaveFinalGuess && (<strong>{t('admin_monitor_end_game_all_not_finished')}</strong>)}
                    </>
            confirmLabel={t('rating_form_end_game_confirm')}
                cancelLabel={t('rating_form_end_game_cancel')}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={endGame}
            />
        </div>
    );

    useEffect(() => {
        const arr = Array.isArray(gamePlayers) ? [...gamePlayers] : [];
        if (arr.length && Object.prototype.hasOwnProperty.call(arr[arr.length - 1] || {}, 'all_have_final_guess')) {
            const meta = arr.pop();
            setAllHaveFinalGuess(Boolean(meta.all_have_final_guess));
        } else {
            setAllHaveFinalGuess(false);
        }
        setDisplayPlayers(arr);
    }, [gamePlayers]);

    return (
        <Page className="page-heading"
                    loading={loading}
                    heading={game?.configuration?.game_name}
                    crumbs={crumbs}
        >
            <div className="admin-monitor-game-data">
                <div>
                    <label>{t('admin_monitor_description')}</label>
                    <div className="">{game?.configuration?.theme_description}</div>
                </div>
                <div>
                    <label>{t('admin_monitor_start_time')}</label>
                    <div>{formatDate(game?.start_time)}</div>
                </div>
                <div>
                    <label>{t('admin_monitor_join_link')}</label>
                    <div> <CopyGameUrlButton game={game} /> </div>
                </div>
            </div>
            <Row>
                <div>{content}</div>
            </Row>
            <div className="admin-monitor-game-button">
                <Button type="button" label={t('admin_monitor_end_game_move_summary')}
                        onClick={() => setConfirmOpen(true)}
                />
                {confirmOpen && renderEndGameConfirm()}
            </div>
        </Page>
    )
}

AdminMonitor.propTypes = {
}

export default AdminMonitor;
