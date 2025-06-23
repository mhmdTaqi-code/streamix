import React from "react";
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
  Badge,
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
} from "@mui/icons-material";

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
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#f9f9f9", // أفتح درجة بعد f5f5f5
        color: "#000",
        height: "100%",
        p: 2,
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        the Mind
      </Typography>

      {/* Icons Centered */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <IconButton sx={{ color: "#000" }}>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton sx={{ color: "#000" }}>
          <AccountCircle />
        </IconButton>
      </Box>

      {/* Menu List */}
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
