import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FullScreenLoader from "../components/Loading"; // تأكد من المسار

export default function CategoryVideos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [categoryName, setCategoryName] = useState("Category");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("themeMode") === "dark"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const [videoRes, categoryRes] = await Promise.all([
          axios.get(
            `https://dev1hunter.pythonanywhere.com/live/api/streams/?category=${id}`
          ),
          axios.get(
            `https://dev1hunter.pythonanywhere.com/live/api/categories/`
          ),
        ]);

        setVideos(videoRes.data);
        const found = categoryRes.data.find((cat) => String(cat.id) === id);
        if (found) setCategoryName(found.name);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem("themeMode") === "dark");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [id]);

  return (
    <Box
      sx={{ p: 2, bgcolor: darkMode ? "#121212" : "#fff", minHeight: "100vh" }}
    >
      {isLoading && <FullScreenLoader darkMode={darkMode} />}

      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/home")}
        sx={{
          mb: 2,
          color: darkMode ? "#fff" : "#000",
          borderColor: darkMode ? "#555" : "#ccc",
        }}
      >
        Back to Home
      </Button>

      <Typography
        variant="h4"
        mb={3}
        sx={{ color: darkMode ? "#fff" : "#000" }}
      >
        Videos in category: <strong>{categoryName}</strong>
      </Typography>

      {videos.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ color: darkMode ? "#aaa" : "#555", mt: 4 }}
        >
          No videos found in this category.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {videos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  onClick={() => navigate(`/live/${video.youtube_id}`)}
                  sx={{
                    borderRadius: 2,
                    boxShadow: darkMode
                      ? "0 8px 20px rgba(255,255,255,0.05)"
                      : "0 8px 20px rgba(0,0,0,0.1)",
                    bgcolor: darkMode ? "#1e1e1e" : "#fafafa",
                    color: darkMode ? "#fff" : "#000",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {video.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
