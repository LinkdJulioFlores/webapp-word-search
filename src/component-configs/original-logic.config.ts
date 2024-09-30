import CellLetterConfig from "./letter-cell.config";
import { WordStore } from "src/utils/words";

export interface OriginalLogicProtocol {
    height: number;
    width: number;
    percentageOfWords: number;
    enableOverlap: boolean;
}

export default class OriginalLogic {
    private pHeight: number = 0;
    private pWidth: number = 0;

    private pWordsToFind: string[] = [];
    private pOverlapWords: boolean = false;

    private pGrid: CellLetterConfig[][] = [];
    private pPercentageOfWords = 0.45;
    private pAnswerGrid: CellLetterConfig[][] = [];

    private pSelectedLetters: CellLetterConfig[] = [];
    private pIsGameWon: boolean = false;

    constructor(config: OriginalLogicProtocol) {
        if (config.height === null || config.width === null || config.enableOverlap === null) return;
        this.pHeight = config.height;
        this.pWidth = config.width;
        if (config.percentageOfWords !== null) this.pPercentageOfWords = config.percentageOfWords;
        if (this.pPercentageOfWords < 0 || this.pPercentageOfWords > 1.0) this.pPercentageOfWords = 0.40;
        this.pOverlapWords = config.enableOverlap;
        this.chooseWordsToFind();  // Copy the words to find
        this.initializeGrid();
        this.scatterWords();
        this.fillRemainingCells();
        console.log('\n\n');
        this.printGrid();
    }

    private randomNumber(n: number) {
        return Math.floor(Math.random() * n);
    }

    private chooseWordsToFind(): void {
        let numberOfWords: number = 0;

        if (this.pWidth === null || this.pHeight === null) return; // Check that values are not null

        let greaterWidthBound = (this.pWidth < this.pHeight) ? this.pWidth : this.pHeight;
        greaterWidthBound -= 3; // We don't want our word to possibly be as wide as the grid

        const weightPercentage = Math.floor((this.pWidth * this.pHeight) * this.pPercentageOfWords); // Max number of letters in words
        //console.log("Weight Percentage:", weightPercentage);

        let totalLettersInArray = 0;

        while (totalLettersInArray < weightPercentage) {
            const rand = this.randomNumber(Math.min(WordStore.arrayOfWords.length, greaterWidthBound)); // Ensure within bounds
            const rand2 = this.randomNumber(WordStore.arrayOfWords[rand]!.length); // Safely get word from sub-array
            const word = WordStore.arrayOfWords[rand]![rand2]!;

            numberOfWords += 1;
            totalLettersInArray += word.length;
            this.pWordsToFind.push(word);
        }
    }

    private initializeGrid(): void {
        // Initialize an empty grid array
        this.pGrid = [];

        // Use two nested loops to fill the grid with empty CellLetterConfig instances
        for (let row = 0; row < this.pHeight!; row++) {
            const rowArray: CellLetterConfig[] = [];  // Initialize each row
            for (let col = 0; col < this.pWidth!; col++) {
                // Add an empty CellLetterConfig instance to the row
                rowArray.push(new CellLetterConfig("", ""));
            }
            // Push the completed row into the grid
            this.pGrid.push(rowArray);
        }
    }

    private printGrid(): void {
        if (!this.pGrid || this.pGrid.length === 0) {
            console.log("Grid is empty.");
            return;
        }

        for (let row = 0; row < this.pGrid.length; row++) {
            let rowString = "";  // Initialize an empty string to hold the row's letters
            for (let col = 0; col < this.pGrid[row]!.length; col++) {
                const letter = this.pGrid[row]![col]!.letter || "-";  // Use "-" as a placeholder for empty letters
                rowString += letter + " ";  // Add the letter to the row string, followed by a space
            }
            console.log(rowString.trim());  // Print the row after trimming extra spaces
        }
        this.pAnswerGrid = this.pGrid;
    }

