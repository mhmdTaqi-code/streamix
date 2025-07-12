import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputLabel,
} from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";

export default function UploadVideoModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const themeMode = localStorage.getItem("themeMode") || "light";
  const darkMode = themeMode === "dark";

  useEffect(() => {
    axiosInstance
      .get("https://dev1hunter.pythonanywhere.com/live/api/categories/")
      .then((res) => setCategories(res.data))
      .catch(() => toast.error("فشل تحميل التصنيفات"));
  }, []);

  const handleSubmit = () => {
    if (!title || !category || !videoFile || !thumbnailFile) {
      toast.error("يرجى تعبئة جميع الحقول واختيار ملفات الفيديو والصورة");
      return;
    }

    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];
    if (!allowedImageTypes.includes(thumbnailFile.type)) {
      toast.error("الصورة المصغرة يجب أن تكون بصيغة JPG أو PNG أو WEBP");
      return;
    }

    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("status", "live");
    formData.append("category", category);
    formData.append("video_file", videoFile);
    formData.append("thumbnail", thumbnailFile);

    axiosInstance
      .post(
        "https://dev1hunter.pythonanywhere.com/live/api/videos/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const newVideo = res.data;
        toast.success("✅ تم رفع الفيديو بنجاح");

        // إعادة تعيين الحقول
        setTitle("");
        setCategory("");
        setVideoFile(null);
        setThumbnailFile(null);
        onClose();

        // الانتقال إلى الفيديو الجديد
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(`/video/${newVideo.id}`);
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ فشل رفع البيانات");
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: darkMode ? "#1e1e1e" : "#fff",
          color: darkMode ? "#fff" : "#000",
          p: 4,
          borderRadius: 2,
          width: 400,
          boxShadow: 24,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <VideoLibraryIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6" fontWeight="bold">
            رفع فيديو مسجل
          </Typography>
        </Box>

        <TextField
          label="العنوان"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ style: { color: darkMode ? "#aaa" : undefined } }}
          InputProps={{ style: { color: darkMode ? "#fff" : undefined } }}
        />

        <TextField
          select
          label="التصنيف"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ style: { color: darkMode ? "#aaa" : undefined } }}
          InputProps={{ style: { color: darkMode ? "#fff" : undefined } }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        {/* رفع ملف الفيديو */}
        <Box
          sx={{
            border: `2px dashed ${darkMode ? "#555" : "#ccc"}`,
            p: 2,
            borderRadius: 2,
            textAlign: "center",
            cursor: "pointer",
            mb: 2,
            color: darkMode ? "#aaa" : "#333",
            backgroundColor: darkMode ? "#2a2a2a" : "#fafafa",
          }}
        >
          <InputLabel
            htmlFor="video-upload"
            sx={{
              cursor: "pointer",
              fontWeight: 500,
              color: darkMode ? "#aaa" : "#555",
            }}
          >
            انقر لرفع ملف الفيديو
          </InputLabel>
          <input
            id="video-upload"
            type="file"
            accept="*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          {videoFile && (
            <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
              الملف المختار: {videoFile.name}
            </Typography>
          )}
        </Box>

        {/* رفع صورة مصغرة */}
        <Box
          sx={{
            border: `2px dashed ${darkMode ? "#555" : "#ccc"}`,
            p: 2,
            borderRadius: 2,
            textAlign: "center",
            cursor: "pointer",
            mb: 2,
            color: darkMode ? "#aaa" : "#333",
            backgroundColor: darkMode ? "#2a2a2a" : "#fafafa",
          }}
        >
          <InputLabel
            htmlFor="thumbnail-upload"
            sx={{
              cursor: "pointer",
              fontWeight: 500,
              color: darkMode ? "#aaa" : "#555",
            }}
          >
            انقر لرفع صورة مصغرة (Thumbnail)
          </InputLabel>
          <input
            id="thumbnail-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          {thumbnailFile && (
            <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
              الصورة المختارة: {thumbnailFile.name}
            </Typography>
          )}
        </Box>

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          رفع الفيديو
        </Button>

        <Button
          fullWidth
          variant="text"
          onClick={onClose}
          sx={{ mt: 1, fontSize: "14px", color: darkMode ? "#fff" : undefined }}
        >
          إلغاء
        </Button>
      </Box>
    </Modal>
  );
}
