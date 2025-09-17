import './AdminMonitorTable.css'
import {useTranslation} from "react-i18next";
import React from "react";
import Button from '../../misc/ds/Button';

const AdminMonitorTable = ({gamePlayers = [], sortOpts, onSortCriteria}) => {

    const comparators = {
        judge_nickname: (direction) => (a, b) => direction * a.judge_nickname.localeCompare(b.judge_nickname),
    };

    const ASCENDING = 1;
    const DESCENDING = -1;

    const sortDirections = {
        judge_nickname: ASCENDING,
    };

    const { t } = useTranslation();

    const TableRow = ({player}) => {
        return (
            <tr>
                <td>{player.judge_nickname}</td>
                <td>{player.player_nickname}</td>
            </tr>
        );
    };

    const Header = (sorted, direction ) => {
        return (
            <thead>
                <tr>
                    <th scope="col">
                        <div>
                            <Button className="admin-monitor-button" icon={'filter_list'} iconPosition={'end'} colour={'white'} onClick={onSortCriteria}>
                            <span className="screenreader-only">
                                {t(`teacher_forms_table_sort_${direction}`)}
                            </span>
                            </Button>
                            <span> {t('admin_monitor_table_judge')} </span>
                        </div>
                    </th>
                    <th scope="col">{t('admin_monitor_table_real')}</th>
                </tr>
            </thead>
        )
    }

    return (
        <div className="admin-monitor-table-container responsive-margins">
            <table className="admin-monitor-table">
                <caption className="screenreader-only">
                    {t('admin_monitor_table_description')}
                </caption>
                <Header />
                <tbody>
                {Array.isArray(gamePlayers)
                    && gamePlayers?.map((player) => (
                    <TableRow key={player.judge_nickname} player={player} />))
                        }
                </tbody>
            </table>
        </div>
    );

}

export default AdminMonitorTable;
