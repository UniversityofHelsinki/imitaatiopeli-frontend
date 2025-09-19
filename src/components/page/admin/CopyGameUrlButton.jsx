import Button from '../../misc/ds/Button';
import Icon from '../../misc/ds/Icon';
import './CopyGameUrlButton.css';
import {useTranslation} from "react-i18next";
import {useNotification} from "../../notification/NotificationContext.js";
import PropTypes from "prop-types";

const CopyGameUrlButton = ({ game }) => {
    const {t} = useTranslation();
    const joinUrl = `${window.location.origin}/games/${game.game_code}/join`;
    const { setNotification } = useNotification();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(joinUrl);
            setNotification(t('game_content_join_link_copied_notification'), 'success', true);
        } catch (error) {
            setNotification(error.cause?.status, 'error');
        }
    };

    return (
        <div className="copy-game-url-button">
            {joinUrl}
            <Button
                variant="supplementary"
                onClick={handleCopy}
                aria-label={t('game_url_copy_button_aria_label')}
                title={t('game_url_copy_button_title')}
            >
                <Icon
                    name="link"
                />
            </Button>
        </div>
    );
};

CopyGameUrlButton.propTypes = {
  game: PropTypes.shape({
      game_code: PropTypes.string.isRequired
  })
};

export default CopyGameUrlButton;