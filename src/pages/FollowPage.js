import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import { useSelector } from "react-redux";
import Sidebar from "../components/Home/Sidebar";
import { motion } from "framer-motion";
import { SIDEBAR_WIDTH } from "../redux/type";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../Api/axiosInstance";

export default function FollowPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [following, setFollowing] = useState([]);
  const [loadingUnfollow, setLoadingUnfollow] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const token = localStorage.getItem("accessToken");

    if (!storedUsername || !token) {
      toast.error("الرجاء تسجيل الدخول أولاً.");
      return;
    }

    axiosInstance
      .get(
        `https://dev1hunter.pythonanywhere.com/profile/${storedUsername}/following/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setFollowing(res.data || []);
      })
      .catch((err) => {
        const msg = err.response?.data?.detail || "فشل في تحميل قائمة المتابعة";
        toast.error(msg);
      });
  }, []);

  const handleUnfollow = async (username) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("الرجاء تسجيل الدخول أولاً.");
      return;
    }

    setLoadingUnfollow(username);

    try {
      await axiosInstance.post(
        `https://dev1hunter.pythonanywhere.com/unfollow/${username}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowing((prev) => prev.filter((user) => user.username !== username));
      toast.success(`تم إلغاء متابعة ${username}`, {
        position: "bottom-right",
      });
    } catch (err) {
      const msg = err.response?.data?.detail || "حدث خطأ أثناء إلغاء المتابعة";
      toast.error(msg, { position: "bottom-right" });
    } finally {
      setLoadingUnfollow(null);
    }
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
      <ToastContainer />
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
          color: darkMode ? "#fff" : "#000",
        }}
      >
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
              color: darkMode ? "#fff" : "#222",
              textShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              fontSize: { xs: "28px", sm: "36px" },
              textAlign: "center",
            }}
          >
            من تتابعهم حاليًا
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gap: 3, maxWidth: 800, width: "100%" }}>
          {following.length === 0 ? (
            <Typography
              color={darkMode ? "#ccc" : "text.secondary"}
              textAlign="center"
            >
              لا تتابع أي شخص حاليًا.
            </Typography>
          ) : (
            following.map((user, index) => (
              <motion.div
                key={user.username}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
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
                  }}
                >
                  <Avatar
                    src={
                      user.profile_picture || "https://via.placeholder.com/100"
                    }
                    sx={{
                      width: 64,
                      height: 64,
                      mr: 2,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Box flexGrow={1}>
                    <Typography
                      fontWeight="bold"
                      fontSize={18}
                      sx={{ color: darkMode ? "#fff" : "#000" }}
                    >
                      {user.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: darkMode ? "#ccc" : "#666" }}
                    >
                      {user.bio || "لا توجد نبذة تعريفية."}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    disabled={loadingUnfollow === user.username}
                    onClick={() => handleUnfollow(user.username)}
                    sx={{
                      borderRadius: 3,
                      backgroundColor: "#888",
                      color: "#fff",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#e53935",
                      },
                    }}
                  >
                    {loadingUnfollow === user.username
                      ? "جاري الإلغاء..."
                      : "إلغاء المتابعة"}
                  </Button>
                </Paper>
              </motion.div>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
