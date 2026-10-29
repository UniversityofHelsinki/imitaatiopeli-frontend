import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '../../misc/ds/Accordion';
import Link from '../../misc/ds/Link';
import Tag from '../../misc/ds/Tag';
import './Game.css';
import { useNotification } from '../../notification/NotificationContext.jsx';
import CopyGameUrlButton from '../../page/admin/CopyGameUrlButton.jsx';
import Button from '../../misc/ds/Button';
import useDeleteGame from '../../../hooks/useDeleteGame.js';
import ConfirmDialog from '../../../utilities/ConfirmDialog.jsx';
import { get, usePUT } from '../../../hooks/useHttp.js'
import {useNavigate} from "react-router-dom";

const Header = ({ game }) => {
    const { t } = useTranslation();

    const waitingTag = (
        <Tag className="game-tag" text={t('game_tag_waiting')} colour="info" />
    );

    const startTag = (
        <Tag className="game-tag" text={t('game_tag_started')} colour="success" />
    );

    const endTag = (
        <Tag className="game-tag" text={t('game_tag_ended')} colour="black" />
    );

    const inactiveTag = (
        <Tag className="game-tag" text={t('game_tag_inactive')} colour="default" />
    )

    const tag = (() => {
        if (game.end_time) {
            return endTag;
        }
        if (game.start_time) {
            return startTag;
        }
        if (!game.is_active && !game.end_time) {
            return inactiveTag;
        }
        return waitingTag;
    })();

    return (
        <div className="game-header">
            <span className="game-header-title">{game.configuration.game_name}</span>
            <div className="game-header-state">
                {tag}
            </div>
        </div>
    );

};


