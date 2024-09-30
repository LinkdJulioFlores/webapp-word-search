import CellLetterConfig from "component-configs/letter-cell.config";
import LetterCellComponent from "src/components/letter-cell.component";
import OriginalLogic, { OriginalLogicProtocol } from "src/component-configs/original-logic.config";

export default function HomePage() {
    const ogLogicConfig: OriginalLogicProtocol = {
        height: 20,
        width: 20,
        percentageOfWords: 0.40,
        enableOverlap: true 
    }
    const logic = new OriginalLogic(ogLogicConfig);

    return (
        <main>
            <div className="grid grid-cols-30 gap-0">
                {/* Loop through the grid and render each letter */}
                {logic.grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((cell, colIndex) => (
                            <LetterCellComponent key={`${rowIndex}-${colIndex}`} letter={cell} />
                        ))}
                    </div>
                ))}
            </div>
        </main>
    );
};

