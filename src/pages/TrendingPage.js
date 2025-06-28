import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  Drawer,
  IconButton,
  Toolbar,
  AppBar,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Sidebar from "../components/Home/Sidebar";
import { SIDEBAR_WIDTH } from "../redux/type";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TrendingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const isMobile = useMediaQuery("(max-width:768px)");
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("shuffledTrending");
    if (saved) {
      setVideos(JSON.parse(saved));
    } else {
      axios
        .get("https://dev1hunter.pythonanywhere.com/live/api/streams/")
        .then((res) => {
          const shuffled = [...res.data].sort(() => Math.random() - 0.5);
          localStorage.setItem("shuffledTrending", JSON.stringify(shuffled));
          setVideos(shuffled);
        })
        .catch((err) => {
          console.error("فشل في جلب الفيديوهات:", err);
        });
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: darkMode ? "#121212" : "#fff",
      }}
    >
      {!isMobile && (
        <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
          <Sidebar includeProfileAndNotifications={true} />
        </Box>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: "block",
            zIndex: 1401,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: SIDEBAR_WIDTH,
              bgcolor: darkMode ? "#121212" : "#f9f9f9",
              color: darkMode ? "#fff" : "#000",
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1401,
            },
          }}
        >
          <Sidebar includeProfileAndNotifications={true} />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{ flexGrow: 1, width: "100%", overflowY: "auto" }}
      >
        {isMobile && (
          <AppBar
            position="sticky"
            sx={{
              bgcolor: darkMode ? "#1e1e1e" : "#f5f5f5",
              boxShadow: "none",
              height: "56px",
              zIndex: 1100,
            }}
          >
            <Toolbar
              sx={{
                minHeight: "56px !important",
                px: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ p: 0 }}
              >
                <MenuIcon
                  sx={{ color: darkMode ? "#fff" : "#000", fontSize: 24 }}
                />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: darkMode ? "#fff" : "#000", fontWeight: "bold" }}
              >
                Trending
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box
          sx={{
            p: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={4}
              sx={{ color: darkMode ? "#fff" : "#000", textAlign: "center" }}
            >
              Trending Videos
            </Typography>
          </motion.div>

          <ToastContainer position="top-right" />

          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              maxWidth: 1200,
              width: "100%",
            }}
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id || index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                    bgcolor: darkMode ? "#1e1e1e" : "#fff",
                    color: darkMode ? "#fff" : "#000",
                    borderRadius: 2,
                  }}
                  onClick={() => navigate(`/live/${video.youtube_id}`)}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={
                      video.thumbnail ||
                      "https://via.placeholder.com/320x180.png?text=No+Thumbnail"
                    }
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography fontWeight="bold" noWrap>
                      {video.title || "No Title"}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
