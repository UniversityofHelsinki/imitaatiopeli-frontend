import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Page from "../Page.jsx";
import {Row} from "react-bootstrap";
import React from "react";
import AdminMonitorTable from "./AdminMonitorTable.jsx";

const AdminGameSummary = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const crumbs = [
        {
            label: 'bread_crumb_admin_games',
            href: '/admin/games/'
        },
        {
            label: 'bread_crumb_games_summary',
            href: `/admin/games/${id}/summary`,
            current: true
        }
    ]

    const content = (() => {
        return (
            gamePlayers && <AdminMonitorTable gamePlayers={gamePlayers}
                                              sortOpts={sortOpts}
                                              onSortCriteria={setSortOptsCriteria}
            />
        );
    })();

    return (
        <Page  heading={t('admin_game_summary_page_heading')} crumbs={crumbs}>
            <p>Game ID: {id}</p>
            <Row>
                <div>{content}</div>
            </Row>
        </Page>
    );
};

AdminGameSummary.propTypes = {
};

export default AdminGameSummary;