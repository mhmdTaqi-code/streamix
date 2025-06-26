// File: src/pages/LiveStreamLobby.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  TextField,
  Grid,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";

export default function LiveStreamLobby() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (!name || !room) return;
    setJoined(true);
  };

  if (joined) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          bgcolor: "#f5f5f5",
        }}
      >
        <Typography variant="h5" mb={2}>
          أهلاً {name}، تم الانضمام إلى غرفة البث ({room})
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" startIcon={<VideocamIcon />}>تشغيل الكاميرا</Button>
          <Button variant="contained" startIcon={<MicIcon />}>تشغيل المايك</Button>
          <Button variant="contained" startIcon={<ScreenShareIcon />}>مشاركة الشاشة</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper sx={{ p: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h5" mb={2}>
          غرفة البث المباشر
        </Typography>
        <TextField
          fullWidth
          label="اسم المستخدم"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="اسم الغرفة"
          variant="outlined"
          margin="normal"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleJoin}
        >
          دخول الغرفة
        </Button>
      </Paper>
    </Box>
  );
}
