import { PlayerInfo } from "src/interfaces/apis";
import { GameMode } from "./gamemodes";
import OriginalLogic, { OriginalLogicProtocol } from "src/component-configs/original-logic.config";

// Manages the game and outcome 
export class GameEntity {
    private players: PlayerInfo[] = [];

    constructor(gamemode: GameMode, player: PlayerInfo, height: number, width: number) {
        this.players.push(player);
        const config = this.getGameConfig(gamemode);

        const game = new OriginalLogic(config);
    }

    private getGameConfig<T>(gamemode: GameMode): T {
        let config: T;
        if (gamemode === GameMode.original_word_search) {
            const ogLogic: OriginalLogicProtocol = {
                width: 10, 
                height: 10,
                enableOverlap: true,
                percentageOfWords: 0.45
            }
            config = ogLogic;
        } else if (gamemode === GameMode.word_search_blitz) {
            // To be implemented
            const blitzConfig: any = {
                speed: 5,
                difficulty: 'hard'
            };
            config = blitzConfig;
        } else {
            // We present an error
            throw new Error("Unsuported game mode");
        }

        return config;
    }
}

