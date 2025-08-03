import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SelectGame from "./pages/SelectGame";
import SinglePlayer from "./pages/SinglePlayer";
import TwoPlayer from "./pages/TwoPlayer";
import OnlineGame from "./pages/OnlineGame";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/onlinegame/:roomId" element={<OnlineGame />} />
          <Route path="/selectgame" element={<SelectGame />} />
          <Route path="/singleplayer" element={<SinglePlayer />} />
          <Route path="/twoplayer" element={<TwoPlayer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
