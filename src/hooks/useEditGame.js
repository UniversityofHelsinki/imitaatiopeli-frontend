import { usePUT } from "./useHttp";

const useEditGame = (id) => {
    const put = usePUT({
        path: `/api/game/edit`,
        invalidates: [`GAME_${id}`, `GAMES`],
    });

    const edit = async (game) => {
        let response;
        try {
            response = await put(game);
        } catch (cause) {
            // Network/transport error before receiving a Response
            const error = new Error("Network error while editing game");
            error.cause = cause;
            throw error;
        }

        let body = await response.json();
        if (!response.ok) {
            const message =
                (body && typeof body === "object" && (body.errormessage || body.error || body.message)) ||
                (typeof body === "string" && body) ||
                response.statusText || "Request failed";

            const error = new Error(message);
            error.status = response.status;
            error.payload = body;
            error.response = response;
            throw error;
        }
        // Success path: return parsed body (JSON or text)
        return body;
    };

    return edit;
};

export default useEditGame;