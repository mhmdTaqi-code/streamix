// File: src/components/LiveStream/LiveStreamModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
  Box,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

export default function LiveStreamModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [status, setStatus] = useState("live");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!title || !youtubeId || !category) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    // هنا يمكنك تنفيذ API أو log
    toast.success("تم نشر البث بنجاح!");
    setOpen(false);
    setTitle("");
    setYoutubeId("");
    setStatus("live");
    setCategory("");
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1500,
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          🎥 إنشاء بث مباشر جديد
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="YouTube ID"
              value={youtubeId}
              onChange={(e) => setYoutubeId(e.target.value)}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
                <MenuItem value="live">مباشر</MenuItem>
                <MenuItem value="upcoming">قادم</MenuItem>
                <MenuItem value="ended">انتهى</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
                <MenuItem value="gaming">🎮 ألعاب</MenuItem>
                <MenuItem value="music">🎵 موسيقى</MenuItem>
                <MenuItem value="education">📚 تعليم</MenuItem>
                <MenuItem value="other">أخرى</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">إلغاء</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">نشر البث</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
