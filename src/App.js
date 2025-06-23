// 1. App.jsx
import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  IconButton,
  Drawer,
  useMediaQuery,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LiveChannels from "./components/LiveChannels";
import Categories from "./components/Categories";
import RecommendedVideos from "./components/RecommendedVideos";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#0f0f0f",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <CssBaseline />

      {/* Sidebar Desktop */}
      {!isMobile && <Sidebar />}

      {/* Sidebar Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: "block",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              bgcolor: "#161616",
              color: "white",
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
            },
          }}
        >
          <Sidebar />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100vh",
          overflowY: "auto",
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {/* Navbar */}
        <AppBar
          position="sticky"
          sx={{ bgcolor: "#0f0f0f", boxShadow: "none", height: "56px" }}
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
              <MenuIcon sx={{ color: "white", fontSize: 24 }} />
            </IconButton>
            <Box sx={{ flexGrow: 1, px: 1 }}>
              <Header searchOnly={isMobile} />
            </Box>
          </Toolbar>
        </AppBar>

        <HeroSection />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 600 }}>
            <LiveChannels />
          </Box>
          <Box sx={{ width: "100%", maxWidth: 600 }}>
            <Categories />
          </Box>
          <Box sx={{ width: "100%", maxWidth: 600 }}>
            <RecommendedVideos />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}