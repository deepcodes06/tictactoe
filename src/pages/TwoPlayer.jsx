import React, { useState } from "react";
import PlayerScore from "../components/PlayerScore";
import Board from '../components/Board';
import StatusBar from "../components/StatusBar";
import { checkWinner, checkDraw } from "../utils/gameHelpers";
import trophy from "../assets/images/trophy.svg";
import draw from "../assets/images/draw.svg";

const TwoPlayer = () => {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState(null);
  const [statusText, setStatusText] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    const symbol = isXNext ? "X" : "O";
    newBoard[index] = symbol;
    setBoard(newBoard);

    const winnerSymbol = checkWinner(newBoard);
    if (winnerSymbol) {
      setStatusText(`🎉 ${winnerSymbol} wins!`);
      setWinner(winnerSymbol);
      setScore((prev) => ({ ...prev, [winnerSymbol]: prev[winnerSymbol] + 1 }));
    } else if (checkDraw(newBoard)) {
      setStatusText("Match Draw");
      setIsDraw(true);
    }
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setWinner(null);
    setStatusText(null);
    setIsXNext(true);
    setIsDraw(false);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="w-[360px] h-[650px] bg-indigo-500 rounded-[20px] p-4 flex flex-col items-center justify-between relative">
        <PlayerScore score={score} />
        <Board board={board} handleClick={handleClick} />
        <StatusBar statusText={statusText} isXNext={isXNext} resetGame={resetGame} showReset={true} />

        {winner && (
          <div className="absolute top-0 left-0  w-full h-full flex items-center justify-center">
            <div className="bg-[#2e0b87] text-center text-white p-6 rounded-3xl w-72">
              <h2 className="text-xl font-bold mb-4">
                {winner === "X" ? "Player One Win!" : "Player Two Win!"}
              </h2>
              <img src={trophy} alt="Winner" className="w-24 h-24 mx-auto mb-4" />
              <div className="flex justify-between mt-4">
                <button
                  onClick={resetGame}
                  className="bg-orange-400 text-white px-4 py-2 rounded-full mr-2"
                >
                  Back
                </button>
                <button
                  onClick={resetGame}
                  className="bg-orange-400 text-white px-4 py-2 rounded-full ml-2"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}

        {isDraw && (
          <div className="absolute top-0 left-0  w-full h-full flex items-center justify-center">
            <div className="bg-[#2e0b87] text-center text-white p-6 rounded-3xl w-72">
              <img src={draw} alt="Draw" className="w-24 h-24 mx-auto mb-4" />
              <div className="flex justify-between mt-4">
                <button
                  onClick={resetGame}
                  className="bg-orange-400 text-white px-4 py-2 rounded-full mr-2"
                >
                  Back
                </button>
                <button
                  onClick={resetGame}
                  className="bg-orange-400 text-white px-4 py-2 rounded-full ml-2"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoPlayer;