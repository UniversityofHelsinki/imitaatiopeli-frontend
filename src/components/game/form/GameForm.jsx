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
import LocationField from './LocationField.jsx';
import GenderField from "./GenderField.jsx";
import AgeField from "./AgeField.jsx";
import BackgroundInfoField from "./BackgroundInfoField.jsx";
import RelevantBackgroundField from "./RelevantBackgroundField.jsx";
import CustomFields from "./CustomFields.jsx";
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

    // Debug logging
    console.log('Game object:', game);
    console.log('Game configuration:', game.configuration);
    console.log('Language model URL:', game.configuration.language_model_url);


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
                <LanguageModelField
                    value={game.configuration.language_model_url}
                    onChange={e => onChange('configuration', {
                        ...game.configuration,
                        language_model_url: e.target.value
                    })}
                    disabled={saving}
                    validation={validations?.configuration?.language_model_url}
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
                            languageModelUrl={game.configuration.language_model_url}
                        />
                    }
                    variant="compact"
                    openByDefault={false}
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
                </div>}
            <div className="form-field-text-field">
                {t('game_players_background_info')}
            </div>
            <div className="game-form-field">
                <LocationField
                    value={game.background_info.is_location_mandatory}
                    onChange={e => onChange('background_info',  {
                        ...game.background_info,
                        is_location_mandatory: e.target.value === true
                    })}
                    disabled={saving}
                />
            </div>
            <div className="game-form-field">
                <GenderField
                    value={game.background_info.is_gender_mandatory}
                    onChange={e => onChange('background_info',  {
                        ...game.background_info,
                        is_gender_mandatory: e.target.value === true
                    })}
                    disabled={saving}
                />
            </div>
            <div className="game-form-field">
                <AgeField
                    value={game.background_info.is_age_mandatory}
                    onChange={e => onChange('background_info',  {
                        ...game.background_info,
                        is_age_mandatory: e.target.value === true
                    })}
                    disabled={saving}
                />
            </div>
            <div className="game-form-field">
                <div className="backgroundinfo-field">
                    <div className="backgroundinfo-field-container" >
                        <BackgroundInfoField
                            value={game.background_info.is_background_info_mandatory}
                            onChange={e => onChange('background_info',  {
                                ...game.background_info,
                                is_background_info_mandatory: e.target.value === true
                            })}
                            disabled={saving}
                        />
                        <RelevantBackgroundField onChange={e => onChange('background_info', {
                            ...game.background_info,
                            relevant_background: e.target.value
                        })}
                        />
                    </div>
                </div>
            </div>
            <div className="game-form-field">
                <CustomFields
                    onChange={e => onChange('custom_fields', {
                        ...game.custom_background_info,
                        custom_fields: e.target.value
                    })}
                    checked={game.custom_background_info.custom_fields}
                    disabled={saving}
                />
            </div>
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
            language_model_url: PropTypes.string,
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
