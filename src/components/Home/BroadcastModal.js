// File: src/components/Home/BroadcastModal.jsx
import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { toast } from "react-toastify";

const statusOptions = [
  { label: "مباشر", value: "live" },
  { label: "قادم", value: "upcoming" },
  { label: "انتهى", value: "ended" },
];

export default function BroadcastModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [status, setStatus] = useState("live");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!title || !youtubeId || !status || !category) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    const streamData = { title, youtubeId, status, category };
    console.log("📡 بث جديد:", streamData);
    toast.success("تم نشر البث بنجاح");

    // reset & close
    setTitle("");
    setYoutubeId("");
    setStatus("live");
    setCategory("");
    onClose();
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
          label="Youtube id"
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
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 3 }}
        >
          <MenuItem value="" disabled>
            --------
          </MenuItem>
          <MenuItem value="tech">تقنية</MenuItem>
          <MenuItem value="gaming">ألعاب</MenuItem>
          <MenuItem value="education">تعليمي</MenuItem>
          {/* يمكنك إضافة المزيد حسب الفئات لديك */}
        </TextField>

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
