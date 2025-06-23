import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        height: 400,
        backgroundImage: 'url("https://wallpaperaccess.com/full/3703066.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 2,
        mx: 2,
        my: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          bgcolor: "rgba(255, 255, 255, 0.85)", // طبقة بيضاء شبه شفافة
          p: 2,
          borderRadius: 2,
          maxWidth: "90%",
        }}
      >
        <Chip label="Live" color="error" size="small" sx={{ mb: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000" }}>
          Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, mb: 2, color: "#444" }}>
          League of Legends • English
        </Typography>
        <Button variant="contained" sx={{ bgcolor: "#8b5cf6", borderRadius: 2 }}>
          Watch
        </Button>
      </Box>
    </Box>
  );
}
