import CellLetterConfig from "components/component-configs/letter-cell.config";
import LetterCellComponent from "components/components/letter-cell.component";
import Link from "next/link";

export default function HomePage() {
    const letterA = new CellLetterConfig("A", "Apple");
    const letterB = new CellLetterConfig("B", "Apple");
    const letterC = new CellLetterConfig("C", "Apple");
    const letterD = new CellLetterConfig("D", "Apple");


    return (
        <main>
            <div>
                { <LetterCellComponent letter={letterA}/> }
                { <LetterCellComponent letter={letterB}/> }
                { <LetterCellComponent letter={letterC}/> }
                { <LetterCellComponent letter={letterD}/> }
            </div>
        </main>
    );
};