const Content = ({ game, reload }) => {
    const { t } = useTranslation();
    const { setNotification } = useNotification();
    const navigate = useNavigate();

    const gameWaiting = !game.start_time && !game.end_time && game.is_active;
    const gameEnded = (game.start_time && game.end_time) || (!game.start_time && game.end_time);

    const [removeGame, ] = useDeleteGame(game.game_id);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isActive, setIsActive] = useState(game.is_active);

    React.useEffect(() => {
        setIsActive(game.is_active);
    }, [game.is_active]);

    const activateGame = usePUT({
        path: `/api/games/${game.game_id}/activate`,
        invalidates: ['GAMES'],
    });

    const handleActivateAndGoToLobby = async (event) => {
        event.preventDefault();
        try {
            if (isActive) {
                navigate(`/admin/games/${game.game_id}/lobby`);
                return;
            }

            const resp = await activateGame({});

            if (!resp || (resp.status && resp.status >= 300)) {
                setNotification(resp?.status ?? 'Error', 'error');
                return;
            }
            setIsActive(true);

            if (reload) reload();
            navigate(`/admin/games/${game.game_id}/lobby`);

        } catch (e) {
            setNotification(e?.message ?? 'Error', 'error');
        }
    };


    const stateLink = (() => {
        const gameWaiting = !game.start_time && !game.end_time;
        const gameStarted = game.start_time && !game.end_time;

        if (gameEnded) {
            return (
                <Link
                    label={t('game_content_move_to_summary_link_label')}
                    variant="standalone"
                    icon="view_list_fill"
                    size="2xLarge"
                    colour="black"
                    href={`/admin/games/${game.game_id}/summary`}
                    internal
                />
            );
        }

        if (!isActive) {
            return (
                <Link
                    label={t('game_content_activate_game_and_move_to_game_link_label')}
                    variant="standalone"
                    icon="play_arrow"
                    size="2xLarge"
                    colour="black"
                    href={`/admin/games/${game.game_id}/lobby`}
                    internal
                    onClick={handleActivateAndGoToLobby}
                />
            );
        }
        if (gameWaiting) {
            return (
                <Link
                    label={t('game_content_move_to_game_link_label')}
                    variant="standalone"
                    icon="play_arrow"
                    size="2xLarge"
                    colour="black"
                    href={`/admin/games/${game.game_id}/lobby`}
                    internal
                />
            );

        } else if (gameStarted) {
            return (
                <Link
                    label={t('game_content_move_to_monitor_link_label')}
                    variant="standalone"
                    icon="play_arrow"
                    size="2xLarge"
                    colour="black"
                    href={`/admin/games/${game.game_id}/monitor`}
                    internal
                />
            );
        } else {
            return (
                <></>
            );
        }
    })();

    const deleteGame = async () => {
        const resp = await removeGame(game);
        if (resp.status === 200) {
            setConfirmOpen(false);
            setNotification(t('game_content_delete_done'), 'success', true);
            reload();
        } else {
            setNotification(resp.status, 'error');
        }
    }

    const renderDeleteConfirm = () => (
        <div className="confirm-dialog-container" id="delete-game-dialog-container" aria-live="assertive">
            <ConfirmDialog
                id="delete-game-dialog"
                open={confirmOpen}
                message={t('game_content_delete_confirm_message')}
                confirmLabel={t('game_content_confirm_delete')}
                cancelLabel={t('game_content_cancel_delete')}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteGame}
            />
        </div>
    );

    return (
        <div className="game-content">
            <div className="game-content-data">
                <div>{t('game_content_theme')}  {game.configuration.theme_description}</div>
            </div>
            <div className="game-content-data">
                <div>{t('game_content_join_link_label')}
                    <span className="game-padding" >
                        <CopyGameUrlButton game={game} />
                    </span>
                </div>
            </div>
            <div className="game-content-divider"></div>
            <div className="game-content-bottom-row">
                <div className="game-content-actions">
                    {stateLink}
                    {(!game.is_active && !gameEnded) && (
                        <Link
                            label={t('game_content_edit_game_link_label')}
                            variant="standalone"
                            icon="edit"
                            size="2xLarge"
                            colour="black"
                            href={`/admin/games/${game.game_id}`}
                            internal
                        />
                    )}
                    {gameEnded &&  (
                        <div>
                            <Button
                                icon="delete"
                                label={t('game_content_delete_game_link_label')}
                                onClick={() => setConfirmOpen(true)}
                                type="submit"
                                size="small"
                            />
                            {renderDeleteConfirm()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};



const Game = ({ game, reload }) => {

    return (
        <li className="game">
            <Accordion
                id={`game-accordion-${game.game_id}`}
                header={<Header game={game} />}
                content={<Content game={game} reload={reload} />}
                variant="compact"
            />
        </li>
    );
};

Header.propTypes = {
    game: PropTypes.shape({
        game_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        game_code: PropTypes.string.isRequired,
        start_time: PropTypes.string,
        end_time: PropTypes.string,
        configuration: PropTypes.shape({
            theme_description: PropTypes.string.isRequired,
            game_name: PropTypes.string.isRequired,
            ai_prompt: PropTypes.string.isRequired,
            max_duration_minutes: PropTypes.number.isRequired,
            max_questions: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};

Content.propTypes = {
    game: PropTypes.shape({
        game_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        game_code: PropTypes.string.isRequired,
        start_time: PropTypes.string,
        end_time: PropTypes.string,
        configuration: PropTypes.shape({
            theme_description: PropTypes.string.isRequired,
            game_name: PropTypes.string.isRequired,
            ai_prompt: PropTypes.string.isRequired,
            max_duration_minutes: PropTypes.number.isRequired,
            max_questions: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};

Game.propTypes = {
    game: PropTypes.shape({
        game_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        game_code: PropTypes.string.isRequired,
        start_time: PropTypes.string,
        end_time: PropTypes.string,
        configuration: PropTypes.shape({
            theme_description: PropTypes.string.isRequired,
            game_name: PropTypes.string.isRequired,
            ai_prompt: PropTypes.string.isRequired,
            max_duration_minutes: PropTypes.number.isRequired,
            max_questions: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};

export default Game;
