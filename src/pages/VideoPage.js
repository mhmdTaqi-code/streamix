// File: src/pages/VideoPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

// Mock video data
const videoData = 
    [
  {
    title: "Best Moments of 2025",
    description: "Watch the top viral clips of the year!",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
   {
    title: "Gaming Highlights",
    description: "Top plays from your favorite streamers.",
    videoUrl: "https://www.w3schools.com/html/movie.mp4"
  },
   {
    title: "Live Concert Experience",
    description: "Enjoy an immersive live concert session.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
   {
    title: "Epic Fails Compilation",
    description: "Laugh out loud at these hilarious fails.",
    videoUrl: "https://www.w3schools.com/html/movie.mp4"
  },
  ]

export default function VideoPage() {
//   const { id } = useParams();
  const video = videoData.map((item)=> (item))

//   if (!video) {
//     return <Typography sx={{ p: 4 }}>Video not found.</Typography>;
//   }

  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          {video.title}
        </Typography>
        <Typography variant="subtitle1" mb={3} color="text.secondary">
          {video.description}
        </Typography>
      </motion.div>

      <Paper
        elevation={3}
        sx={{
          maxWidth: "800px",
          width: "100%",
          overflow: "hidden",
          borderRadius: 3,
        }}
      >
        <video
          controls
          style={{ width: "100%", borderRadius: "12px" }}
          src={video.videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </Paper>
    </Box>
  );
}
