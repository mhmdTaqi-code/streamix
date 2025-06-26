// File: src/pages/FollowPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Home/Sidebar";
import { motion } from "framer-motion";
import { SIDEBAR_WIDTH } from "../redux/type";

export default function FollowPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  const followingList = [
    {
      username: "ahmed123",
      bio: "مصمم جرافيك ومحب للفن 🎨",
      profile_picture: "https://via.placeholder.com/100",
    },
    {
      username: "noor_ali",
      bio: "مطورة ويب ومهتمة بالذكاء الاصطناعي 🤖",
      profile_picture: "https://via.placeholder.com/100",
    },
    {
      username: "zahraa_design",
      bio: "مصممة واجهات وتجربة مستخدم 🌐",
      profile_picture: "https://via.placeholder.com/100",
    },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: darkMode ? "#121212" : "#fff", minHeight: "100vh" }}>
      {/* Sidebar */}
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
              width: SIDEBAR_WIDTH,
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

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
          px: 2,
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: darkMode ? "#1e1e1e" : "linear-gradient(135deg, #fdfbfb, #ebedee)",
        }}
      >
        {/* AppBar */}
        {isMobile && (
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
                sx={{ p: 0 }}
              >
                <MenuIcon sx={{ color: darkMode ? "#fff" : "#000", fontSize: 24 }} />
              </IconButton>
              <Typography variant="h6" sx={{ color: darkMode ? "#fff" : "#000", fontWeight: "bold" }}>
                قائمة المتابعين
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            mb={5}
            sx={{
              background: "linear-gradient(to right, #ff758c, #ff7eb3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              fontSize: { xs: "28px", sm: "36px" },
            }}
          >
            قائمة المتابعين الخاصة بك
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gap: 3, maxWidth: 800, width: "100%" }}>
          {followingList.map((user, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{
                borderRadius: "16px",
                background: darkMode ? "#2c2c2c" : "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Paper elevation={0} sx={{ p: 3, display: "flex", alignItems: "center", background: "transparent", borderRadius: "16px" }}>
                <Avatar src={user.profile_picture} sx={{ width: 64, height: 64, mr: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                <Box flexGrow={1}>
                  <Typography fontWeight="bold" fontSize={18}>{user.username}</Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? "#aaa" : "#666" }}>{user.bio}</Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 3,
                    background: "linear-gradient(to right, #ec008c, #fc6767)",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: "bold",
                    '&:hover': {
                      background: "linear-gradient(to right, #fc6767, #ec008c)",
                    },
                  }}
                >
                  إلغاء المتابعة
                </Button>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}