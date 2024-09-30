import CellLetterConfig from "component-configs/letter-cell.config";

function LetterCellComponent({letter}: {letter: CellLetterConfig}) {
    return (

        <button className="h-4 w-4 p-0 m-0 bg-white text-center text-black text-xs font-light flex items-center justify-center border border-black">
            {letter.letter}
        </button>
    )
}

export default LetterCellComponent;
