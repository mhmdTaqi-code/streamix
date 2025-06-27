import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Tooltip,
  Fade,
  Switch,
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
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import logo from "../../assets/1.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { SIDEBAR_WIDTH } from "../../redux/type";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const menuItems = [
  { icon: <Home />, text: "Home", link: "/home" },
  { icon: <Whatshot />, text: "Trending", link: "/TrendingPage" },
  { icon: <Subscriptions />, text: "Following", link: "/profiles" },
  { icon: <VideoLibrary />, text: "Your Videos", link: "/my-videos" },
  { icon: <VideoLibrary />, text: "Playlist", link: "/playlast" },
];

export default function Sidebar() {
  const [username, setUsername] = useState("");
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  const isGuest = username === "Guest";

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const guest = localStorage.getItem("isGuest");

    if (storedUsername) {
      setUsername(storedUsername);
      axios
        .get(`https://dev1hunter.pythonanywhere.com/profile/${storedUsername}/following/`)
        .then((res) => setFollowing(res.data))
        .catch((err) => console.error("Error fetching following:", err));
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
      toast.info("يجب تسجيل الدخول أولاً.");
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
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          {username}
        </Typography>
        <IconButton sx={{ color: darkMode ? "#fff" : "#000" }}>
          <AccountCircle />
        </IconButton>
      </Box>

      <Tooltip title={darkMode ? "الوضع الفاتح" : "الوضع الداكن"} arrow placement="top" TransitionComponent={Fade}>
        <Button
          fullWidth
          startIcon={darkMode ? <Brightness7 /> : <Brightness4 />}
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
          التبديل إلى {darkMode ? "الوضع الفاتح" : "الوضع الداكن"}
        </Button>
      </Tooltip>

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

      <List style={{ cursor: 'pointer' }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{ borderRadius: 2 }}
            onClick={() => {
              if (["Playlist", "Your Videos", "Following"].includes(item.text)) {
                handleProtectedNavigation(item.link);
              } else {
                navigate(item.link);
              }
            }}
          >
            <ListItemIcon sx={{ color: darkMode ? "#fff" : "#000" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, bgcolor: darkMode ? "#444" : "#e0e0e0" }} />

      <Typography variant="subtitle2" sx={{ color: darkMode ? "#aaa" : "#666", mb: 1 }}>
        Following
      </Typography>

      {isGuest ? (
        <Typography sx={{ color: darkMode ? "#999" : "#444", fontSize: 14 }}>
          يجب تسجيل الدخول لعرض المتابعين.
        </Typography>
      ) : following.length === 0 ? (
        <Typography sx={{ color: darkMode ? "#999" : "#444", fontSize: 14 }}>
          لا يوجد متابعين.
        </Typography>
      ) : (
        <List>
          {following.map((user, index) => (
            <ListItem button key={index} sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  src={user.profile_picture?.startsWith("http") ? user.profile_picture : `https://dev1hunter.pythonanywhere.com${user.profile_picture}`}
                  alt={user.username}
                />
              </ListItemIcon>
              <ListItemText
                primary={<Typography sx={{ fontSize: 14, color: darkMode ? "#fff" : "#000" }}>{user.username}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      )}

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
