import { useContext } from "react";
import { PlayerContext } from "src/api/player-context";

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        // TODO: take them to a login page
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
}
