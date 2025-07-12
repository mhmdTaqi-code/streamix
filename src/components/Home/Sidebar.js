// Sidebar.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Button,
  Switch,
} from "@mui/material";
import {
  Home,
  Whatshot,
  Subscriptions,
  PlaylistPlay,
  SportsEsports,
  Logout,
  Login,
  Brightness4,
  Brightness7,
  VideoCameraFront,
} from "@mui/icons-material";
import logo from "../../assets/1.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { SIDEBAR_WIDTH } from "../../redux/type";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axiosInstance from "../../Api/axiosInstance";
import imgprofile from "../../assets/profile.png"

const menuItems = [
  { icon: <Home />, text: "Home", link: "/home" },
  { icon: <Whatshot />, text: "Trending", link: "/TrendingPage" },
  { icon: <Subscriptions />, text: "Following", link: "/FollowPage" },
  { icon: <PlaylistPlay />, text: "Playlist", link: "/playlist" },
  { icon: <SportsEsports />, text: "Game Center", link: "/game" },
  { icon: <VideoCameraFront />, text: "Zoom", link: "/zoom" },
];

export default function Sidebar() {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const following = useSelector((state) => state.following.list);
  const darkMode = mode === "dark";
  const isGuest = username === "Guest";

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const guest = localStorage.getItem("isGuest");

    if (storedUsername) {
      setUsername(storedUsername);

      axiosInstance
        .get(`/profile/${storedUsername}/`)
        .then((res) => {
          const pic = res.data.profile_picture;
          const fullUrl = pic.startsWith("http")
            ? pic
            : imgprofile
          setProfilePicture(fullUrl);
        })
        .catch((err) => console.error("Error fetching profile picture:", err));
    } else if (guest === "true") {
      setUsername("Guest");
    } else {
      setUsername("Guest");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("isGuest");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProtectedNavigation = (link) => {
    if (isGuest) {
      toast.info("You must log in first.");
    } else {
      navigate(link);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        width: SIDEBAR_WIDTH,
        bgcolor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#fff" : "#000",
        borderRight: `1px solid ${darkMode ? "#333" : "#ddd"}`,
        height: "100vh",
        p: 2,
        position: "sticky",
        top: 0,
        overflowY: "auto",
        direction: "ltr",
        "& *": { direction: "ltr" },
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": {
          background: darkMode ? "#2c2c2c" : "#f0f0f0",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: darkMode ? "#555" : "#c1c1c1",
          borderRadius: "4px",
        },
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        STREAMIX <img style={{ width: "50px" }} src={logo} alt="logo" />
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mb: 2,
          cursor: username !== "Guest" ? "pointer" : "default",
        }}
        onClick={() => {
          if (!isGuest) navigate("/profile");
        }}
      >
        <Avatar src={profilePicture} alt={username} sx={{ width: 32, height: 32 }} />
        <Typography variant="body1" fontWeight="bold">
          {username}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          px: 1,
          py: 1,
          borderRadius: 2,
          bgcolor: darkMode ? "#2c2c2c" : "#f0f0f0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {darkMode ? <Brightness4 /> : <Brightness7 />}
          <Typography fontSize={14}>{darkMode ? "Dark Mode" : "Light Mode"}</Typography>
        </Box>
        <Switch
          checked={darkMode}
          onChange={() => {
            const newMode = darkMode ? "light" : "dark";
            localStorage.setItem("themeMode", newMode);
            dispatch(toggleTheme());
          }}
          color="primary"
        />
      </Box>

      {isGuest ? (
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Login />}
          onClick={handleLogin}
          sx={{
            mb: 2,
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#777" : "#ccc",
          }}
        >
          Log In
        </Button>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{ mb: 2 }}
        >
          Log Out
        </Button>
      )}

      <List style={{ cursor: "pointer" }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{ borderRadius: 2 }}
            onClick={() =>
              ["Playlist", "Game Center", "Zoom", "Your Videos", "Following"].includes(
                item.text
              )
                ? handleProtectedNavigation(item.link)
                : navigate(item.link)
            }
          >
            <ListItemIcon sx={{ color: darkMode ? "#fff" : "#000" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, bgcolor: darkMode ? "#444" : "#e0e0e0" }} />

      <Typography
        variant="subtitle2"
        sx={{ color: darkMode ? "#aaa" : "#666", mb: 1 }}
      >
        Following
      </Typography>

      {isGuest ? (
        <Typography sx={{ color: darkMode ? "#999" : "#444", fontSize: 14 }}>
          Please log in to see followers.
        </Typography>
      ) : following.length === 0 ? (
        <Typography sx={{ color: darkMode ? "#999" : "#444", fontSize: 14 }}>
          You are not following anyone.
        </Typography>
      ) : (
        <List>
          {following.map((user, index) => (
            <ListItem button key={index} sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  src={
                    user.profile_picture?.startsWith("http")
                      ? user.profile_picture
                      : `https://dev1hunter.pythonanywhere.com${user.profile_picture}`
                  }
                  alt={user.username}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: 14, color: darkMode ? "#fff" : "#000" }}>
                    {user.username}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
