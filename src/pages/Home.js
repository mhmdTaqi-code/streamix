import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  IconButton,
  Drawer,
  useMediaQuery,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../components/Home/Sidebar";
import Header from "../components/Home/Header";
import HeroSection from "../components/Home/HeroSection";
import LiveChannels from "../components/Home/LiveChannels";
import Categories from "../components/Home/Categories";
import RecommendedVideos from "../components/Home/RecommendedVideos";
import BroadcastModal from "../components/Home/BroadcastModal";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { SIDEBAR_WIDTH } from "../redux/type";
import "react-toastify/dist/ReactToastify.css";

export default function Homepage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

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
      <ToastContainer position="top-right" />

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
              <MenuIcon sx={{ color: darkMode ? "#fff" : "#000", fontSize: 24 }} />
            </IconButton>
            <Box sx={{ flexGrow: 1, px: 1 }}>
              <Header searchOnly={isMobile} />
            </Box>
          </Toolbar>
        </AppBar>

        <HeroSection />

        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LiveChannels />
            </Grid>
            <Grid item xs={12}>
              <Categories />
            </Grid>
            <Grid item xs={12}>
              <RecommendedVideos />
            </Grid>
          </Grid>
        </Container>

        {isLoggedIn && (
          <Fab
            color="primary"
            onClick={() => setModalOpen(true)}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 1300,
            }}
          >
            <AddIcon />
          </Fab>
        )}

        <BroadcastModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </Box>
    </Box>
  );
}
