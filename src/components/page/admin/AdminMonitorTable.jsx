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
            return <Icon className="admin-monitor-table-check-small"  name="ds-check-small" aria-hidden="true" />;
        } else {
            return <Icon name="close-small" aria-hidden="true" />;
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
                            <td>{player.judge_nickname}</td>
                            <td>{finalGuess(player)}</td>
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
