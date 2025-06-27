// File: src/components/Live/SuggestedVideos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  Chip,
  Avatar,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SuggestedVideos({ currentId }) {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://dev1hunter.pythonanywhere.com/live/api/streams/")
      .then((response) => {
        const filtered = response.data.filter(
          (item) => item.youtube_id !== currentId
        );
        setVideos(filtered);
      })
      .catch((error) => {
        console.error("Error fetching suggested videos:", error);
      });
  }, [currentId]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Box sx={{ mt: 6, px: 2, width: "100%", maxWidth: 960 }}>
      <Typography variant="h6" gutterBottom>
        فيديوهات مقترحة
      </Typography>
      <Grid container spacing={2}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <motion.div
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate(`/live/${video.youtube_id}`)}
              style={{
                cursor: "pointer",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    video.thumbnail ||
                    "https://via.placeholder.com/320x180.png?text=No+Thumbnail"
                  }
                  alt={video.title}
                />
                <CardContent>
                  {video.status === "live" && (
                    <Chip
                      label="Live"
                      color="error"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  )}

                  <Typography variant="subtitle1" fontWeight={500}>
                    {video.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "#888", display: "block", mt: 0.5 }}
                  >
                    التصنيف: {video.category_name || "غير محدد"}
                  </Typography>
                </CardContent>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
