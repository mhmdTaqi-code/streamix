import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SuggestedVideos({ currentId }) {
  const [videos, setVideos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  const navigate = useNavigate();

  const themeMode = localStorage.getItem("themeMode") || "light";
  const darkMode = themeMode === "dark";

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

    try {
      const stored = localStorage.getItem("playlists");
      if (stored) setPlaylists(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load playlists from localStorage:", err);
    }
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

  const handleMenuOpen = (event, video) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedVideo(video);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVideo(null);
  };

  const handleAddToPlaylist = async (playlistId) => {
    if (!selectedVideo || !playlistId) return;
    try {
      await axios.post(
        `https://dev1hunter.pythonanywhere.com/live/api/playlists/${playlistId}/add/`,
        {
          stream_id: selectedVideo.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("✅ تم حفظ الفيديو في قائمة التشغيل");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.detail || "❌ حدث خطأ أثناء الإضافة";
      alert(errorMsg);
      console.error("فشل في الإضافة:", error);
    } finally {
      handleMenuClose();
    }
  };

  return (
    <Box
      sx={{
        mt: 6,
        px: 2,
        width: "100%",
        maxWidth: 960,
        bgcolor: darkMode ? "#121212" : "#f9f9f9",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
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
                position: "relative",
              }}
            >
              <Box
                sx={{
                  bgcolor: darkMode ? "#1e1e1e" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  position: "relative",
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
                    sx={{
                      color: darkMode ? "#ccc" : "#888",
                      display: "block",
                      mt: 0.5,
                    }}
                  >
                    التصنيف: {video.category_name || "غير محدد"}
                  </Typography>
                </CardContent>

                {/* زر الثلاث نقاط خارج CardContent */}
                <IconButton
                  onClick={(e) => handleMenuOpen(e, video)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 2,
                    bgcolor: darkMode ? "#2e2e2e" : "#ffffff",
                    boxShadow: 1,
                  }}
                >
                  <MoreVertIcon sx={{ color: darkMode ? "#ccc" : "#555" }} />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: darkMode ? "#2c2c2c" : "#fff",
            color: darkMode ? "#fff" : "#000",
          },
        }}
      >
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <MenuItem
              key={playlist.id}
              onClick={() => handleAddToPlaylist(playlist.id)}
            >
              {playlist.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>لا توجد قوائم تشغيل</MenuItem>
        )}
      </Menu>
    </Box>
  );
}
