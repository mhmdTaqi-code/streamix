import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Add as AddIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Home/Sidebar";
import { SIDEBAR_WIDTH } from "../redux/type";

const getToken = () => localStorage.getItem("accessToken");
const getUsername = () => localStorage.getItem("username") || "Unknown";

const api = axios.create({
  baseURL: "https://dev1hunter.pythonanywhere.com/live/api/",
});

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await api.get("playlists/", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setPlaylists(response.data);
    } catch (error) {
      toast.error("فشل في جلب القوائم");
    }
  };

  const addPlaylist = async () => {
    try {
      if (newPlaylistName.trim()) {
        const response = await api.post(
          "playlists/",
          { name: newPlaylistName },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        setPlaylists((prev) => [...prev, response.data]);
        setNewPlaylistName("");
        setDialogOpen(false);
        toast.success("تمت إضافة القائمة بنجاح");
      } else {
        toast.warning("يرجى إدخال اسم القائمة");
      }
    } catch (error) {
      toast.error("فشل في إضافة القائمة");
    }
  };

  const updatePlaylist = async (id, newName) => {
    try {
      const response = await api.put(
        `playlists/${id}/`,
        { name: newName },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setPlaylists(
        playlists.map((playlist) =>
          playlist.id === id
            ? { ...playlist, name: response.data.name }
            : playlist
        )
      );
      toast.success("تم التعديل بنجاح");
    } catch (error) {
      toast.error("فشل في التعديل");
    }
  };

  const deletePlaylist = async (id) => {
    try {
      await api.delete(`playlists/${id}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setPlaylists(playlists.filter((playlist) => playlist.id !== id));
      toast.success("تم الحذف بنجاح");
    } catch (error) {
      toast.error("فشل في الحذف");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: darkMode ? "#121212" : "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
        <Sidebar />
      </Box>

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
              bgcolor: darkMode ? "#121212" : "#fff",
              color: darkMode ? "#fff" : "#000",
            },
          }}
        >
          <Sidebar />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{ flexGrow: 1, width: "100%", position: "relative" }}
      >
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
                <MenuIcon
                  sx={{ color: darkMode ? "#fff" : "#000", fontSize: 24 }}
                />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: darkMode ? "#fff" : "#000", fontWeight: "bold" }}
              >
                Playlists
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box sx={{ px: 2, py: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            {playlists.map((playlist, i) => (
              <Grid item xs={12} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      bgcolor: darkMode ? "#1e1e1e" : "#fff",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color={darkMode ? "#fff" : "#000"}
                      >
                        {playlist.name}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => {
                          setNewPlaylistName(playlist.name);
                          setEditIndex(i);
                          setDialogOpen(true);
                        }}
                      >
                        تعديل
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => deletePlaylist(playlist.id)}
                      >
                        حذف
                      </Button>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      color={darkMode ? "#aaa" : "#555"}
                    >
                      Created by: {getUsername()}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Fab
            onClick={() => {
              setNewPlaylistName("");
              setEditIndex(null);
              setDialogOpen(true);
            }}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              bgcolor: darkMode ? "#673ab7" : "#1976d2",
              color: "#fff",
              "&:hover": { bgcolor: darkMode ? "#5e35b1" : "#1565c0" },
            }}
          >
            <AddIcon />
          </Fab>

          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>
              {editIndex !== null
                ? "تعديل اسم Playlist"
                : "إضافة Playlist جديدة"}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="اسم الـ Playlist"
                fullWidth
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>إلغاء</Button>
              <Button
                onClick={() => {
                  if (editIndex !== null) {
                    updatePlaylist(playlists[editIndex].id, newPlaylistName);
                    setDialogOpen(false);
                  } else {
                    addPlaylist();
                  }
                }}
              >
                {editIndex !== null ? "حفظ" : "إضافة"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}
