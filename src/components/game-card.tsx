'use client'

import Link from "next/link";
import { GameMode } from "src/game/gamemodes";

export interface GameCardProtocol {
    title: string;
    description: string;
    gameMode: GameMode;
    height: number;
    width: number;
}

function GameCard({gameCard}: {gameCard: GameCardProtocol}) {

    return (
        <Link href={`games/${gameCard.gameMode}_${gameCard.height}x${gameCard.width}`}>
            <div
                id="game-info-card"
                className="w-64 rounded-md flex flex-col gap-2 overflow-hidden p-2 justify-between"
                onClick={() => {
                    {/* Initiate the game config and load the component with it. New Page? */}
                }}>

                <div> {/* Title */}
                    <h2 className="">{gameCard.title} {gameCard.height}x{gameCard.width}</h2>
                </div>
                <div className=""> {/* Description */}
                    <h3>{gameCard.description}</h3>
                </div>
                <div> {/* Link to game? Not necessary bc the entire card is the link */}
                    <p>Play -&gt;</p>
                </div>
            </div>
        </Link>
    );
}

export default GameCard;
