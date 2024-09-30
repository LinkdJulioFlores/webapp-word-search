import CellLetterConfig from "component-configs/letter-cell.config";

function LetterCellComponent({letter}: {letter: CellLetterConfig}) {
    return (
        <button className="h-4 w-4 p-0 m-0 text-center text-xs font-light flex items-center justify-center border border-white">
            {letter.letter}
        </button>
    )
}

export default LetterCellComponent;
