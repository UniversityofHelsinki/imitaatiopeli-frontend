import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useSaveGameConfiguration from '../../../hooks/useSaveGameConfiguration';
import validate from '../../../utilities/validation/game/gameValidation';
import { useNotification } from '../../notification/NotificationContext';
import './CreateGameForm.css';
import GameForm from './GameForm';

const createEmptyGame = (t) => ({
    configuration: {
        ai_prompt: '',
        game_name: '',
        theme_description: '',
        language_used: '',
        instructions_for_players: t('game_form_instructions_field_text'),
        is_research_game: false,
        research_description: '',
        language_model: null,
        model_temperature: 0.7,
        answer_randomization: false,
    }
});

const CreateGameForm = () => {
    const { t } = useTranslation();
    const [game, setGame]= useState(() => createEmptyGame(t));
    const save = useSaveGameConfiguration();
    const navigate = useNavigate();
    const { setNotification } = useNotification();
    const [saving, setSaving] = useState(false);
    const [validations, setValidations] = useState({});


    useEffect(() => {
        validate(game).then(setValidations);
    }, []);

    const onChange = async (key, value) => {
        const changed = { ...game, [key]: value };
        setGame(changed);
        setValidations(await validate(changed));
    };

    const onReset = async () => {
        setValidations({});
        setGame(createEmptyGame(t));
    };

    const onSubmit = async () => {
        setSaving(true);
        const finalValidations = await validate(game);
        setValidations(finalValidations);
        try {
            const saved = await save(game);
            navigate(`/admin/games/${saved.game_id}`);
            setNotification(t('create_game_form_game_created_notification'), 'success', true);
        } catch (error) {
            setNotification(error.cause?.status, 'error');
        }
        setSaving(false);
    };


    return (
        <div className="create-game-form">
            <GameForm
                game={game}
                onChange={onChange}
                onReset={onReset}
                onSubmit={onSubmit}
                saving={saving}
                validations={validations}
            />
        </div>
    );
};

CreateGameForm.propTypes = {
};

export default CreateGameForm;
