import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FullScreenLoader from "../components/Loading";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle"; // ← استيراد الزر الجديد

export default function Profile() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("themeMode") === "dark"
  );
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      setError("You must log in first.");
      setIsLoading(false);
      return;
    }

    axiosInstance
      .get(`https://dev1hunter.pythonanywhere.com/profile/${username}/`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem("themeMode") === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        p: 3,
      }}
    >
      {isLoading && <FullScreenLoader darkMode={darkMode} />}

      {/* 🔘 زر التبديل في الأعلى */}
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      {error && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/home")}
            sx={{
              color: darkMode ? "#fff" : "#000",
              borderColor: darkMode ? "#555" : "#ccc",
            }}
          >
            Back to Home
          </Button>
        </Box>
      )}

      {user && (
        <Card
          sx={{
            maxWidth: 800,
            mx: "auto",
            bgcolor: darkMode ? "#1e1e1e" : "#fff",
            boxShadow: 3,
            borderRadius: 3,
            mt: 3,
          }}
        >
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <Avatar
                  src={user.avatar || "https://i.pravatar.cc/150?img=32"}
                  alt={user.name}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h5" fontWeight="bold">
                  {user.name || user.username}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user.email}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
                  {user.bio || "No bio provided."}
                </Typography>
                <Typography variant="caption" sx={{ display: "block", mt: 2 }}>
                  Joined:{" "}
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "Unknown"}
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{
                    mt: 3,
                    color: darkMode ? "#fff" : "#000",
                    borderColor: darkMode ? "#555" : "#ccc",
                  }}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6">Account Settings</Typography>
            <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
              Settings and preferences can be added here later.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
