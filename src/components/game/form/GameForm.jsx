import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import './GameForm.css';
import PromptField from './PromptField';
import ThemeField from './ThemeField';
import { BottomRow } from './BottomRow';
import FormButtons from './FormButtons';
import NameField from "./NameField.jsx";
import LanguageField from "./LanguageField.jsx";
import Button from "../../misc/ds/Button.jsx";
import { useTranslation } from "react-i18next";
import InstructionsField from "./InstructionsField.jsx";
import ResearchField from "./ResearchField.jsx";
import ResearchDescriptionField from "./ResearchDescriptionField.jsx";
import AIPromptTestDialog from "../../game/form/AIPromptTestDialog.jsx";

const GameForm = ({
                      game,
                      saving,
                      onChange,
                      onSubmit,
                      onReset,
                      validations
                  }) => {
    const { t } = useTranslation();
    const textRef = useRef(null);
    const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (onSubmit) {
            await onSubmit(event);
        }
    };

    const handleReset = (event) => {
        event.preventDefault();
        if (onReset) {
            onReset(event);
        }
    };

    const handleTestPrompt = (event) => {
        event.preventDefault(); // Prevent form submission
        if (!game.configuration.ai_prompt?.trim()) {
            alert(t('please_enter_prompt_first'));
            return;
        }
        setIsTestDialogOpen(true);
    };

    const handleCloseTestDialog = () => {
        setIsTestDialogOpen(false);
    };

    return (
        <>
            <form
                className="form game-form"
                onSubmit={handleSubmit}
                onReset={handleReset}
                method="POST"
            >
                <div className="form-field game-form-field">
                    <ThemeField
                        value={game.configuration.theme_description}
                        onChange={e => onChange('configuration', {
                            ...game.configuration,
                            theme_description: e.target.value
                        })}
                        disabled={saving}
                        validation={validations?.configuration?.theme_description}
                    />
                </div>
                <div className="form-field game-form-field">
                    <NameField
                        value={game.configuration.game_name}
                        onChange={e => onChange('configuration', {
                            ...game.configuration,
                            game_name: e.target.value
                        })}
                        disabled={saving}
                        validation={validations?.configuration?.game_name}
                    />
                </div>
                <div className="form-field game-form-field">
                    <LanguageField
                        value={game.configuration.language}
                        onChange={e => onChange('configuration', {
                            ...game.configuration,
                            language: e.target.value
                        })}
                        disabled={saving}
                        validation={validations?.configuration?.language}
                    />
                </div>
                <div className="form-field game-form-field">
                    <PromptField
                        value={game.configuration.ai_prompt}
                        onChange={e => onChange('configuration', {
                            ...game.configuration,
                            ai_prompt: e.target.value
                        })}
                        disabled={saving}
                        validation={validations?.configuration?.ai_prompt}
                    />
                </div>
                <div className="form-field game-form-field">
                    <Button
                        type="button"
                        label={t('game_form_prompt_field_button')}
                        onClick={handleTestPrompt}
                        disabled={saving || !game.configuration.ai_prompt?.trim()}
                    />
                </div>
                <div className="form-field game-form-field">
                    <InstructionsField
                        value={game.configuration.instructions}
                        onChange={e => onChange('configuration', {
                            ...game.configuration,
                            instructions: e.target.value
                        })}
                        disabled={saving}
                        validation={validations?.configuration?.instructions}
                    />
                </div>
                <div className="form-field game-form-field">
                    <ResearchField
                        value={game.configuration.isResearch}
                        onChange={e => onChange('configuration',  {
                            ...game.configuration,
                            isResearch: e.target.value === true
                        })}
                        disabled={saving}
                    />
                </div>
                {game.configuration.isResearch &&
                    <div className="form-field game-form-field">
                        <ResearchDescriptionField
                            value={game.configuration.research_description}
                            onChange={e => onChange('configuration', {
                                ...game.configuration,
                                research_description: e.target.value
                            })}
                            disabled={saving}
                            validation={validations?.configuration?.research_description}
                        />
                    </div>
                }
                <div className="horizontal-divider"></div>
                <div className="game-form-bottom-row">
                    <BottomRow saving={saving}>
                        <FormButtons disabled={saving} />
                    </BottomRow>
                </div>
            </form>

            <AIPromptTestDialog
                isOpen={isTestDialogOpen}
                onClose={handleCloseTestDialog}
                prompt={game.configuration.ai_prompt}
            />
        </>
    );
};

GameForm.propTypes = {
    game: PropTypes.shape({
        configuration: PropTypes.shape({
            game_name: PropTypes.string,
            ai_prompt: PropTypes.string,
        }),
        researchPermission: PropTypes.bool
    }),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    saving: PropTypes.bool,
    validations: PropTypes.object,
};

export default GameForm;