    // Method to scatter words randomly into the grid
    private scatterWords(): void {
        const directions = ['horizontal', 'vertical', 'diagonal']; // Possible directions
        this.pWordsToFind!.forEach((word) => {
            let placed = false;

            while (!placed) {
            //for (let i=0; i<100; i++) {
                const rand = Math.floor(Math.random() * directions.length);
                const direction = directions[rand];
                const startRow = this.randomNumber(this.pHeight);
                const startCol = this.randomNumber(this.pWidth);

                if (this.canPlaceWord(word, startRow, startCol, direction)) {
                    this.placeWord(word, startRow, startCol, direction!);
                  placed = true;
                } 
            }
        });
        for (let row = 0; row < this.pGrid.length; row++) {
            let rowString = "";  // Initialize an empty string to hold the row's letters
            for (let col = 0; col < this.pGrid[row].length; col++) {
                const letter = this.pGrid[row][col].letter || "-";  // Use "-" as a placeholder for empty letters
                rowString += letter + " ";  // Add the letter to the row string, followed by a space
            }
            console.log(rowString.trim());  // Print the row after trimming extra spaces
        }
    }

    // Method to place a word in the grid
    private placeWord(word: string, startRow: number, startCol: number, direction: string): void {
        if (direction === 'horizontal') {
            for (let i = 0; i < word.length; i++) {
                this.pGrid![startRow][startCol + i] = new CellLetterConfig(word[i], word);
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < word.length; i++) {
                this.pGrid![startRow + i][startCol] = new CellLetterConfig(word[i], word);
            }
        } else if (direction === 'diagonal') {
            for (let i = 0; i < word.length; i++) {
                this.pGrid![startRow + i][startCol + i] = new CellLetterConfig(word[i], word);
            }
        }
    }

    private overlapIsEnabled(): boolean {
        return this.pOverlapWords;
    }

    // Method to check if a word can be placed at a certain position and direction
    private canPlaceWord(word: string, startRow: number, startCol: number, direction: string | undefined): boolean {
        if (!(this.pGrid && this.pGrid.length > 0)) return false;

        const allowOverlap = this.overlapIsEnabled();  // Check if overlap is enabled

        // Horizontal direction
        if (direction === 'horizontal') {
            if (startCol + word.length > this.pWidth!) return false;
            for (let i = 0; i < word.length; i++) {
                const letter = this.pGrid![startRow]![startCol + i].letter;

                // If overlap is enabled, allow same letter or empty space
                // If overlap is not enabled, only allow empty spaces
                if (allowOverlap) {
                    if (letter !== "" && letter !== word[i]) return false; // Allow overlap with same letter or empty
                } else {
                    if (letter !== "") return false; // Only empty cells allowed
                }
            }
        }

        // Vertical direction
        else if (direction === 'vertical') {
            if (startRow + word.length > this.pHeight!) return false;
            for (let i = 0; i < word.length; i++) {
                const letter = this.pGrid![startRow + i]![startCol].letter;

                if (allowOverlap) {
                    if (letter !== "" && letter !== word[i]) return false; // Allow overlap with same letter or empty
                } else {
                    if (letter !== "") return false; // Only empty cells allowed
                }
            }
        }

        // Diagonal direction
        else if (direction === 'diagonal') {
            if (startRow + word.length > this.pHeight! || startCol + word.length > this.pWidth!) return false;
            for (let i = 0; i < word.length; i++) {
                const letter = this.pGrid![startRow + i]![startCol + i].letter;

                if (allowOverlap) {
                    if (letter !== "" && letter !== word[i]) return false; // Allow overlap with same letter or empty
                } else {
                    if (letter !== "") return false; // Only empty cells allowed
                }
            }
        }

        return true; // The word can be placed
    }


    // Method to fill the remaining cells with random letters
    private fillRemainingCells(): void {
        //const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const alphabet = "abcdefghijkmnlopqrstuvwxyz";
        for (let row = 0; row < this.pHeight!; row++) {
            for (let col = 0; col < this.pWidth!; col++) {
                if (this.pGrid![row][col].letter === "") {
                    const randomLetter = alphabet[this.randomNumber(alphabet.length)];
                    this.pGrid![row][col] = new CellLetterConfig(randomLetter, "");
                }
            }
        }
    }

    get grid(): CellLetterConfig[][] {
        return this.pGrid;
    }
}

