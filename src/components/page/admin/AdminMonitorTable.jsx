import './AdminMonitorTable.css'
import {useTranslation} from "react-i18next";
import React, { useState } from "react";
import Button from '../../misc/ds/Button';
import PropTypes from 'prop-types';
import Icon from '../../misc/ds/Icon';


const AdminMonitorTable = ({gamePlayers = [], onSortCriteria}) => {
    const { t } = useTranslation();
    const ASCENDING = 1;
    const DESCENDING = -1;
    const [sortDirection, setSortDirection] = useState(ASCENDING);


    const handleSort = () => {
        const newDirection = sortDirection === ASCENDING ? DESCENDING : ASCENDING;
        setSortDirection(newDirection);
        onSortCriteria?.(newDirection);
    };

    const finalGuess = (player) => {
        if (player.final_guess) {
            return <>
                    <Icon name="ds-check-small" colour='ds-palette-green-50' title={t('admin_monitor_table_final_guess_screen_reader_label_ready')} />
                    <span className="screenreader-only">{t('admin_monitor_table_final_guess_screen_reader_label_ready')}</span>
                   </>;
        } else {
            return <>
                    <Icon name="close" colour='ds-palette-red-50' title={t('admin_monitor_table_final_guess_screen_reader_label_not_ready')} />
                    <span className="screenreader-only">{t('admin_monitor_table_final_guess_screen_reader_label_not_ready')}</span>
                   </>;
        }
    }

    return (
        <div className="admin-monitor-table-container small-margin">
            <div className="admin-monitor-table-sort-button-container">
                <Button className="admin-monitor-table-sort-button"
                   onClick={handleSort}
                   variant="supplementary"
                   icon="filter_list"
                   colour="black"
                   title={t('admin_monitor_table_sort_button_title')}
                >
                   <span className="screenreader-only">
                       {t(`admin_monitor_table_sort_${sortDirection === ASCENDING ? 'ascending' : 'descending'}`)}
                   </span>
                </Button>
            </div>
            <table className="admin-monitor-table">
                <caption className="screenreader-only">
                    {t('admin_monitor_table_description')}
                </caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">
                        <div>
                            <span> {t('admin_monitor_table_judge')} </span>
                        </div>
                    </th>
                    <th scope="col">
                        {t('admin_monitor_table_judge_ready')}
                    </th>
                    <th scope="col">
                        {t('admin_monitor_table_made_questions')}
                    </th>
                    <th scope="col">
                        {t('admin_monitor_table_real')}
                    </th>
                    <th scope="col">
                        {t('admin_monitor_table_answered_questions')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(gamePlayers) && gamePlayers?.map((player, i) => (
                        <tr key={`${player.judge_nickname}-${i}`}>
                            <td>{sortDirection === ASCENDING ? (i + 1) : (gamePlayers.length - i)}</td>
                            <td>{player.judge_nickname}</td>
                            <td className="admin-monitor-table-judge-ready-column">{finalGuess(player)}</td>
                            <td>{player.judge_question_count}</td>
                            <td>{player.player_nickname}</td>
                            <td>{player.player_answer_count}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

AdminMonitorTable.propTypes = {
    gamePlayers: PropTypes.arrayOf(PropTypes.shape({
        judge_nickname: PropTypes.string.isRequired,
        player_nickname: PropTypes.string.isRequired,
        player_player_id: PropTypes.number.isRequired,
        judge_player_id: PropTypes.number.isRequired,
        game_id: PropTypes.number.isRequired,
        judge_is_pretender: PropTypes.bool.isRequired,
        player_is_pretender: PropTypes.bool.isRequired
    })),
    onSortCriteria: PropTypes.func
}

export default AdminMonitorTable;
