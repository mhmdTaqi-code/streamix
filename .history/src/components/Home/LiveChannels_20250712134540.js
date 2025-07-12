import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";
import Baseurl from "../../Api/BaceUrl";

export default function LiveChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  useEffect(() => {
   Baseurl
      .get("/live/api/streams/")
      .then((response) => {
        setChannels(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch channels");
        setLoading(false);
      });

    try {
      const stored = localStorage.getItem("playlists");
      if (stored) setPlaylists(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load playlists from localStorage:", err);
    }
  }, []);

  const handleToggleMenu = (e, videoId) => {
    e.stopPropagation();
    setOpenMenuId((prevId) => (prevId === videoId ? null : videoId));
  };

  const handleAddToPlaylist = async (playlistId, videoId) => {
    try {
      await axios.post(
        `https://dev1hunter.pythonanywhere.com/live/api/playlists/${playlistId}/add/`,
        {
          stream_id: videoId,
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
    } finally {
      setOpenMenuId(null);
    }
  };

  const extendedChannels = [...channels, ...channels];

  if (loading) return <Typography sx={{ px: 2 }}>Loading...</Typography>;
  if (error)
    return (
      <Typography sx={{ px: 2 }} color="error">
        {error}
      </Typography>
    );

  return (
    <Box sx={{ px: 2, mb: 4, overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: darkMode ? "#fff" : "#000" }}>
          Live channels
        </Typography>
        <Chip
          label="Popular"
          size="small"
          sx={{
            bgcolor: darkMode ? "#333" : "#eaeaea",
            color: darkMode ? "#fff" : "#000",
          }}
        />
      </Box>

      <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <motion.div
          style={{ display: "flex", gap: 16 }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {extendedChannels.map((channel, index) => (
            <Card
              key={`${channel.id}-${index}`}
              onClick={() => navigate(`/live/${channel.youtube_id}`)}
              sx={{
                minWidth: 240,
                bgcolor: darkMode ? "#1e1e1e" : "#fafafa",
                color: darkMode ? "#fff" : "#000",
                borderRadius: 2,
                cursor: "pointer",
                position: "relative",
                boxShadow: darkMode
                  ? "0 6px 12px rgba(255,255,255,0.04)"
                  : "0 6px 12px rgba(0,0,0,0.08)",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={
                  channel.thumbnail ||
                  "https://via.placeholder.com/320x180.png?text=No+Thumbnail"
                }
                alt={channel.title}
              />
              <CardContent>
                <Chip
                  label={channel.status === "live" ? "Live" : "Ended"}
                  size="small"
                  sx={{
                    mb: 1,
                    bgcolor:
                      channel.status === "live"
                        ? "error.main"
                        : darkMode
                        ? "#555"
                        : "#ccc",
                    color: "#fff",
                  }}
                />
                <Typography variant="subtitle1" fontWeight={500}>
                  {channel.title}
                </Typography>
              </CardContent>

              <IconButton
                onClick={(e) => handleToggleMenu(e, channel.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  bgcolor: darkMode ? "#2e2e2e" : "#fff",
                  boxShadow: 1,
                }}
              >
                <MoreVertIcon sx={{ color: darkMode ? "#ccc" : "#555" }} />
              </IconButton>

              <AnimatePresence>
                {openMenuId === channel.id && (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: 42,
                      right: 8,
                      backgroundColor: darkMode ? "#333" : "#fff",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                      borderRadius: 8,
                      minWidth: 180,
                      zIndex: 10,
                      overflow: "hidden",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {playlists.length > 0 ? (
                      playlists.map((playlist) => (
                        <MenuItem
                          key={playlist.id}
                          onClick={() =>
                            handleAddToPlaylist(playlist.id, channel.id)
                          }
                          sx={{
                            fontSize: 14,
                            color: darkMode ? "#fff" : "#000",
                            px: 2,
                            py: 1,
                          }}
                        >
                          أضف إلى: {playlist.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled sx={{ fontSize: 14 }}>
                        لا توجد قوائم تشغيل
                      </MenuItem>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}
