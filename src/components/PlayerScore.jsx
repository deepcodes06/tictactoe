import React from "react";

const PlayerScore = ({ score }) => (
  <div className="w-full flex justify-between items-center">
    <div className="text-white text-center">
      <div className="bg-purple-800 rounded-xl p-2">
        <p className="text-xs">Player One</p>
        <div className="text-pink-400 font-bold text-xl">X</div>
      </div>
    </div>
    <div className="text-white text-center">
      <p className="text-xl">{score.X} : {score.O}</p>
    </div>
    <div className="text-white text-center">
      <div className="bg-purple-800 rounded-xl p-2">
        <p className="text-xs">Player Two</p>
        <div className="text-yellow-400 font-bold text-xl">O</div>
      </div>
    </div>
  </div>
);

export default PlayerScore;