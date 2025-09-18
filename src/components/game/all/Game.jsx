import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '../../misc/ds/Accordion';
import Link from '../../misc/ds/Link';
import Tag from '../../misc/ds/Tag';
import './Game.css';
import {useNotification} from "../../notification/NotificationContext.js";
import CopyGameUrlButton from "../../page/admin/CopyGameUrlButton.jsx";
import Button from '../../misc/ds/Button';
import useDeleteGame from "../../../hooks/useDeleteGame.js";
import ConfirmDialog from "../../../utilities/ConfirmDialog.js";

const Header = ({ game }) => {
  const { t } = useTranslation();

  const waitingTag = (
      <Tag text={t('game_tag_waiting')} colour="info" />
  );

  const startTag = (
      <Tag text={t('game_tag_started')} colour="success" />
  );

  const endTag = (
      <Tag text={t('game_tag_ended')} colour="black" />
  );

  const tag = (() => {
    if (game.end_time) {
      return endTag;
    } else if (game.start_time) {
      return startTag;
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
  const gameWaiting = !game.start_time && !game.end_time;
  const gameEnded = (game.start_time && game.end_time) || (!game.start_time && game.end_time);
  const [removeGame, ] = useDeleteGame(game.game_id);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const stateLink = (() => {
    const gameWaiting = !game.start_time && !game.end_time;
    const gameStarted = game.start_time && !game.end_time;

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

  const truncate = (text, max = 80) => {
    if (!text) {
      return '';
    }
    if (text.length > max) {
      return `${text.slice(0, max)}…`;
    }
    return text;
  };

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
          {gameWaiting && <div className="game-content-data">
            <div>{t('game_content_join_link_label')} <CopyGameUrlButton game={game} />
            </div>
        </div>}
        <div className="game-content-divider"></div>
        <div className="game-content-bottom-row">
          <div className="game-content-actions">
            {stateLink}
            {gameWaiting && (
                <>
                  <Link
                      label={t('game_content_edit_game_link_label')}
                      variant="standalone"
                      icon="edit"
                      size="2xLarge"
                      colour="black"
                      href={`/admin/games/${game.game_id}`}
                      internal
                  />
                </>
            )}
              {gameEnded &&  (
                  <>
                      <Button
                          icon="delete"
                          label={t('game_content_delete_game_link_label')}
                          onClick={() => setConfirmOpen(true)}
                          type="submit"
                          size="small"
                      />
                      {renderDeleteConfirm()}
                  </>
              )}
          </div>
        </div>
      </div>
  )
};



const Game = ({ game, reload }) => {

  return (
      <div className="game">
        <Accordion
            header={<Header game={game} />}
            content={<Content game={game} reload={reload} />}
            variant="compact"
        />
      </div>
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
