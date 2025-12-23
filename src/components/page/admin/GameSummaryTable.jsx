import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const GameSummaryTable = ({ summaryData }) => {
    const { t } = useTranslation();

    const finalEstimate = (value) => {
        return (
            value == null ? t('summary_final_estimate_missing') : value ? t('summary_final_estimate_right') : t('summary_final_estimate_wrong')
        )
    }
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>{t('summary_participants')}</th>
                <th>{t('summary_questions_asked')}</th>
                <th>{t('summary_guesses_sent')}</th>
                <th>{t('summary_correct_guesses')}</th>
                <th>{t('summary_final_estimate')}</th>
            </tr>
            </thead>
            <tbody>
            {summaryData?.map((player, index) => (
                <tr key={index}>
                    <td>{player.nickname}</td>
                    <td>{player.questions_asked}</td>
                    <td>{player.guesses_sent}</td>
                    <td>{player.correct_guesses}</td>
                    <td>{finalEstimate(player?.final_was_correct)}</td>
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
        guesses_sent: PropTypes.number.isRequired,
        correct_guesses: PropTypes.number.isRequired,
        final_was_correct: PropTypes.bool,

    })).isRequired
};

export default GameSummaryTable;