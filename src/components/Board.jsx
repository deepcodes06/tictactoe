import React from "react";

const Board = ({ board, handleClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 bg-purple-900 p-4 rounded-xl">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className="w-16 h-16 bg-gray-300 rounded-xl text-2xl font-bold flex items-center justify-center text-purple-700"
        >
          {cell === "X" ? (
            <span className="text-pink-500">X</span>
          ) : cell === "O" ? (
            <span className="text-cyan-400">O</span>
          ) : (
            ""
          )}
        </button>
      ))}
    </div>
  );
};

export default Board;