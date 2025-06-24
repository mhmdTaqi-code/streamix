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
  Notifications,
  AccountCircle,
  Logout,
  Login,
} from "@mui/icons-material";
import logo from "../../assets/1.png";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: <Home />, text: "New Feed" },
  { icon: <Whatshot />, text: "Trending" },
  { icon: <Subscriptions />, text: "Following" },
  { icon: <VideoLibrary />, text: "Your Videos" },
  { icon: <VideoLibrary />, text: "Playlist" },
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
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const isGuest = localStorage.getItem("isGuest");

    if (storedUsername) {
      setUsername(storedUsername);
    } else if (isGuest === "true") {
      setUsername("ضيف");
    } else {
      setUsername("ضيف");
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
        width: 240,
        bgcolor: "#f9f9f9",
        color: "#000",
        height: "100vh",
        p: 2,
        borderRight: "1px solid #e0e0e0",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        direction: "rtl",
        "& *": { direction: "ltr" },
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": { background: "#f0f0f0" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c1c1c1",
          borderRadius: "4px",
        },
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: "bold",
          direction: "rtl",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        STREAMIX <img style={{ width: "50px" }} src={logo} alt="logo" />
      </Typography>

      {/* اسم المستخدم وزر الدخول/الخروج */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", direction: "rtl", gap: 1, mb: 2 }}>
        <Typography variant="body1" fontWeight="bold">{username}</Typography>
        <IconButton sx={{ color: "#000" }}>
          <AccountCircle />
        </IconButton>
      </Box>

      {username === "ضيف" ? (
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Login />}
          onClick={handleLogin}
          sx={{ mb: 2 }}
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

      {/* القائمة الرئيسية */}
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ color: "#000" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, bgcolor: "#e0e0e0" }} />

      <Typography variant="subtitle2" sx={{ color: "#666", mb: 1 }}>
        Following
      </Typography>

      <List>
        {following.map((name, index) => (
          <ListItem button key={index} sx={{ borderRadius: 2 }}>
            <ListItemIcon>
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography sx={{ fontSize: 14 }}>{name}</Typography>}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, bgcolor: "#e0e0e0" }} />

      <List>
        <ListItem button>
          <ListItemIcon sx={{ color: "#000" }}>
            <Chat />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "#000" }}>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
}
