import {useParams} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import React, {useEffect, useState} from "react";
import { get } from '../../../hooks/useHttp';
import './GameSummaryPage.css'
import GameSummaryTable from "./GameSummaryTable.jsx";
import {Row} from "react-bootstrap";
import Page from "../Page.jsx";
import useUser from "../../../hooks/useUser.js";

const GameSummaryPage = () => {
    const { id: gameId } = useParams();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [summaryData, setSummaryData] = useState(null);
    const [error, setError] = useState(null);
    const { eppn } = useUser();

    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                const response = await get({
                    path: `/api/games/${gameId}/summary`,
                    tag: `GAME_SUMMARY_${gameId}`
                });
                setSummaryData(response.body);
                setError(null);
            } catch (err) {
                setError('Failed to fetch game summary');
                console.error('Error fetching game summary:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSummaryData();
    }, [gameId]);

    const crumbs = [
        {
            label: 'bread_crumb_home',
            href: '/'
        },
        {
            label: 'bread_crumb_admin_games',
            href: '/admin/games/'
        },
        {
            label: 'bread_crumb_game_summary',
            href: `/admin/games/${gameId}/summary`,
            current: true
        }
    ];

    const content = (() => {
        if (error) {
            return <div className="error-message">{error}</div>;
        }

        return summaryData && <GameSummaryTable summaryData={summaryData}/>;
    })();

    console.log('summaryData', summaryData);

    return (
        <Page
            className="page-heading"
            loading={loading}
            heading={t('game_summary_title')}
            crumbs={crumbs}
        >
            <ul className="game-summary-data-list-container list-unstyled">
                <li className="li-1">
                    Osallistujien määrä:
                </li>
                <li className="li-2">
                    Esitetyt kysymykset:
                </li>
                <li className="li-3">
                    Arvioiden onnistumisprosentti:
                </li>
            </ul>
            <Row>
                <div>{content}</div>
            </Row>
        </Page>
    );
};

export default GameSummaryPage;