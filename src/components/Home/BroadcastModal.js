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
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";

export default function BroadcastModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [status, setStatus] = useState("live");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const themeMode = localStorage.getItem("themeMode") || "light";
  const darkMode = themeMode === "dark";

  useEffect(() => {
    axiosInstance
      .get("https://dev1hunter.pythonanywhere.com/live/api/categories/")
      .then((res) => {
        const unique = Array.from(
          new Set(res.data.map((item) => item.name))
        ).map((name) => res.data.find((item) => item.name === name));
        setCategories(unique);
      })
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handleSubmit = () => {
    if (!title || !youtubeId || !status || !category || !thumbnail) {
      toast.error("Please fill in all fields and upload a thumbnail");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(thumbnail.type)) {
      toast.error("Thumbnail must be JPG or PNG");
      return;
    }

    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("youtube_id", youtubeId);
    formData.append("status", status);
    formData.append("category", category);
    formData.append("thumbnail", thumbnail);

    axiosInstance
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
      .then((res) => {
        toast.success("✅ Stream published successfully");

        if (status === "live") {
          const newStream = {
            id: res.data.id,
            title,
            youtubeId,
            status,
            category,
            thumbnailName: thumbnail.name,
            createdAt: new Date().toISOString(),
          };

          const existing = JSON.parse(localStorage.getItem("myStreams")) || [];
          const updated = [...existing, newStream];
          localStorage.setItem("myStreams", JSON.stringify(updated));
        }

        setTitle("");
        setYoutubeId("");
        setStatus("live");
        setCategory("");
        setThumbnail(null);
        onClose();

        navigate(`/live/${youtubeId}`);
      })
      .catch((err) => {
        toast.error("❌ Failed to publish stream");
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
          bgcolor: darkMode ? "#1e1e1e" : "background.paper",
          color: darkMode ? "#fff" : "#000",
          p: 4,
          borderRadius: 2,
          width: 400,
          boxShadow: 24,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <VideoCameraFrontIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Create New Live Stream
          </Typography>
        </Box>

        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ style: { color: darkMode ? "#aaa" : undefined } }}
          InputProps={{ style: { color: darkMode ? "#fff" : undefined } }}
        />

        <TextField
          label="Youtube ID"
          fullWidth
          value={youtubeId}
          onChange={(e) => setYoutubeId(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ style: { color: darkMode ? "#aaa" : undefined } }}
          InputProps={{ style: { color: darkMode ? "#fff" : undefined } }}
        />

        <TextField
          select
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ style: { color: darkMode ? "#aaa" : undefined } }}
          InputProps={{ style: { color: darkMode ? "#fff" : undefined } }}
        >
          <MenuItem value="live">Live</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
          <MenuItem value="ended">Ended</MenuItem>
        </TextField>

        <TextField
          select
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ style: { color: darkMode ? "#aaa" : undefined } }}
          InputProps={{ style: { color: darkMode ? "#fff" : undefined } }}
        >
          <MenuItem value="" disabled>
            Select Category
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

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
            Click to upload a thumbnail
          </InputLabel>
          <input
            id="thumbnail-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            style={{ display: "none" }}
          />
          {thumbnail && (
            <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
              Selected: {thumbnail.name}
            </Typography>
          )}
        </Box>

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Publish Stream
        </Button>

        <Button
          fullWidth
          variant="text"
          onClick={onClose}
          sx={{ mt: 1, fontSize: "14px", color: darkMode ? "#fff" : undefined }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}
