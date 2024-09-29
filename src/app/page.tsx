import CellLetterConfig from "component-configs/letter-cell.config";
import LetterCellComponent from "components/letter-cell.component";
import Link from "next/link";
import OriginalLogic from "src/component-configs/original-logic.config";

export default function HomePage() {
    const letterA = new CellLetterConfig("A", "Apple");

    const logic = new OriginalLogic(10, 10);

    return (
        <main>
            <div>
                { <LetterCellComponent letter={letterA}/> }
            </div>

            <button className="h-auto w-auto bg-white text-black">
                Button
            </button>;
        </main>
    );
};

