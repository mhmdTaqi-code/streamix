import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  IconButton,
  Drawer,
  useMediaQuery,
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
        {/* Mobile Drawer Icon مع Header */}
        {isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#0f0f0f",
              px: 1,
              py: 1,
              zIndex: 1500,
              position: "sticky",
              top: 0,
              height: "60px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon sx={{ color: "white", fontSize: 28 }} />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Header />
            </Box>
          </Box>
        )}

        {!isMobile && <Header />}

        <HeroSection />
        <Box sx={{ px: { xs: 0, sm: 1, md: 2 } }}>
          <LiveChannels />
          <Categories />
          <RecommendedVideos />
        </Box>
      </Box>
    </Box>
  );
}