import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  IconButton,
  Drawer,
  useMediaQuery,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Home/Sidebar";
import Header from "../components/Home/Header";
import { useSelector } from "react-redux";
import { SIDEBAR_WIDTH } from "../redux/type";
import { useLocation } from "react-router-dom";
import axios from "axios";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function SearchResultsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  const query = useQuery().get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    axios
      .get(
        `https://dev1hunter.pythonanywhere.com/live/api/videos/?search=${query}`
      )
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("فشل في جلب النتائج");
        setLoading(false);
      });
  }, [query]);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: darkMode ? "#121212" : "#fff",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <CssBaseline />

      {!isMobile && (
        <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
          <Sidebar includeProfileAndNotifications={true} />
        </Box>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: "block",
            zIndex: 1401,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              bgcolor: darkMode ? "#121212" : "#f9f9f9",
              color: darkMode ? "#fff" : "#000",
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1401,
            },
          }}
        >
          <Sidebar includeProfileAndNotifications={true} />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <AppBar
          position="sticky"
          sx={{
            bgcolor: darkMode ? "#1e1e1e" : "#f5f5f5",
            boxShadow: "none",
            height: "56px",
            zIndex: 1100,
          }}
        >
          <Toolbar
            sx={{
              minHeight: "56px !important",
              px: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ p: 0, display: { xs: "inline-flex", md: "none" } }}
            >
              <MenuIcon
                sx={{ color: darkMode ? "#fff" : "#000", fontSize: 24 }}
              />
            </IconButton>
            <Box sx={{ flexGrow: 1, px: 1 }}>
              <Header searchOnly={isMobile} />
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, color: darkMode ? "#fff" : "#000" }}
          >
            نتائج البحث عن: "{query}"
          </Typography>

          {loading && <Typography>جارٍ التحميل...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          <Grid container spacing={2}>
            {results.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Card
                  sx={{
                    bgcolor: darkMode ? "#1e1e1e" : "#fafafa",
                    color: darkMode ? "#fff" : "#000",
                    borderRadius: 2,
                    cursor: "pointer",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {video.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5, color: darkMode ? "#ccc" : "#444" }}
                    >
                      {video.uploader || "Unknown Uploader"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
