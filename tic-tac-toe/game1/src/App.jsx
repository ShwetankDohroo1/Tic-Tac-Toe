import { useState } from 'react';

import Log from './components/Log.jsx';
import Player from './components/player.jsx';
import GameBoard from './components/GameBoard.jsx';
import { WINNING_COMBINATIONS } from './components/wining-combo.js';
import Gameover from './components/Gameover.jsx';

const PLAYERS = {
  X:'Player 1',
  O:'Player 2'
};
const initialgameboard = [[null, null, null], [null, null, null], [null, null, null]];

function deriveplayer(gameturn) {
  let currplayer = 'X';

  if (gameturn.length > 0 && gameturn[0].player === 'X') {
    currplayer = 'O';
  }
  return currplayer;
}

function derivegameboard(gameturn) {
  let gameBoard = [...initialgameboard.map(array => [...array])];

  for (const turn of gameturn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combs of WINNING_COMBINATIONS) {
    const firstsquare = gameBoard[combs[0].row][combs[0].column];
    const secondsquare = gameBoard[combs[1].row][combs[1].column];
    const thirdsquare = gameBoard[combs[2].row][combs[2].column];
    if (firstsquare && firstsquare === secondsquare && firstsquare === thirdsquare) {
      winner = players[firstsquare];
    }
  }
  return winner;
}

function App() {

  const [players, setplayers] = useState(PLAYERS)
  const [gameturn, setgameturn] = useState([]);
  const activeplayer = deriveplayer(gameturn);

  const gameBoard = derivegameboard(gameturn);
  const winner = deriveWinner(gameBoard, players);

  const draw = gameturn.length === 9 && !winner;

  function handleselectsquare(rowIndex, colIndex) {
    setgameturn(prevturn => {
      const currentplayer = deriveplayer(prevturn);

      const updatedturn = [{ square: { row: rowIndex, col: colIndex }, player: currentplayer }, ...prevturn];
      return updatedturn;
    });
  }
  function handleRemtch() {
    setgameturn([]);
  }
  function handlename(symbol, newname) {
    setplayers(prevplayer => {
      return {
        ...prevplayer,
        [symbol]: newname
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isactive={activeplayer === 'X'} onchangename={handlename} />
          <Player initialName={PLAYERS.O} symbol="O" isactive={activeplayer === 'O'} onchangename={handlename} />
        </ol>
        {(winner || draw) && <Gameover winner={winner} onrestart={handleRemtch} />}
        <GameBoard onSelectsquare={handleselectsquare} activeplayersymbol={activeplayer} board={gameBoard} />

      </div>
      <Log turns={gameturn} />
    </main>
  )
}

export default App