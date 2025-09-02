import Button from '../../misc/ds/Button';
import Icon from '../../misc/ds/Icon';
import './CopyGameUrlButton.css';
import {useTranslation} from "react-i18next";

const CopyGameUrlButton = ({ game }) => {
    const {t} = useTranslation();
    const joinUrl = `${window.location.origin}/games/${game.game_code}/join`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(joinUrl);
        } catch (err) {
            console.error(err);
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

export default CopyGameUrlButton;