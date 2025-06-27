import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Divider,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Container,
} from "@mui/material";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Home/Sidebar";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { SIDEBAR_WIDTH } from "../redux/type";
import axios from "axios";

export default function MyVideos() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      setError("Token or username not found in localStorage");
      return;
    }

    // Fetch user profile image
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/profile/${username}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const imageUrl =
          res.data.profile_picture || res.data.user.profile_picture;
        setUserImage(imageUrl); // could be null
      } catch (err) {
        console.error("Failed to fetch profile image", err);
      }
    };

    // Fetch user videos
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/live/api/videos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setVideos(response.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        if (error.response) {
          setError(`Server Error: ${error.response.status}`);
        } else if (error.request) {
          setError("No response received from server.");
        } else {
          setError("Request error: " + error.message);
        }
      }
    };

    fetchProfile();
    fetchVideos();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: darkMode ? "#121212" : "#fff",
        minHeight: "100vh",
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
              width: SIDEBAR_WIDTH,
              bgcolor: darkMode ? "#121212" : "#f9f9f9",
              color: darkMode ? "#fff" : "#000",
            },
          }}
        >
          <Sidebar includeProfileAndNotifications={true} />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
          background: darkMode ? "#1e1e1e" : "#f9f9f9",
        }}
      >
        {isMobile && (
          <AppBar
            position="sticky"
            sx={{
              bgcolor: darkMode ? "#1e1e1e" : "#f5f5f5",
              boxShadow: "none",
              height: "56px",
              zIndex: 1200,
            }}
          >
            <Toolbar
              sx={{
                minHeight: "56px !important",
                px: 1,
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
                My Videos
              </Typography>
              <Box sx={{ width: 24 }} />
            </Toolbar>
          </AppBar>
        )}

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              src={userImage || "/default-profile.png"}
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color={darkMode ? "#fff" : "text.primary"}
            >
              My Videos
            </Typography>
          </Box>

          <Divider sx={{ mb: 4, bgcolor: darkMode ? "#555" : "#ccc" }} />

          {error && (
            <Typography
              variant="h6"
              color="error"
              sx={{ textAlign: "center", mb: 4 }}
            >
              {error}
            </Typography>
          )}

          <Grid container spacing={3} justifyContent="center">
            {videos.length > 0
              ? videos.map((video, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={video.id}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Tilt
                      glareEnable={true}
                      glareMaxOpacity={0.3}
                      glareColor="#ffffff"
                      glarePosition="bottom"
                      scale={1.02}
                      transitionSpeed={1500}
                      style={{ width: "100%", maxWidth: 300 }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
                        }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        style={{ width: "100%" }}
                      >
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: 4,
                            bgcolor: darkMode ? "#2c2c2c" : "#fff",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={video.thumbnail}
                            alt={video.title}
                            sx={{
                              objectFit: "cover",
                              width: "100%",
                              height: { xs: 140, sm: 160 },
                            }}
                          />
                          <CardContent>
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              color={darkMode ? "#fff" : "text.primary"}
                              sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
                            >
                              {video.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={darkMode ? "#ccc" : "text.secondary"}
                              sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" } }}
                            >
                              {video.views || 0} views
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Tilt>
                  </Grid>
                ))
              : !error && (
                  <Typography variant="h6" color="text.primary">
                    No videos available
                  </Typography>
                )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
