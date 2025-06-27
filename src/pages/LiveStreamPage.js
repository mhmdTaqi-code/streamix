import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";

export default function LiveStreamPage() {
  const { id } = useParams(); // youtube video id

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
        px: 2,
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
      >
        <LiveTvIcon color="error" />
        البث المباشر
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          aspectRatio: "16 / 9",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          width="100%"
          height="400"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Live Stream"
        />
      </Box>
    </Box>
  );
}
