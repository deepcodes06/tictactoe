import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import Board from "../components/Board";
import { checkWinner, checkDraw } from "../utils/gameHelpers";

const OnlineGame = () => {
  const { roomId } = useParams();
  const [playerSymbol, setPlayerSymbol] = useState("");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [gameStatus, setGameStatus] = useState("Waiting for opponent...");
  const [score, setScore] = useState({ X: 0, O: 0 });

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("roomJoined", (symbol) => {
      setPlayerSymbol(symbol);
      setGameStatus("Game started!");
    });

    socket.on("updateBoard", (updatedBoard, nextTurn) => {
      setBoard(updatedBoard);
      setCurrentTurn(nextTurn);
    });

    socket.on("waiting", () => setGameStatus("Waiting for opponent..."));

    socket.on("gameOver", (winner) => {
      if (winner) {
        setGameStatus(`${winner} wins!`);
        setScore((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
      } else {
        setGameStatus("It's a draw!");
      }
    });

    socket.on("resetBoard", () => {
      setBoard(Array(9).fill(null));
      setCurrentTurn("X");
      setGameStatus("Game reset!");
    });

    return () => {
      socket.off("roomJoined");
      socket.off("updateBoard");
      socket.off("waiting");
      socket.off("gameOver");
      socket.off("resetBoard");
    };
  }, [roomId]);

  const handleClick = (index) => {
    if (board[index] || currentTurn !== playerSymbol) return;

    const updatedBoard = [...board];
    updatedBoard[index] = playerSymbol;

    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);
    const draw = checkDraw(updatedBoard);

    if (winner) {
      setGameStatus(`${winner} wins!`);
      setScore((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
      socket.emit("gameOver", { roomId, winner });
    } else if (draw) {
      setGameStatus("It's a draw!");
      socket.emit("gameOver", { roomId, winner: null });
    } else {
      const nextTurn = playerSymbol === "X" ? "O" : "X";
      setCurrentTurn(nextTurn);
      socket.emit("makeMove", { roomId, index, symbol: playerSymbol });
    }
  };

  const handleReset = () => {
    socket.emit("resetGame", roomId);
    setBoard(Array(9).fill(null));
    setCurrentTurn("X");
    setGameStatus("Game reset!");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-800">
      <div className="w-[380px] h-[700px] bg-indigo-600 rounded-2xl p-4 flex flex-col items-center justify-between shadow-xl">
        {/* Score Board */}
        <div className="w-full flex justify-between px-4 mt-2">
          <div className="bg-purple-800 text-white px-4 py-2 rounded-xl text-center w-[100px]">
            <p className="text-sm">Player One</p>
            <p className="text-pink-400 font-bold text-xl">X</p>
          </div>
          <div className="text-white text-2xl font-bold flex items-center justify-center">
            {score.X} : {score.O}
          </div>
          <div className="bg-purple-800 text-white px-4 py-2 rounded-xl text-center w-[100px]">
            <p className="text-sm">Player Two</p>
            <p className="text-yellow-400 font-bold text-xl">O</p>
          </div>
        </div>

        {/* Game Board */}
        <div className="flex-1 flex items-center justify-center">
          <Board board={board} handleClick={handleClick} />
        </div>

        {/* Game Status */}
        <p className="text-white text-sm text-center mt-2 mb-1">
          {gameStatus}
          <br />
          {currentTurn && (
            <>
              Next: <span className="font-bold">{currentTurn}</span>
            </>
          )}
        </p>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="mb-4 px-6 py-2 bg-white text-indigo-700 font-bold rounded-full shadow-md"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default OnlineGame;
