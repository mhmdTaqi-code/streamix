import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LiveChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  useEffect(() => {
    axios
      .get("https://dev1hunter.pythonanywhere.com/live/api/streams/")
      .then((response) => {
        setChannels(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch channels");
        setLoading(false);
      });
  }, []);

  const extendedChannels = [...channels, ...channels];

  if (loading) {
    return <Typography sx={{ px: 2 }}>Loading channels...</Typography>;
  }

  if (error) {
    return (
      <Typography sx={{ px: 2 }} color="error">
        {error}
      </Typography>
    );
  }

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
        <Typography
          variant="h6"
          sx={{ color: darkMode ? "#fff" : "#000" }}
        >
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
              onClick={() => navigate(`/video/${channel.id}`)}
              sx={{
                minWidth: 240,
                bgcolor: darkMode ? "#1e1e1e" : "#fafafa",
                color: darkMode ? "#fff" : "#000",
                borderRadius: 2,
                cursor: "pointer",
                boxShadow: darkMode
                  ? "0 6px 12px rgba(255,255,255,0.04)"
                  : "0 6px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={channel.thumbnail}
                alt={channel.title}
              />
              <CardContent>
                <Chip label="Live" color="error" size="small" sx={{ mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {channel.title}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Avatar sx={{ width: 20, height: 20, mr: 1 }}>
                    {typeof channel.uploader === "string" &&
                    channel.uploader.length > 0
                      ? channel.uploader.charAt(0)
                      : "?"}
                  </Avatar>
                  <Typography
                    variant="caption"
                    sx={{ color: darkMode ? "#ccc" : "text.secondary" }}
                  >
                    {channel.uploader} - 4.2K watching
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}
