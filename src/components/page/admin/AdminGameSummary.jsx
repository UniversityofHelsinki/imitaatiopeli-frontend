import {Route, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Page from "../Page.jsx";
import React from "react";

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

    return (
        <Page  heading={t('admin_game_summary_page_heading')} crumbs={crumbs}>
            <p>Game ID: {id}</p>
            <p>Tämä on testausta varten. Oikean sivu tehdään tiketissä IM-181. </p>
            <p>AdminGameSummary.jsx ja AdminGameSummary.css voi poistaa.</p>
            <p>App.jsx pitää riville {` <Route path=":id/summary" element={<AdminGameSummary />} /> `} pitää muuttaa tuo IM-181 tehty sivu, jolle siirrytään.</p>
        </Page>
    );
};

AdminGameSummary.propTypes = {
};

export default AdminGameSummary;