import React, { useState, useEffect } from "react";
import PlayerScore from "../components/playerscore";
import Board from "../components/board";
import StatusBar from "../components/statusbar";
import { checkWinner, checkDraw } from "../utils/gameHelpers";

const SinglePlayer = () => {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState(null);
  const [statusText, setStatusText] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    if (!isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => playBotMove(board), 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner, isDraw]);

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    checkGameStatus(newBoard, "X");
    setIsXNext(false);
  };

  const playBotMove = (currentBoard) => {
    const emptyIndices = currentBoard.map((val, i) => val === null ? i : null).filter(v => v !== null);
    if (emptyIndices.length === 0) return;

    for (let idx of emptyIndices) {
      const tempBoard = [...currentBoard];
      tempBoard[idx] = "O";
      if (checkWinner(tempBoard) === "O") {
        makeMove(idx, "O");
        return;
      }
    }

    for (let idx of emptyIndices) {
      const tempBoard = [...currentBoard];
      tempBoard[idx] = "X";
      if (checkWinner(tempBoard) === "X") {
        makeMove(idx, "O");
        return;
      }
    }

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex, "O");
  };

  const makeMove = (index, symbol) => {
    const newBoard = [...board];
    newBoard[index] = symbol;
    setBoard(newBoard);
    checkGameStatus(newBoard, symbol);
    setIsXNext(true);
  };

  const checkGameStatus = (newBoard, symbol) => {
    const winnerSymbol = checkWinner(newBoard);
    if (winnerSymbol) {
      setStatusText(`🎉 ${winnerSymbol} wins!`);
      setWinner(winnerSymbol);
      setScore((prev) => ({ ...prev, [winnerSymbol]: prev[winnerSymbol] + 1 }));
    } else if (checkDraw(newBoard)) {
      setStatusText("Match Draw");
      setIsDraw(true);
    }
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setWinner(null);
    setStatusText(null);
    setIsDraw(false);
    setIsXNext(true);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="w-[360px] h-[650px] bg-indigo-500 rounded-[20px] p-4 flex flex-col items-center justify-between">
        <PlayerScore score={score} />
        <Board board={board} handleClick={handleClick} />
        <StatusBar statusText={statusText} isXNext={isXNext} resetGame={resetGame} showReset={!!(winner || isDraw)} />
      </div>
    </div>
  );
};

export default SinglePlayer;