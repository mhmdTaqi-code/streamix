// File: src/pages/StreamDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import axiosInstance from "../Api/axiosInstance";

export default function StreamDashboard() {
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Load streams from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myStreams")) || [];
    setStreams(stored);
  }, []);

  const handleUpdateStatus = async () => {
    if (!selectedStream || !newStatus) {
      toast.error("Please select a stream and status.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Access token missing.");
        return;
      }

      await axiosInstance.put(
        `https://dev1hunter.pythonanywhere.com/live/api/streams/${selectedStream.id}/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Status updated successfully");

      // Update localStorage copy
      const updatedStreams = streams.map((stream) =>
        stream.id === selectedStream.id
          ? { ...stream, status: newStatus }
          : stream
      );

      localStorage.setItem("myStreams", JSON.stringify(updatedStreams));
      setStreams(updatedStreams);
      setSelectedStream(null);
      setNewStatus("");
    } catch (err) {
      toast.error("❌ Failed to update status");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Edit Stream Status
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Stream</InputLabel>
        <Select
          value={selectedStream ? selectedStream.id : ""}
          label="Select Stream"
          onChange={(e) => {
            const selected = streams.find((s) => s.id === e.target.value);
            setSelectedStream(selected);
            setNewStatus(selected?.status || "");
          }}
        >
          {streams.map((stream) => (
            <MenuItem key={stream.id} value={stream.id}>
              {stream.title} (ID: {stream.id})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedStream && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>New Status</InputLabel>
          <Select
            value={newStatus}
            label="New Status"
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <MenuItem value="live">Live</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
            <MenuItem value="ended">Ended</MenuItem>
          </Select>
        </FormControl>
      )}

      <Button
        variant="contained"
        fullWidth
        onClick={handleUpdateStatus}
        disabled={!selectedStream || !newStatus}
      >
        Update Status
      </Button>
    </Box>
  );
}
