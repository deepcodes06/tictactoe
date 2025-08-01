import React from "react";
import "../index.css"; 

const Board = ({ board, handleClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 bg-purple-900 p-4 rounded-xl">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className="w-16 h-16 bg-gray-300 rounded-xl flex items-center justify-center"
        >
      {cell === "X" ? (
        <span className="relative w-12 h-12 block">
        <span className="absolute top-1/2 left-1/2 w-full h-1 bg-pink-500 rotate-45 origin-center scale-x-100 animate-draw-x -translate-x-1/2 -translate-y-1/2"></span>
        <span className="absolute top-1/2 left-1/2 w-full h-1 bg-pink-500 -rotate-45 origin-center scale-x-100 animate-draw-x delay-150 -translate-x-1/2 -translate-y-1/2"></span>
        </span>
      ) : cell === "O" ? (
        <span className="relative w-12 h-12 block rounded-full border-4 border-cyan-400 animate-draw-o"></span>
      ) : (
          ""
      )}
        </button>
      ))}
    </div>
  );
};

export default Board;
