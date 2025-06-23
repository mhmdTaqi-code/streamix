import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar
} from "@mui/material";
import { Home, Whatshot, Subscriptions, VideoLibrary, Settings, Chat } from "@mui/icons-material";

const menuItems = [
  { icon: <Home />, text: "New Feed" },
  { icon: <Whatshot />, text: "Trending" },
  { icon: <Subscriptions />, text: "Following" },
  { icon: <VideoLibrary />, text: "Your Videos" },
  { icon: <VideoLibrary />, text: "Playlist" }
];

const following = [
  "Dylan Hodges",
  "Vincent Parks",
  "Richard Bowers",
  "Isaac Lambert",
  "Lillie Nash",
  "Edith Cain",
  "Jerry Sherman"
];

export default function Sidebar() {
  return (
    <Box sx={{ width: 240, bgcolor: "#161616", color: "white", height: "100%", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        the Mind
      </Typography>

      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, bgcolor: "#333" }} />

      <Typography variant="subtitle2" sx={{ color: "gray", mb: 1 }}>
        Following
      </Typography>

      <List>
        {following.map((name, index) => (
          <ListItem button key={index} sx={{ borderRadius: 2 }}>
            <ListItemIcon>
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            <ListItemText primary={<Typography sx={{ fontSize: 14 }}>{name}</Typography>} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2, bgcolor: "#333" }} />

      <List>
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}><Chat /></ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
}