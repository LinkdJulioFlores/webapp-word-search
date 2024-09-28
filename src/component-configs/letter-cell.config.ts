export default class CellLetterConfig {
    private pLetter: string = "";
    private pIsClicked: boolean = false;
    private pParentWord: string = "";


    constructor(letter: string, parentWord: string) {
        this.pLetter = letter;
        this.pParentWord = parentWord;
    }

    get letter(): string | null {
        if (this.pLetter) {
            return this.pLetter;
        } 
        return null;
    }

    get parentWord(): string {
        return this.pParentWord;
    }

    get isSelected(): boolean {
        return this.pIsClicked;
    }

    onClick(): void {
        this.pIsClicked = !this.pIsClicked;
    }
}
