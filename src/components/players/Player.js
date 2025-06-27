import usePlayer from "../../hooks/usePlayer.js";
import {useTranslation} from "react-i18next";

const Player = (playerId) => {
    const { t } = useTranslation();

    const [player, error, reload] = usePlayer(playerId.playerId);

    return (
        <>
            <div>Player ...</div>
            <div>{t(player?.message)}, playerId = {playerId.playerId}</div>
        </>
    )
}

export default Player;