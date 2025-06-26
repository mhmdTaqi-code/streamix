// File: src/pages/MyVideos.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Divider,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Container
} from "@mui/material";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from '@mui/icons-material/Person';
import Sidebar from "../components/Home/Sidebar";
import { motion } from "framer-motion";
import Tilt from 'react-parallax-tilt';
import { SIDEBAR_WIDTH } from "../redux/type";

const dummyVideos = [
  {
    id: 1,
    title: "My First Stream",
    thumbnail: "https://placehold.co/600x400",
    views: 123,
  },
  {
    id: 2,
    title: "React Tutorial",
    thumbnail: "https://placehold.co/600x400",
    views: 200,
  },
  {
    id: 3,
    title: "My MUI Components",
    thumbnail: "https://placehold.co/600x400",
    views: 76,
  },
];

export default function MyVideos() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  return (
    <Box sx={{ display: "flex", bgcolor: darkMode ? "#121212" : "#fff", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      {!isMobile && (
        <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
          <Sidebar includeProfileAndNotifications={true} />
        </Box>
      )}

      {/* Drawer for mobile */}
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
              width: SIDEBAR_WIDTH,
              bgcolor: darkMode ? "#121212" : "#f9f9f9",
              color: darkMode ? "#fff" : "#000",
            },
          }}
        >
          <Sidebar includeProfileAndNotifications={true} />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
          background: darkMode ? "#1e1e1e" : "#f9f9f9",
        }}
      >
        {/* AppBar for mobile */}
        {isMobile && (
          <AppBar
            position="sticky"
            sx={{
              bgcolor: darkMode ? "#1e1e1e" : "#f5f5f5",
              boxShadow: "none",
              height: "56px",
              zIndex: 1200,
            }}
          >
            <Toolbar sx={{ minHeight: "56px !important", px: 1, justifyContent: "space-between" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ p: 0 }}
              >
                <MenuIcon sx={{ color: darkMode ? "#fff" : "#000", fontSize: 24 }} />
              </IconButton>
              <Typography variant="h6" sx={{ color: darkMode ? "#fff" : "#000", fontWeight: "bold" }}>
                My Videos
              </Typography>
              <Box sx={{ width: 24 }} />
            </Toolbar>
          </AppBar>
        )}

        {/* Page Content */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" color={darkMode ? '#fff' : 'text.primary'}>
              My Videos
            </Typography>
          </Box>

          <Divider sx={{ mb: 4, bgcolor: darkMode ? '#555' : '#ccc' }} />

          <Grid container spacing={3} justifyContent="center">
            {dummyVideos.map((video, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id} sx={{ display: "flex", justifyContent: "center" }}>
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.3}
                  glareColor="#ffffff"
                  glarePosition="bottom"
                  scale={1.02}
                  transitionSpeed={1500}
                  style={{ width: "100%", maxWidth: 300 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    style={{ width: "100%" }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: 4,
                        bgcolor: darkMode ? "#2c2c2c" : "#fff",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        transition: "all 0.3s ease-in-out"
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={video.thumbnail}
                        alt={video.title}
                        sx={{
                          objectFit: "cover",
                          width: "100%",
                          height: { xs: 140, sm: 160 }
                        }}
                      />
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color={darkMode ? "#fff" : "text.primary"}
                          sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
                        >
                          {video.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={darkMode ? "#ccc" : "text.secondary"}
                          sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" } }}
                        >
                          {video.views} views
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                        <Button size="small" color="primary">Edit</Button>
                        <Button size="small" color="error">Delete</Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Tilt>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
