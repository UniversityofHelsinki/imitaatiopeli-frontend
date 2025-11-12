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
                <th>{t('summary_player_name')}</th>
                <th>{t('summary_questions_asked')}</th>
                <th>{t('summary_correct_guesses')}</th>
                <th>{t('summary_accuracy')}</th>
                <th>{t('summary_final_guess')}</th>
            </tr>
            </thead>
            <tbody>
            {summaryData.map((row, index) => (
                <tr key={index}>
                    <td>{row.player_name}</td>
                    <td>{row.questions_asked}</td>
                    <td>{row.correct_guesses}</td>
                    <td>{`${row.accuracy}%`}</td>
                    <td>{row.final_guess_correct ? t('correct') : t('incorrect')}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

GameSummaryTable.propTypes = {
    summaryData: PropTypes.arrayOf(PropTypes.shape({
        player_name: PropTypes.string.isRequired,
        questions_asked: PropTypes.number.isRequired,
        correct_guesses: PropTypes.number.isRequired,
        accuracy: PropTypes.number.isRequired,
        final_guess_correct: PropTypes.bool
    })).isRequired
};

export default GameSummaryTable;