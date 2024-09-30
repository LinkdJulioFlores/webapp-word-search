export default class CellLetterConfig {
    private pLetter: string = "";
    private pIsClicked: boolean = false;
    private pParentWord: string | null= "";


    constructor(letter: string, parentWord: string | null) {
        this.pLetter = letter;
        this.pParentWord = parentWord;
    }

    get letter(): string {
        return this.pLetter;
    }

    get parentWord(): string | null{
        return this.pParentWord;
    }

    get isSelected(): boolean {
        return this.pIsClicked;
    }

    onClick(): void {
        this.pIsClicked = !this.pIsClicked;
    }
}
