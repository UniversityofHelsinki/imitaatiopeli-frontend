import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '../../misc/ds/Accordion';
import Link from '../../misc/ds/Link';
import Tag from '../../misc/ds/Tag';
import './Game.css';
import Icon from "../../misc/ds/Icon.jsx";
import {useNotification} from "../../notification/NotificationContext.js";

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
    if (game.start_time && game.end_time) {
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

const Content = ({ game }) => {
  const { t } = useTranslation();
  const { setNotification } = useNotification();
  const joinUrl = `${window.location.origin}/games/${game.game_code}/join`;
  const gameWaiting = !game.start_time && !game.end_time;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl);
      setNotification(t('game_content_join_link_copied_notification'), 'success', true);
    } catch (error) {
      setNotification(error.cause?.status, 'error');
      console.error(error);
    }
  };

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


  return (
      <div className="game-content">
        <div className="game-content-data">
          <div>{t('game_content_theme')}  {game.configuration.theme_description}</div>
        </div>
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
                  <div>
                    <button className="button-plain game-button" onClick={handleCopy}>
                      <Icon name="link" aria-hidden="true" />
                      <span>{t('game_content_join_link_button')} </span>
                    </button>
                  </div>
                </>
            )}
          </div>
        </div>
      </div>
  )
};



const Game = ({ game }) => {

  return (
      <div className="game">
        <Accordion
            header={<Header game={game} />}
            content={<Content game={game} />}
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
