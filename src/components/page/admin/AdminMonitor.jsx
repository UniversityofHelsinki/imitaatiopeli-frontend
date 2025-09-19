import {useParams} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {useEffect, useState} from "react";
import { get, invalidate } from '../../../hooks/useHttp';
import './AdminMonitor.css'
import AdminMonitorTable from "./AdminMonitorTable.jsx";
import {Row} from "react-bootstrap";
import useJudgePlayerPairs from "../../../hooks/useJudgePlayerPairs.js";
import Page from "../Page.jsx";

const AdminMonitor = () => {
    const { id: gameId } = useParams();
    const { t} = useTranslation();
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState(null);
    const [gamePlayers, error, reload] = useJudgePlayerPairs(gameId);

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

    const sorted = (gamePlayers || []).sort(comparators[sortOpts.criteria](sortOpts.direction));

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
        invalidate([`JUDGE_PLAYER_PAIRS_${gameId}`]);
        reload();
    }, [gameId]);

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
        const formattedDate = new Intl.DateTimeFormat('fi-FI', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        }).format(new Date(releaseDate));
        return formattedDate;
    };

    const content = (() => {
        return (
            gamePlayers && <AdminMonitorTable gamePlayers={gamePlayers}
               sortOpts={sortOpts}
               onSortCriteria={setSortOptsCriteria}
            />
        );
    })();

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
            </div>
            <Row>
                <div>{content}</div>
            </Row>
        </Page>
    )
}

AdminMonitor.propTypes = {
}

export default AdminMonitor;
