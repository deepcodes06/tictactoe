import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import planet from "../assets/images/planet.svg";
import robot from "../assets/images/robot.svg";
import controller from "../assets/images/controller.svg";
import multiplayer from "../assets/images/multiplayer.svg";

const SelectPage = () => {
  const navigate = useNavigate();
  const [showMultiplayerOptions, setShowMultiplayerOptions] = useState(false);
  const [roomCode, setRoomCode] = useState("");

const handleJoinRoom = () => {
  if (roomCode.trim() !== "") {
    navigate(`/onlinegame/${roomCode.trim()}`);
  }
};

const handleHostRoom = () => {
  const newRoom = crypto.randomUUID().slice(0, 6); // short room code
  navigate(`/onlinegame/${newRoom}`);
};


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-800">
      <div className="relative w-[360px] min-h-[650px] bg-indigo-500 rounded-[20px] p-6 overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-3xl font-semibold">Select Game</h2>
          <div className="relative flex items-center">
            <img src={planet} alt="planet" className="w-15 h-15" />
            <span className="absolute bottom-[-12px] right-0 bg-fuchsia-400 px-3 py-[2px] text-white text-sm rounded-full">
              100
            </span>
          </div>
        </div>

        <hr className="border-yellow-400 border-t-4 w-28 my-3 rounded" />

        <div className="mt-6 space-y-6">
          {/* Single Player */}
          <div className="flex items-center">
            <div className="z-20 bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center">
              <img src={robot} alt="robot" className="w-10 h-10" />
            </div>
            <button
              onClick={() => navigate("/singleplayer")}
              className="ml-[-10px] bg-orange-500 text-white font-medium px-5 py-3 rounded-r-full border-2 border-yellow-400 w-full text-left shadow-md"
            >
              Single Player
            </button>
          </div>

          {/* Two Players */}
          <div className="flex items-center">
            <div className="z-20 bg-pink-500 w-20 h-20 rounded-full flex items-center justify-center">
              <img src={controller} alt="controller" className="w-10 h-10" />
            </div>
            <button
              onClick={() => navigate("/twoplayer")}
              className="ml-[-10px] bg-fuchsia-600 text-white font-medium px-5 py-3 rounded-r-full border-2 border-pink-400 w-full text-left shadow-md"
            >
              Two Players
            </button>
          </div>

          {/* Play with Friends */}
          <div className="flex items-center">
            <div className="z-20 bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center">
              <img src={multiplayer} alt="multiplayer" className="w-10 h-10" />
            </div>
            <button
              onClick={() => setShowMultiplayerOptions(!showMultiplayerOptions)}
              className="ml-[-10px] bg-indigo-600 text-white font-medium px-5 py-3 rounded-r-full border-2 border-blue-300 w-full text-left shadow-md"
            >
              Play with Friends
            </button>
          </div>

          {showMultiplayerOptions && (
            <div className="space-y-3 mt-4">
              <input
                type="text"
                placeholder="Enter Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleJoinRoom}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md shadow"
                >
                  Join Room
                </button>
                <button
                  onClick={handleHostRoom}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md shadow"
                >
                  Host Room
                </button>
              </div>
            </div>
          )}

          <img
            src={controller}
            alt="controller"
            className="absolute bottom-4 right-4 w-10 h-10 rotate-[20deg]"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPage;
