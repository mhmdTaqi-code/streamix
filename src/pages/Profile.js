import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import FullScreenLoader from "../components/Loading";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

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

      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <Typography variant="h4" gutterBottom fontWeight="bold">
        الملف الشخصي
      </Typography>

      {error && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
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
                  src={
                    user.user.profile_picture ||
                    "https://i.pravatar.cc/150?img=32"
                  }
                  alt={user.user.username}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h5" fontWeight="bold"></Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 1,
                    color: darkMode ? "#aaa" : "#888",
                    fontStyle: "italic",
                  }}
                >
                  @{user.user.username}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ mt: 2, color: darkMode ? "#ccc" : "#444" }}
                >
                  {user.bio || "لا توجد نبذة."}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ mt: 2, color: darkMode ? "#ccc" : "#666" }}
                >
                  المتابعون: {user.followers_count}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: darkMode ? "#ccc" : "#666" }}
                >
                  المتابَعون: {user.following_count}
                </Typography>
              </Grid>
            </Grid>

            {user.followers?.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: darkMode ? "#fff" : "#000" }}
                >
                  المتابعون
                </Typography>
                <List>
                  {user.followers.map((follower, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar
                          src={
                            follower.profile_picture ||
                            "https://i.pravatar.cc/150?img=64"
                          }
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={follower.username}
                        primaryTypographyProps={{
                          sx: { color: darkMode ? "#eee" : "#111" },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {/* زر الرجوع إلى الصفحة الرئيسية */}
            <Divider sx={{ my: 3 }} />
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                onClick={() => navigate("/home")}
                sx={{
                  bgcolor: darkMode ? "#333" : "#1976d2",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: darkMode ? "#444" : "#1565c0",
                  },
                  px: 4,
                  py: 1,
                  fontWeight: "bold",
                  borderRadius: 2,
                }}
              >
                الرجوع إلى الصفحة الرئيسية
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
