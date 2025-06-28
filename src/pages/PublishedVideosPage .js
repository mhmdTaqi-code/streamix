import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CircularProgress,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Home/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";

export default function PublishedVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  useEffect(() => {
    axios
      .get("https://dev1hunter.pythonanywhere.com/live/api/videos/")
      .then((res) => setVideos(res.data))
      .catch((err) => {
        console.error(err);
        alert("❌ فشل تحميل المقاطع");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: darkMode ? "#121212" : "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color={darkMode ? "inherit" : "primary"} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", bgcolor: darkMode ? "#121212" : "#fff" }}>
      <CssBaseline />

      {!isMobile && (
        <Box sx={{ width: 240, flexShrink: 0 }}>
          <Sidebar />
        </Box>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: 240,
              bgcolor: darkMode ? "#121212" : "#f9f9f9",
              color: darkMode ? "#fff" : "#000",
            },
          }}
        >
          <Sidebar />
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {isMobile && (
          <AppBar
            position="sticky"
            sx={{ bgcolor: darkMode ? "#1e1e1e" : "#f5f5f5", height: "56px" }}
          >
            <Toolbar
              sx={{
                minHeight: "56px !important",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
                <MenuIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
              </IconButton>
              <Typography variant="h6">المقاطع المنشورة</Typography>
            </Toolbar>
          </AppBar>
        )}

        <Typography variant="h5" mb={3} fontWeight="bold">
          المقاطع المنشورة
        </Typography>

        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                  boxShadow: 3,
                  borderRadius: 3,
                }}
                onClick={() => navigate(`/video/${video.id}`)}
              >
                {video.thumbnail ? (
                  <CardMedia
                    component="img"
                    height="180"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                ) : (
                  <CardMedia
                    component="video"
                    height="180"
                    src={video.video_file}
                    muted
                  />
                )}

                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {video.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
