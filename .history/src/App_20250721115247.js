// App.jsx
import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import Login from "./pages/login";
import Register from "./pages/Register";
import Homepage from "./pages/Home";
import MyVideos from "./pages/MyVideos";
import LiveStreamLobby from "./pages/LiveStreamLobby";
import FollowPage from "./pages/FollowPage";
import TrendingPage from "./pages/TrendingPage";
import VideoPage from "./pages/VideoPage";
import Playlist from "./pages/Playlist";
import LiveStreamPage from "./pages/LiveStreamPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CategoryVideos from "./pages/CategoryVideos";
import Profile from "./pages/Profile";
import GameCentr from "./pages/GameCentr";  // <-- استيراد مكون الألعاب


function App() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        ...(mode === "dark"
          ? {
              background: { default: "#121212", paper: "#1d1d1d" },
              text: { primary: "#fff" },
            }
          : {
              background: { default: "#f9f9f9", paper: "#fff" },
              text: { primary: "#000" },
            }),
      },
    }), [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
<Route path="/home" element={<Homepage toggleTheme={() => setMode(prev => (prev === "light" ? "dark" : "light"))} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepage toggleTheme={() => setMode(prev => (prev === "light" ? "dark" : "light"))} />} />
          <Route path="/streamix" element={<Homepage />} />
          <Route path="/my-videos" element={<MyVideos />} />
          <Route path="/live" element={<LiveStreamLobby />} />
          <Route path="/FollowingPage" element={<FollowPage />} />
          <Route path="/VideoPage" element={<VideoPage />} />
          <Route path="/TrendingPage" element={<TrendingPage />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/live/:id" element={<LiveStreamPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/category/:id" element={<CategoryVideos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game" element={<GameCentr />} />
          <Route path="/video/:id" element={<VideoPage />} />
  {/* استخدم المكون هنا */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
