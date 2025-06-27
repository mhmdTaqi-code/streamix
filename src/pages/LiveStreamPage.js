import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SuggestedVideos from "../components/LiveStream/SuggestedVideos"; // تأكد من مسار الملف حسب مشروعك

export default function LiveStreamPage() {
  const { id } = useParams(); // YouTube video ID from the route
  const navigate = useNavigate();
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dev1hunter.pythonanywhere.com/live/api/streams/")
      .then((res) => res.json())
      .then((data) => {
        const match = data.find((item) => item.youtube_id === id);
        setStream(match);
      })
      .catch((error) => console.error("حدث خطأ:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!stream) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
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
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        px: 2,
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* زر الرجوع */}
      <Box sx={{ alignSelf: "flex-start", mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/home")}
        >
          العودة إلى الصفحة الرئيسية
        </Button>
      </Box>

      {/* العنوان فقط إذا كان البث مباشر */}
      {stream.status === "live" && (
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
        >
          <LiveTvIcon color="error" />
          البث المباشر
        </Typography>
      )}

      {/* الفيديو داخل كارد */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 960,
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

      {/* الفيديوهات المقترحة */}
      <SuggestedVideos currentId={stream.youtube_id} />
    </Box>
  );
}
