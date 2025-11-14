import {useParams} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import React, {useEffect, useState} from "react";
import { get } from '../../../hooks/useHttp';
import './GameSummaryPage.css'
import GameSummaryTable from "./GameSummaryTable.jsx";
import {Row} from "react-bootstrap";
import Page from "../Page.jsx";

const GameSummaryPage = () => {
    const { id: gameId } = useParams();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [summaryData, setSummaryData] = useState(null);
    const [error, setError] = useState(null);

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

    const rows = Array.isArray(summaryData) ? summaryData : [];
    const totalParticipants = rows.length;
    const totalQuestions = rows.reduce((sum, r) => {
        const n = Number(r?.questions_asked);
        return sum + (Number.isFinite(n) ? n : 0);
    }, 0);
    const totalCorrectGuesses = rows.reduce((sum, r) => {
        const n = Number(r?.correct_guesses);
        return sum + (Number.isFinite(n) ? n : 0);
    }, 0);
    const correctGuessesPercentage = totalQuestions > 0
        ? Math.round((totalCorrectGuesses / totalQuestions) * 100)
        : 0;

    const content = (() => {
        if (error) {
            return <div className="error-message">{error}</div>;
        }

        return summaryData && <GameSummaryTable summaryData={summaryData}/>;
    })();

    return (
        <Page
            className="page-heading"
            loading={loading}
            heading={t('summary_heading')}
            crumbs={crumbs}
        >
            <div className="game-summary-download-link-container mb-3 mt-2">
                <span>
                    {t('summary_page_download_summary_link_label')}
                </span>
            </div>
            <ul className="game-summary-data-list-container list-unstyled">
                <li className="li-1">
                    {t('summary_page_number_of_participants')} {totalParticipants}
                </li>
                <li className="li-2">
                    {t('summary_page_total_questions_asked')} {totalQuestions}
                </li>
                <li className="li-3">
                    {t('summary_page_correct_guesses_percentage')} {correctGuessesPercentage}%
                </li>
            </ul>
            <Row>
                <div>{content}</div>
            </Row>
        </Page>
    );
};

export default GameSummaryPage;