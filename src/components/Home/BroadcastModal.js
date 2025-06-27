// File: src/components/Home/BroadcastModal.jsx
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
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BroadcastModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [status, setStatus] = useState("live");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // تحميل الفئات من API
  useEffect(() => {
    axios
      .get("https://dev1hunter.pythonanywhere.com/live/api/categories/")
      .then((res) => {
        const unique = Array.from(
          new Set(res.data.map((item) => item.name))
        ).map((name) => res.data.find((item) => item.name === name));
        setCategories(unique);
      })
      .catch(() => toast.error("فشل في تحميل الفئات"));
  }, []);

  const handleSubmit = () => {
    if (!title || !youtubeId || !status || !category || !thumbnail) {
      toast.error("يرجى ملء جميع الحقول ورفع الصورة");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(thumbnail.type)) {
      toast.error("يرجى رفع صورة بصيغة JPG أو PNG");
      return;
    }

    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("youtube_id", youtubeId);
    formData.append("status", status);
    formData.append("category", category); // ID الفئة
    formData.append("thumbnail", thumbnail);

    axios
      .post(
        "https://dev1hunter.pythonanywhere.com/live/api/streams/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        toast.success("تم نشر البث بنجاح ✅");
        // إعادة التهيئة
        setTitle("");
        setYoutubeId("");
        setStatus("live");
        setCategory("");
        setThumbnail(null);
        onClose();

        // الانتقال لصفحة البث مع اليوتيوب ID
        navigate("/live", { state: { youtubeId } });
      })
      .catch((err) => {
        toast.error("فشل نشر البث");
        console.error(err);
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
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          width: 400,
          boxShadow: 24,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <VideoCameraFrontIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6" fontWeight="bold">
            إنشاء بث مباشر جديد
          </Typography>
        </Box>

        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Youtube ID"
          fullWidth
          value={youtubeId}
          onChange={(e) => setYoutubeId(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="live">مباشر</MenuItem>
          <MenuItem value="upcoming">قادم</MenuItem>
          <MenuItem value="ended">انتهى</MenuItem>
        </TextField>

        <TextField
          select
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            اختر فئة
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <InputLabel sx={{ mb: 1 }}>Thumbnail</InputLabel>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          style={{ marginBottom: "20px" }}
        />

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          نشر البث
        </Button>

        <Button
          fullWidth
          variant="text"
          onClick={onClose}
          sx={{ mt: 1, fontSize: "14px" }}
        >
          العودة لقائمة البثوث
        </Button>
      </Box>
    </Modal>
  );
}
