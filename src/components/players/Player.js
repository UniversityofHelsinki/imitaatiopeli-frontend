import usePlayer from "../../hooks/usePlayer.js";
import {useTranslation} from "react-i18next";

const Player = (playerId) => {
    const { t } = useTranslation();

    const [player, error, reload] = usePlayer(playerId.playerId);

    const savePlayer = (event) => {
        event.preventDefault();
        console.log("savePlayer clicked");
        reload();
    }

    return (
        <>
            <div>Player ...</div>
            <div>{player?.playerId ? player.id : t(player?.message)}, playerId = {playerId.playerId}</div>
            <div>
                <input type="button" value="Add player" onClick={(event) => savePlayer(event)} />
            </div>
        </>
    )
}

export default Player;