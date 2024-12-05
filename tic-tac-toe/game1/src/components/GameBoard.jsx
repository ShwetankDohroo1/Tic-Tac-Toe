import { useState } from "react";

export default function GameBoard({onSelectsquare, board}){
    
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playersymbol,colIndex) => <li key={colIndex}><button onClick={() => onSelectsquare(rowIndex,colIndex)} disabled={playersymbol !== null}>{playersymbol}</button></li>) }
                </ol>
            </li> )}
        </ol>
    );
}