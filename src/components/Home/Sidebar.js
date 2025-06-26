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
  IconButton,
  Button,
} from "@mui/material";
import {
  Home,
  Whatshot,
  Subscriptions,
  VideoLibrary,
  Settings,
  Chat,
  AccountCircle,
  Logout,
  Login,
} from "@mui/icons-material";
import logo from "../../assets/1.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { SIDEBAR_WIDTH } from "../../redux/type";

const menuItems = [
  { icon: <Home />, text: "Home", link: "/home" },
  { icon: <Whatshot />, text: "Trending", link: "/TrendingPage" },
  { icon: <Subscriptions />, text: "Following", link: "/profiles" },
  { icon: <VideoLibrary />, text: "Your Videos", link: "/my-videos" },
  { icon: <VideoLibrary />, text: "Playlist", link: "/VideoPage" },
];

const following = [
  "Dylan Hodges",
  "Vincent Parks",
  "Richard Bowers",
  "Isaac Lambert",
  "Lillie Nash",
  "Edith Cain",
  "Jerry Sherman",
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const isGuest = localStorage.getItem("isGuest");

    if (storedUsername) {
      setUsername(storedUsername);
    } else if (isGuest === "true") {
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

  return (
    <Box
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
          direction: "ltr",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        STREAMIX <img style={{ width: "50px" }} src={logo} alt="logo" />
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          direction: "ltr",
          gap: 1,
          mb: 2,
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          {username}
        </Typography>
        <IconButton sx={{ color: darkMode ? "#fff" : "#000" }}>
          <AccountCircle />
        </IconButton>
      </Box>

      {username === "Guest" ? (
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Login />}
          onClick={handleLogin}
          sx={{ mb: 2, color: darkMode ? "#fff" : "#000", borderColor: darkMode ? "#777" : "#ccc" }}
        >
          تسجيل الدخول
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
          تسجيل الخروج
        </Button>
      )}

      <Button
        variant="contained"
        fullWidth
        onClick={() => dispatch(toggleTheme())}
        sx={{
          mb: 2,
          bgcolor: darkMode ? "#333" : "#1976d2",
          color: "#fff",
          "&:hover": {
            bgcolor: darkMode ? "#444" : "#1565c0",
          },
        }}
      >
        التبديل إلى {darkMode ? "الوضع الفاتح" : "الوضع الليلي"}
      </Button>

      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{ borderRadius: 2 }}
            onClick={() => navigate(item.link)}
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

      <List>
        {following.map((name, index) => (
          <ListItem button key={index} sx={{ borderRadius: 2 }}>
            <ListItemIcon>
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: 14, color: darkMode ? "#fff" : "#000" }}>
                  {name}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, bgcolor: darkMode ? "#444" : "#e0e0e0" }} />

      <List>
        <ListItem button>
          <ListItemIcon sx={{ color: darkMode ? "#fff" : "#000" }}>
            <Chat />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: darkMode ? "#fff" : "#000" }}>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
}
