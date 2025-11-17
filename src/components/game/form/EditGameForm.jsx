import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import validate from '../../../utilities/validation/game/gameValidation';
import { useNotification } from '../../notification/NotificationContext';
import './EditGameForm.css';
import GameForm from './GameForm';
import ErrorPage from '../../misc/ErrorPage';
import PropTypes from 'prop-types';

const EditGameForm = ({
                          game,
                          saveGame
                      }) => {
    const { t } = useTranslation();
    const { setNotification } = useNotification();
    const [modifiedGame, setModifiedGame] = useState(null);
    const [saving, setSaving] = useState(false);
    const [validations, setValidations] = useState({});

    useEffect(() => {
        const newGame = { ...game };
        setModifiedGame(newGame);
        (async () => {
            setValidations(await validate(newGame));
        })();
    }, [game]);

    const onChange = useCallback(async (key, value) => {
        const changed = {
            ...modifiedGame,
            [key]: value
        };
        setModifiedGame(changed);
        setValidations(await validate(changed));
    }, [modifiedGame]);

    if (!modifiedGame) {
        return <></>;
    }

    if (validations.canEdit?.valid === false && validations.canEdit?.message) {
        return (
            <ErrorPage>
                <p>{t(validations.canEdit.message)}</p>
            </ErrorPage>
        );
    }

    const onReset = async () => {
        setModifiedGame({ ...game });
        setValidations(await validate({ ...game }))
    };

    const onSubmit = async () => {
        try {
            setSaving(true);
            await saveGame(modifiedGame);
            setNotification(t('edit_game_form_game_saved_notification'), 'success', true);
        } catch (error) {
            setNotification(error?.cause.status, 'error');
        }
        setSaving(false);
    };

    return (
        <div className="edit-game-form">
            <p className="edit-game-form-details">
                {t('edit_game_form_details_game_code', { game_code: modifiedGame.game_code})}
            </p>
            <GameForm
                game={modifiedGame}
                onChange={onChange}
                onReset={onReset}
                onSubmit={onSubmit}
                saving={saving}
                validations={validations}
            />
        </div>
    );
};

EditGameForm.propTypes = {
    game: PropTypes.shape({
        playerCount: PropTypes.number
    })
};

export default EditGameForm;
