import React, { useState } from "react";
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
        bgcolor: "light",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <CssBaseline />

      {/* Sidebar Desktop */}
      {!isMobile && <Sidebar includeProfileAndNotifications={true} />}

      {/* Sidebar Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: "block",
            zIndex: 1401, // Make sure it's above the AppBar
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              bgcolor: "#161616",
              color: "white",
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
        {/* Navbar */}
        <AppBar
          position="sticky"
          sx={{ bgcolor: "#f5f5f5", boxShadow: "none", height: "56px", zIndex: 1100 }}
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
              <MenuIcon sx={{ color: "black", fontSize: 24  , marginLeft:"20px"}} />
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
      </Box>
    </Box>
  );
}