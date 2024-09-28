import CellLetterConfig from "components/component-configs/letter-cell.config";

function LetterCellComponent({letter}: {letter: CellLetterConfig}) {
    return (
        <button className="h-5 w-5 border-black bg-purple-50 text-center text-black font-light">
            {letter.letter}
        </button>
    )
}

export default LetterCellComponent;
