'use client'
import { useRef } from "react";
import GameCard, { GameCardProtocol } from "src/components/game-card";
import SwipeableComponent from "src/components/swipeable.component";
import { GameMode } from "src/game/gamemodes";
import { SwipeableRef } from "src/interfaces/apis";

function GamesPage() {
    const ogGameCard10: GameCardProtocol = {
        title: "",
        description: "Play the original word search game. The difficulty is increased the further you progress",
        gameMode: GameMode.original_word_search,
        height: 10,
        width: 10,
    }

    const ogGameCard20: GameCardProtocol = {
        title: "",
        description: "Play the original word search game. The difficulty is increased the further you progress",
        gameMode: GameMode.original_word_search,
        height: 20,
        width: 20,
    }

    const ogGameCard30: GameCardProtocol = {
        title: "",
        description: "Play the original word search game. The difficulty is increased the further you progress",
        gameMode: GameMode.original_word_search,
        height: 30,
        width: 30,
    }

    const blitzGameCard10: GameCardProtocol = {
        title: "",
        description: "Play the original word search game. The difficulty is increased the further you progress",
        gameMode: GameMode.word_search_blitz,
        height: 10,
        width: 10,
    }

    const blitzGameCard20: GameCardProtocol = {
        title: "",
        description: "Play the original word search game. The difficulty is increased the further you progress",
        gameMode: GameMode.word_search_blitz,
        height: 20,
        width: 20,
    }

    const blitzGameCard30: GameCardProtocol = {
        title: "",
        description: "Play the original word search game. The difficulty is increased the further you progress",
        gameMode: GameMode.word_search_blitz,
        height: 30,
        width: 30,
    }
    
    const items1 = [
        <GameCard gameCard={ogGameCard10}/>,
        <GameCard gameCard={ogGameCard20}/>,
        <GameCard gameCard={ogGameCard30}/>,
    ]

    const items2 = [
        <GameCard gameCard={blitzGameCard10}/>,
        <GameCard gameCard={blitzGameCard20}/>,
        <GameCard gameCard={blitzGameCard30}/>,
    ]
    
    const row1Ref= useRef<SwipeableRef>(null);  // Use `any` or better typing based on your ref
    const row2Ref= useRef<SwipeableRef>(null);  // Use `any` or better typing based on your ref

    // Call the nextSlide function from the SwipeableComponent
    const handleNextClickRow1 = () => {
        if (row1Ref.current) {
            row1Ref.current.nextSlide();
        }
    };

    // Call the prevSlide function from the SwipeableComponent
    const handlePrevClickRow1 = () => {
        if (row1Ref.current) {
            row1Ref.current.prevSlide();
        }
    };

    // Call the nextSlide function from the SwipeableComponent
    const handleNextClickRow2 = () => {
        if (row2Ref.current) {
            row2Ref.current.nextSlide();
        }
    };

    // Call the prevSlide function from the SwipeableComponent
    const handlePrevClickRow2 = () => {
        if (row2Ref.current) {
            row2Ref.current.prevSlide();
        }
    };

    return (
        <main className="w-full flex flex-col p-4 justify-between gap-5">
            {/*<div className="w-48 h-12 bg-red-500"></div> {/* For ads */}

            <div className="flex flex-col w-full gap-3 px-2"> {/* Main content */}
                <div> {/* Containes the genere title and game cards */}
                    <div className="flex flex-row items-center">
                        <h1>Word Search</h1>
                        <button id="left-arrow" className="ml-3 text-lg" onClick={handlePrevClickRow1}>&lt;-</button>
                        <button id="right-arrow" className="ml-1 text-lg" onClick={handleNextClickRow1}>-&gt;</button>
                    </div>
                        <SwipeableComponent ref={ row1Ref } items={ items1 } componentWidth={ 288 }/>
                </div>
            </div> 

            <div className="flex flex-col w-full gap-3 px-2"> {/* Main content */}
                <div> {/* Containes the genere title and game cards */}
                    <div className="flex flex-row items-center">
                        <h1>Blitz</h1>
                        <button id="left-arrow" className="ml-3 text-lg" onClick={handlePrevClickRow2}>&lt;-</button>
                        <button id="right-arrow" className="ml-1 text-lg" onClick={handleNextClickRow2}>-&gt;</button>
                    </div>
                        <SwipeableComponent ref={ row2Ref } items={ items2 } componentWidth={ 288 }/>
                </div>
            </div> 

            {/*}<div className="w-48 h-12 bg-red-500"></div> {/* For ads */}
        </main>
    );
}

export default GamesPage;
