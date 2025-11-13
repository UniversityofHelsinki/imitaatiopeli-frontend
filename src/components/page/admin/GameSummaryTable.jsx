import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const GameSummaryTable = ({ summaryData }) => {
    const { t } = useTranslation();

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>{t('summary_participants')}</th>
                <th>{t('summary_questions_asked')}</th>
                <th>{t('summary_correct_guesses')}</th>
            </tr>
            </thead>
            <tbody>
            {summaryData?.map((player, index) => (
                <tr key={index}>
                    <td>{player.nickname}</td>
                    <td>{player.questions_asked}</td>
                    <td>{player.correct_guesses}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

GameSummaryTable.propTypes = {
    summaryData: PropTypes.arrayOf(PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        questions_asked: PropTypes.number.isRequired,
        correct_guesses: PropTypes.number.isRequired,
    })).isRequired
};

export default GameSummaryTable;