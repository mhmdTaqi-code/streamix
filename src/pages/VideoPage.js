import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
  CssBaseline,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Home/Sidebar";
import { useSelector } from "react-redux";
import axiosInstance from "../Api/axiosInstance";
import axios from "axios";
import DefaultProfile  from "../assets/profile.png"

export default function VideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ownerProfile, setOwnerProfile] = useState(null);

  const isMobile = useMediaQuery("(max-width:768px)");
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  useEffect(() => {
    axiosInstance
      .get("/live/api/videos")
      .then((res) => {
        const match = res.data.find((item) => item.id.toString() === id);
        if (!match) return;

        // مقترحات
        const suggestedVideos = res.data.filter((v) => v.id !== match.id);
        setVideo({ ...match, suggested: suggestedVideos });

        // بيانات صاحب الفيديو
        if (match?.uploader) {
          axios
            .get(
              `https://dev1hunter.pythonanywhere.com/profile/${match.uploader}/`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then((res) => {
              setOwnerProfile(res.data);
            })
            .catch((err) => {
              console.error("فشل تحميل بيانات البروفايل", err);
            });
        }
      })
      .catch((err) => {
        console.error("فشل في تحميل الفيديو:", err);
        alert("❌ حدث خطأ أثناء تحميل الفيديو أو ليس لديك صلاحية.");
      })
      .finally(() => setLoading(false));
  }, [id]);

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

  if (!video) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          bgcolor: darkMode ? "#121212" : "#f5f5f5",
          color: darkMode ? "#fff" : "#000",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          لم يتم العثور على الفيديو.
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/home")}>
          العودة
        </Button>
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          overflowY: "auto",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {isMobile && (
          <AppBar
            position="sticky"
            sx={{ bgcolor: darkMode ? "#1e1e1e" : "#f5f5f5", height: "56px" }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
                <MenuIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
              </IconButton>
              <Typography variant="h6">مشاهدة الفيديو</Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box
          sx={{
            px: 2,
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {video.title}
          </Typography>
          <Typography variant="subtitle1" mb={3} color="text.secondary">
            {video.description}
          </Typography>

          <Card
            sx={{
              width: "100%",
              maxWidth: 960,
              boxShadow: 5,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ aspectRatio: "16 / 9" }}>
                {video.video_file.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    controls
                    src={video.video_file}
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={video.video_file}
                    alt={video.title}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover", border: "none" }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>

          {/* ✅ صورة واسم صاحب الفيديو */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 3,
              gap: 1,
              cursor: "pointer",
              textDecoration: "none",
            }}
            onClick={() => navigate(`/profile?username=${video.uploader}`)}
          >
            <img
              src={
                ownerProfile?.profile_picture ||
                ownerProfile?.user?.profile_picture ||
                DefaultProfile
              }
              alt={ownerProfile?.user?.username || video.uploader}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: darkMode ? "#aaa" : "#555",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Created by {ownerProfile?.user?.username || video.uploader}
            </Typography>
          </Box>

          {/* ✅ فيديوهات مقترحة */}
          <Box sx={{ width: "100%", maxWidth: 960, mt: 5 }}>
            <Typography variant="h6" mb={2}>
              فيديوهات مقترحة
            </Typography>
<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
  {video.suggested?.map((item) => (
    <Card
      key={item.id}
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        cursor: "pointer",
        borderRadius: 2,
        bgcolor: darkMode ? "#1e1e1e" : "#f5f5f5",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: 6,
        },
      }}
    onClick={() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  navigate(`/video/${item.id}`);
}}
    >
      <Box
        sx={{
          width: 160,
          height: 90,
          borderRadius: "8px 0 0 8px",
          overflow: "hidden",
        }}
      >
        {item.video_file.match(/\.(mp4|webm|ogg)$/i) ? (
          <video
            src={item.video_file}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            muted
          />
        ) : (
          <img
            src={item.video_file}
            alt={item.title}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        )}
      </Box>
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ color: darkMode ? "#fff" : "#111", mb: 0.5 }}
        >
          {item.title.length > 60 ? item.title.slice(0, 60) + "..." : item.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: darkMode ? "#aaa" : "#444",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.description || "لا يوجد وصف"}
        </Typography>
      </Box>
    </Card>
  ))}
</Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
}
