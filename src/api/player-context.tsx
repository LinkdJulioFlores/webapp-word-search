'use client'

import { ReactNode, useState, createContext } from "react";
import { PlayerContextType, PlayerInfo } from "src/interfaces/apis";

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Create a provider component
function PlayerProvider({ children }: { children: ReactNode }) {
    // Default placeholder player
    const defaultPlayer: PlayerInfo = {
        ID: 'placeholder-id',
        playerID: '1',
        name: 'Julio Flores',
        firstName: "Julio",
        lastName: "Flores",
        joinedOn: new Date(),
        timePlayed: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        totalWordsFound: 0,
        bestTime: 0,
        currentGameID: undefined,
        lastLogin: new Date(),
        username: "ActualDiablo",
        email: 'placeholder@example.com',
    };

    // Initialize player state with the default player
    const [player, setPlayer] = useState<PlayerInfo | null>(defaultPlayer);
    return (
        <PlayerContext.Provider value={{ player, setPlayer }}>
            {children}
        </PlayerContext.Provider>
    );
}

export default PlayerProvider;
