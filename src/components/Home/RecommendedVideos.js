import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import Tilt from "react-parallax-tilt";

export default function RecommendedVideos() {
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("shuffledRecommended");
    if (saved) {
      setRecommended(JSON.parse(saved));
    } else {
      axios
        .get("https://dev1hunter.pythonanywhere.com/live/api/streams/")
        .then((res) => {
          const shuffled = [...res.data].sort(() => Math.random() - 0.5);
          localStorage.setItem("shuffledRecommended", JSON.stringify(shuffled));
          setRecommended(shuffled);
        })
        .catch((err) => {
          console.error("فشل في جلب الفيديوهات:", err);
        });
    }
  }, []);

  const handleMenuOpen = (event, video) => {
    setAnchorEl(event.currentTarget);
    setSelectedVideo(video);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVideo(null);
  };

  const handleAddToPlaylist = async () => {
    if (!selectedVideo) return;
    try {
      await axios.post(
        "https://dev1hunter.pythonanywhere.com/modle/live/api/playlists/1/add/",
        {
          title: selectedVideo.title,
          image: selectedVideo.thumbnail,
          streamer: selectedVideo.streamer || "Unknown",
        }
      );
      alert("تمت الإضافة إلى قائمة التشغيل ✅");
    } catch (error) {
      console.error("فشل في الإضافة:", error);
      alert("حدث خطأ أثناء الإضافة ❌");
    } finally {
      handleMenuClose();
    }
  };

  return (
    <Box sx={{ px: 2, mb: 4 }}>
      <Typography
        variant="h6"
        sx={{ color: darkMode ? "#fff" : "#000", mb: 2 }}
      >
        Recommended for You
      </Typography>

      <Grid container spacing={2}>
        {recommended.map((video, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.1}
                scale={1.03}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
              >
                <Card
                  sx={{
                    bgcolor: darkMode ? "#1e1e1e" : "#fafafa",
                    color: darkMode ? "#fff" : "#000",
                    borderRadius: 2,
                    boxShadow: darkMode
                      ? "0 8px 20px rgba(255,255,255,0.05)"
                      : "0 8px 20px rgba(0,0,0,0.1)",
                    position: "relative",
                  }}
                >
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, video)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: darkMode ? "#fff" : "#000",
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>

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
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500 }}
                      noWrap
                    >
                      {video.title || "No Title"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                      <Typography
                        variant="caption"
                        sx={{ color: darkMode ? "#ccc" : "text.secondary" }}
                      >
                        {video.streamer || "مستخدم غير معروف"}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAddToPlaylist}>أضف إلى قائمة التشغيل</MenuItem>
      </Menu>
    </Box>
  );
}
