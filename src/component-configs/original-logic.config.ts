import CellLetterConfig from "./letter-cell.config";
import { Nullable } from "src/types/UncertainTypes";
import { WordStore } from "src/utils/words";

export default class OriginalLogic {
    private pHeight: Nullable<number> = null;
    private pWidth: Nullable<number> = null;

    private pWordsToFind: Nullable<string[]> = null;
    private pTotalLetters: Nullable<number> = null;
    private pMaxWordLength: Nullable<number> = null;

    private pGrid: Nullable<CellLetterConfig[][]> = null;
    private pWordPositions: Nullable<{ word: string, startRow: number, startCol: number, direction: string }[]> = null;

    private pSelectedLetters: CellLetterConfig[] = [];
    private pIsGameWon: boolean = false;

    constructor(height: number, width: number) {
        this.pHeight = height;
        this.pWidth = width;
        this.pTotalLetters = height * width;
        this.pWordsToFind = this.appropriateWords();  // Copy the words to find
        this.initializeGrid();
        console.log(this.pGrid);
    }

    private randomNumber(n: number) {
        return Math.floor(Math.random() * n);
    }

    private appropriateWords(): string[] {
        let numberOfWords: number = 0;

        if (this.pWidth === null || this.pHeight === null) return []; // Check that values are not null

        let greaterWidthBound = (this.pWidth < this.pHeight) ? this.pWidth : this.pHeight;
        greaterWidthBound -= 3; // We don't want our word to possibly be as wide as the grid

        const weightPercentage = Math.floor((this.pWidth * this.pHeight) * 0.45); // Max number of letters in words
        //console.log("Weight Percentage:", weightPercentage);

        let totalLettersInArray = 0;
        let chosenWords: string[] = [];

        while (totalLettersInArray < weightPercentage) {
            const rand = this.randomNumber(Math.min(WordStore.arrayOfWords.length, greaterWidthBound)); // Ensure within bounds
            const rand2 = this.randomNumber(WordStore.arrayOfWords[rand]!.length); // Safely get word from sub-array
            const word = WordStore.arrayOfWords[rand]![rand2]!;

            numberOfWords += 1;
            totalLettersInArray += word.length;
            chosenWords.push(word);

            //console.log(`Chosen word: ${word}, Total letters so far: ${totalLettersInArray}`);
        }

        console.log("Final Chosen Words:", chosenWords);
        //console.log("Total Letters in Array:", totalLettersInArray);

        return chosenWords;
    }

    private initializeGrid(): void {
        // Initialize the grid with empty cells
        this.pGrid = Array.from({ length: this.pHeight! }, () => 
            Array.from({ length: this.pWidth! }, () => new CellLetterConfig("", ""))
        );

        // Scatter the chosen words into the grid
        //this.scatterWords();

        // Fill the remaining cells with random letters
        //this.fillRemainingCells();
    }

    // Method to scatter words randomly into the grid
    private scatterWords(): void {
        const directions = ['horizontal', 'vertical', 'diagonal']; // Possible directions
        this.pWordsToFind!.forEach((word) => {
            let placed = false;

            while (!placed) {
                const direction = directions[this.randomNumber(directions.length)];
                const startRow = this.randomNumber(this.pHeight!);
                const startCol = this.randomNumber(this.pWidth!);

                if (this.canPlaceWord(word, startRow, startCol, direction!)) {
                    this.placeWord(word, startRow, startCol, direction!);
                    placed = true;
                }
            }
        });
    }

    // Method to check if a word can be placed at a certain position and direction
    private canPlaceWord(word: string, startRow: number, startCol: number, direction: string): boolean {
        if (direction === 'horizontal') {
            if (startCol + word.length > this.pWidth!) return false;
            for (let i = 0; i < word.length; i++) {
                if (this.pGrid![startRow]![startCol + i]!.letter !== "") return false; // Check overlap
            }
        } else if (direction === 'vertical') {
            if (startRow + word.length > this.pHeight!) return false;
            for (let i = 0; i < word.length; i++) {
                if (this.pGrid![startRow + i]![startCol]!.letter !== "") return false;
            }
        } else if (direction === 'diagonal') {
            if (startRow + word.length > this.pHeight! || startCol + word.length > this.pWidth!) return false;
            for (let i = 0; i < word.length; i++) {
                if (this.pGrid![startRow + i]![startCol + i]!.letter !== "") return false;
            }
        }
        return true; // The word can be placed
    }

    // Method to place a word in the grid
    private placeWord(word: string, startRow: number, startCol: number, direction: string): void {
        if (direction === 'horizontal') {
            for (let i = 0; i < word.length; i++) {
                this.pGrid![startRow]![startCol + i] = new CellLetterConfig(word[i]!, word);
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < word.length; i++) {
                this.pGrid![startRow + i]![startCol] = new CellLetterConfig(word[i]!, word);
            }
        } else if (direction === 'diagonal') {
            for (let i = 0; i < word.length; i++) {
                this.pGrid![startRow + i]![startCol + i] = new CellLetterConfig(word[i]!, word);
            }
        }
    }

    // Method to fill the remaining cells with random letters
    private fillRemainingCells(): void {
        //const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const alphabet = "abcdefghijkmnlopqrstuvwxyz";
        console.log(alphabet);
        for (let row = 0; row < this.pHeight!; row++) {
            for (let col = 0; col < this.pWidth!; col++) {
                if (this.pGrid![row]![col]!.letter === "") {
                    const randomLetter = alphabet[this.randomNumber(alphabet.length)];
                    this.pGrid![row]![col] = new CellLetterConfig(randomLetter!, "");
                }
            }
        }
    }


}
