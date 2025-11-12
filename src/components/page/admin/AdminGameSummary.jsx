import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Page from "../Page.jsx";

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
            <p>Tämä on testausta varten. Joonas tekee oikean sivun</p>
        </Page>
    );
};

AdminGameSummary.propTypes = {
};

export default AdminGameSummary;