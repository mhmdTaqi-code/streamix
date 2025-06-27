import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";

export default function LiveStreamPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  const youtubeId = location.state?.youtubeId;

  if (!youtubeId) {
    return (
      <Box
        sx={{
          height: "100vh",
          bgcolor: darkMode ? "#121212" : "#fff",
          color: darkMode ? "#fff" : "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          لم يتم العثور على معرف البث 😢
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/home")}
          startIcon={<ArrowBackIcon />}
        >
          العودة للرئيسية
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: darkMode ? "#000" : "#f9f9f9",
        color: darkMode ? "#fff" : "#000",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
        startIcon={<ArrowBackIcon />}
      >
        العودة
      </Button>

      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        البث المباشر
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: 960,
          aspectRatio: "16/9",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title="YouTube Live Stream"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </Box>
    </Box>
  );
}
