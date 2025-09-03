import PropTypes from 'prop-types';
import React from 'react';
import './GameForm.css';
import PromptField from './PromptField';
import ThemeField from './ThemeField';
import { BottomRow } from './BottomRow';
import FormButtons from './FormButtons';
import NameField from "./NameField.jsx";
import LanguageField from "./LanguageField.jsx";
import LanguageModelField from "./LanguageModelField.jsx";
import { useTranslation } from "react-i18next";
import InstructionsField from "./InstructionsField.jsx";
import ResearchField from "./ResearchField.jsx";
import ResearchDescriptionField from "./ResearchDescriptionField.jsx";
import AIPromptTest from "../../game/form/AIPromptTest.jsx";
import Accordion from "../../misc/ds/Accordion.jsx";

const GameForm = ({
                      game,
                      saving,
                      onChange,
                      onSubmit,
                      onReset,
                      validations
                  }) => {
    const { t } = useTranslation();

    // Get temperature from game configuration or default to 0.7
    const temperature = game.configuration.temperature ?? 0.7;

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

    const handleTemperatureChange = (e) => {
        const newTemperature = parseFloat(e.target.value);
        onChange('configuration', {
            ...game.configuration,
            temperature: newTemperature
        });
    };

    return (
        <form
            className="form game-form"
            onSubmit={handleSubmit}
            onReset={handleReset}
            method="POST"
        >
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
                <LanguageField
                    value={game.configuration.language_used}
                    onChange={e => onChange('configuration', {
                        ...game.configuration,
                        language_used: e.target.value
                    })}
                    disabled={saving}
                    validation={validations?.configuration?.language_used}
                />
            </div>
            <div className="form-field game-form-field">
                <LanguageModelField
                    value={game.configuration.language_model}
                    onChange={(modelId) =>
                        onChange('configuration', {
                            ...game.configuration,
                            language_model: modelId
                        })
                    }
                    disabled={saving}
                    validation={validations?.configuration?.language_model}
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
                <label htmlFor="temperature-slider">
                    {t('temperature_setting')}: {temperature}
                    <span className="temperature-label">
            ({temperature < 0.3 ? t('temperature_conservative') :
                        temperature > 0.7 ? t('temperature_creative') :
                            t('temperature_balanced')})
        </span>
                </label>
                <div className="temperature-slider-wrapper">
                    <input
                        id="temperature-slider"
                        type="range"
                        min="0.05"
                        max="1"
                        step="0.05"
                        value={temperature}
                        onChange={handleTemperatureChange}
                        disabled={saving}
                        className="temperature-slider"
                    />
                    <div className="temperature-slider-labels">
                        <span>{t('more_focused')}</span>
                        <span>{t('temperature_balanced')}</span>
                        <span>{t('more_creative')}</span>
                    </div>
                </div>
            </div>
            <div className="form-field game-form-field">
                <Accordion
                    header={t('test_ai_prompt')}
                    content={
                        <AIPromptTest
                            prompt={game.configuration.ai_prompt}
                            temperature={temperature}
                            languageModel={game.configuration.language_model}
                        />
                    }
                    variant="compact"
                    openByDefault={false}
                />
            </div>

            <div className="form-field game-form-field">
                <InstructionsField
                    value={game.configuration.instructions_for_players}
                    onChange={e => onChange('configuration', {
                        ...game.configuration,
                        instructions_for_players: e.target.value
                    })}
                    disabled={saving}
                    validation={validations?.configuration?.instructions_for_players}
                />
            </div>
            <div className="form-field game-form-field">
                <ResearchField
                    value={game.configuration.is_research_game}
                    onChange={e => onChange('configuration',  {
                        ...game.configuration,
                        is_research_game: e.target.value === true
                    })}
                    disabled={saving}
                />
            </div>
            {game.configuration.is_research_game &&
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
    );
};

GameForm.propTypes = {
    game: PropTypes.shape({
        configuration: PropTypes.shape({
            game_name: PropTypes.string,
            ai_prompt: PropTypes.string,
            temperature: PropTypes.number,
            language_model: PropTypes.number,
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
