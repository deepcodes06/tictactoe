import React from "react";

const StatusBar = ({ statusText, isXNext, resetGame, showReset = true }) => (
  <div className="text-white mt-4 text-center">
    {statusText ? (
      <p className="text-lg font-bold">{statusText}</p>
    ) : (
      <p className="text-sm">Next: {isXNext ? "X" : "O"}</p>
    )}
    {showReset && (
      <button
        onClick={resetGame}
        className="mt-2 px-4 py-2 bg-white text-black rounded-full"
      >
        Reset Game
      </button>
    )}
  </div>
);

export default StatusBar;