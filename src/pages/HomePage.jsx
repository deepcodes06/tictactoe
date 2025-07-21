import React from "react";
import { useNavigate } from "react-router-dom";
import rocket from "../assets/images/rocket.svg";
import ufo from "../assets/images/ufo.svg";
import star1 from "../assets/images/star1.svg?url";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">

      <div className="relative rounded-[20px] w-[360px] h-[650px] bg-indigo-500 overflow-hidden">

        <img src={star1} alt="star" className="absolute top-10 left-6 w-10 h-10" />
        <img src={star1} alt="star" className="absolute top-10 right-6 w-10 h-10" />
        <img src={star1} alt="star" className="absolute top-40 left-8 w-10 h-10" />
        <img src={star1} alt="star" className="absolute top-40 right-8 w-10 h-10" />

        <div className="flex flex-col items-center pt-12">
          <h1 className="text-yellow-300 text-5xl font-bold leading-snug">TIC</h1>
          <h1 className="text-pink-400 text-5xl font-bold leading-snug">TAC</h1>
          <h1 className="text-cyan-300 text-5xl font-bold leading-snug mb-4">TOE</h1>

          <div className="flex gap-2 mb-6">
            <img src={star1} alt="star" className="w-10 h-10" />
            <img src={star1} alt="star" className="w-10 h-10" />
            <img src={star1} alt="star" className="w-10 h-10" />
          </div>

          <button
            onClick={() => navigate("/selectgame")}
            className="mt-2 bg-white text-black text-lg font-semibold px-8 py-2 rounded-full shadow hover:scale-105 transition"
          >
            Let’s play
          </button>
        </div>

        <img
          src={rocket}
          alt="rocket"
          className="absolute bottom-3 left-3 w-30 h-30 rotate-[15deg]"
        />
        <img
          src={ufo}
          alt="ufo"
          className="absolute middle-6 right-1 w-40 h-40"
        />
      </div>
    </div>
  );
};

export default HomePage;
