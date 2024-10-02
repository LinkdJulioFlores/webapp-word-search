'use client';

import { useParams } from "next/navigation";
import { GameEntity } from "src/game/game-entity";
import { usePlayer } from "src/hooks/hooks";

/*
 * Main webpage that hosts the games depending on the game mode that the 
 * player picked
 */
function GameModePage() {
    const params = useParams();
    const { player } = usePlayer();

    // In the new setup, you will get the combined string like "original_word_search-10x12"
    const { gameparams } = params || {};

    // Check if gameparams exists and split it into gamemode and dimensions
    let gamemode = "";
    let height = 10;
    let width = 10;

    if (gameparams) {
        // Split at the "_" first, then split the dimensions part at "x"
        const [mode, dimensions] = gameparams.split('_');
        gamemode = mode;
        if (dimensions) {
            const [h, w] = dimensions.split('x').map(Number); // Converts "10x12" to [10, 12]
            height = h;
            width = w;
        }
    } else {
        // Go to error page
        console.error("Gameparams are not defined in the URL.");
    }

    const game = new GameEntity(gamemode, player, height, width);

    return (
        <main className="flex flex-col items-center px-4">
            <div className="w-full bg-blue-500">iofwejoweifj</div> 
        </main>
    );
}

export default GameModePage;
