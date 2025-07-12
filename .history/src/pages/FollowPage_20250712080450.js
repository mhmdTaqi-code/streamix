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
import imgprofile from "../assets/profile.png";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Home/Sidebar";
import { motion } from "framer-motion";
import { SIDEBAR_WIDTH } from "../redux/type";
import axiosInstance from "../Api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFollowing, removeFollowing } from "../redux/action/followingAction";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FollowPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loadingUnfollow, setLoadingUnfollow] = useState(null);
  const [externalList, setExternalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:768px)");
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";
  const following = useSelector((state) => state.following.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const usernameParam = searchParams.get("username");
  const currentUsername = localStorage.getItem("username");
  const token = localStorage.getItem("accessToken");
  const isMyPage = !usernameParam || usernameParam === currentUsername;

  useEffect(() => {
    if (!token) {
      toast.error("Please log in first.");
      navigate("/login");
      return;
    }

    if (isMyPage) {
      dispatch(getFollowing());
      setLoading(false);
    } else {
      axiosInstance
        .get(`/profile/${usernameParam}/following/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setExternalList(res.data);
        })
        .catch((err) => {
          toast.error("Failed to load the list.");
        })
        .finally(() => setLoading(false));
    }
  }, [dispatch, usernameParam]);

  const handleUnfollow = async (username) => {
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    setLoadingUnfollow(username);

    try {
      await axiosInstance.post(
        `/unfollow/${username}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(removeFollowing(username));
      toast.success(`Unfollowed ${username}`, {
        position: "bottom-right",
      });
    } catch (err) {
      const msg = err.response?.data?.detail || "An error occurred while unfollowing.";
      toast.error(msg, { position: "bottom-right" });
    } finally {
      setLoadingUnfollow(null);
    }
  };

  const goToProfile = (username) => {
    navigate(`/profile?username=${username}`);
  };

  const listToShow = isMyPage ? following : externalList;

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
              fontSize: { xs: "28px", sm: "36px" },
              textAlign: "center",
            }}
          >
            {isMyPage ? "Following" : `Following @${usernameParam}`}
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gap: 3, maxWidth: 800, width: "100%" }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : listToShow.length === 0 ? (
            <Typography color={darkMode ? "#ccc" : "text.secondary"} textAlign="center">
              No following yet.
            </Typography>
          ) : (
            listToShow.map((user, index) => (
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
                      {user.bio || "No bio available."}
                    </Typography>
                  </Box>

                  {isMyPage && (
                    <Button
                      variant="contained"
                      disabled={loadingUnfollow === user.username}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnfollow(user.username);
                      }}
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
                        ? "Unfollowing..."
                        : "Unfollow"}
                    </Button>
                  )}
                </Paper>
              </motion.div>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
