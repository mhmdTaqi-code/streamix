import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  useMediaQuery,
  Drawer,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import Sidebar from "../components/Home/Sidebar";
import { SIDEBAR_WIDTH } from "../redux/type";
import imgprofile from "../assets/profile.png";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../Api/axiosInstance";

export default function FollowingPage() {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const darkMode = useSelector((state) => state.theme.mode === "dark");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  useEffect(() => {
    if (!username) return;
    axiosInstance
      .get(`/profile/${username}/following/`)
      .then((res) => {
        setFollowing(res.data);
      })
      .catch((err) => {
        console.error("Failed to load following list:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  const goToProfile = (username) => {
    navigate(`/profile?username=${username}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: darkMode ? "#121212" : "#fff",
        minHeight: "100vh",
        color: darkMode ? "#fff" : "#000",
      }}
    >
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
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: SIDEBAR_WIDTH,
              bgcolor: darkMode ? "#121212" : "#f9f9f9",
              color: darkMode ? "#fff" : "#000",
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
          overflowY: "auto",
          px: 2,
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: darkMode ? "#1e1e1e" : "#f0f0f0",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={5}
            sx={{
              color: darkMode ? "#fff" : "#222",
              fontSize: { xs: "24px", sm: "30px" },
              textAlign: "center",
            }}
          >
            من يتابعهم <span style={{ color: "#f55" }}>@{username}</span>
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gap: 3, maxWidth: 800, width: "100%" }}>
          {loading ? (
            <Typography>جاري التحميل...</Typography>
          ) : following.length === 0 ? (
            <Typography color={darkMode ? "#ccc" : "text.secondary"} textAlign="center">
              لا يتابع أحدًا.
            </Typography>
          ) : (
            following.map((user, index) => (
              <motion.div
                key={user.username}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                style={{
                  borderRadius: "16px",
                  backgroundColor: darkMode ? "#2a2a2a" : "#f0f0f0",
                  boxShadow: darkMode
                    ? "0 4px 16px rgba(0,0,0,0.4)"
                    : "0 4px 16px rgba(0,0,0,0.08)",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    background: "transparent",
                    borderRadius: "16px",
                    color: darkMode ? "#fff" : "#000",
                    cursor: "pointer",
                  }}
                  onClick={() => goToProfile(user.username)}
                >
                  <Avatar
                    src={user.profile_picture || imgprofile}
                    sx={{
                      width: 64,
                      height: 64,
                      mr: 2,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Box flexGrow={1}>
                    <Typography fontWeight="bold" fontSize={18}>
                      {user.username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#666" }}>
                      {user.bio || "لا توجد نبذة تعريفية."}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
