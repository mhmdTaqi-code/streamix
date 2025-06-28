import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  useMediaQuery,
  CssBaseline,
  Toolbar,
  AppBar,
  Modal,
  Stack,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Sidebar from "../components/Home/Sidebar";
import SuggestedVideos from "../components/LiveStream/SuggestedVideos";
import { useSelector } from "react-redux";
import axios from "axios";

export default function LiveStreamPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  useEffect(() => {
    fetch("https://dev1hunter.pythonanywhere.com/live/api/streams/")
      .then((res) => res.json())
      .then((data) => {
        const match = data.find((item) => item.youtube_id === id);
        setStream(match);

        const username = localStorage.getItem("username");
        if (match && username && match.owner_name === username) {
          setShowDashboard(true);
        }
      })
      .catch((error) => {
        console.error("حدث خطأ:", error);
        alert("❌ فشل في تحميل البيانات");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEndStream = async () => {
    try {
      await axios.put(
        `https://dev1hunter.pythonanywhere.com/live/api/streams/${stream.id}/`,
        {
          title: stream.title,
          description: stream.description || "",
          youtube_id: stream.youtube_id,
          status: "ended",
          category: stream.category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      alert("✅ تم إنهاء البث بنجاح");
      setDashboardOpen(false);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("❌ حدث خطأ أثناء إنهاء البث");
    }
  };

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

  if (!stream) {
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
          لم يتم العثور على البث المطلوب.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/home")}
        >
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
              <Typography variant="h6">البث المباشر</Typography>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mb: 2,
              width: "100%",
              maxWidth: 960,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LiveTvIcon color="error" />
              <Typography variant="h6" fontWeight="bold">
                البث المباشر - {stream.title}
              </Typography>
            </Box>

            {showDashboard && (
              <Tooltip title="إنهاء البث نهائيًا">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setDashboardOpen(true)}
                  sx={{ borderRadius: 2, px: 3, py: 1 }}
                >
                  إنهاء البث
                </Button>
              </Tooltip>
            )}
          </Box>

          <Box sx={{ width: "100%", maxWidth: 960, position: "relative" }}>
            <Card
              sx={{
                width: "100%",
                boxShadow: 5,
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#000",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ aspectRatio: "16/9" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${stream.youtube_id}?autoplay=1`}
                    width="100%"
                    height="100%"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={stream.title}
                    style={{ border: "none" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Typography
            variant="body2"
            sx={{
              mb: 3,
              mt: 2,
              textAlign: "center",
              color: darkMode ? "#aaa" : "#555",
              fontStyle: "italic",
            }}
          >
            Createrd by {stream.owner_name}
          </Typography>

          <SuggestedVideos currentId={stream.youtube_id} />
        </Box>

        <Modal open={dashboardOpen} onClose={() => setDashboardOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: darkMode ? "#1e1e1e" : "#fff",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <Typography variant="h6" gutterBottom>
              هل تريد إنهاء البث؟
            </Typography>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button onClick={() => setDashboardOpen(false)}>إلغاء</Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleEndStream}
              >
                إنهاء البث
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
