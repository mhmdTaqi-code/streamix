import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

export default function SelectTypeModal({ open, onClose, onSelect }) {
  const themeMode = localStorage.getItem("themeMode") || "light";
  const darkMode = themeMode === "dark";

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: darkMode ? "#1e1e1e" : "background.paper",
          color: darkMode ? "#fff" : "#000",
          p: 4,
          borderRadius: 2,
          width: 400,
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          ماذا تريد أن تنشر؟
        </Typography>
        <Stack spacing={2}>
          <Button
            variant="contained"
            startIcon={<LiveTvIcon />}
            onClick={() => onSelect("live")}
          >
            بث مباشر
          </Button>
          <Button
            variant="outlined"
            startIcon={<VideoLibraryIcon />}
            onClick={() => onSelect("video")}
          >
            فيديو مسجل
          </Button>
          <Button>إلغاء</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
