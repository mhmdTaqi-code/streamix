// File: src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Home"; 
import MyVideos from "./pages/MyVideos";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/streamix" element={<Homepage />} />
        <Route path="/my-videos" element={<MyVideos />} />
      </Routes>
    </Router>
  );
}

export default App;
