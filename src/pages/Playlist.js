// File: src/pages/PlaylistPage.jsx
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
  Paper,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../components/Home/Sidebar";
import { useSelector } from "react-redux";
import { SIDEBAR_WIDTH } from "../redux/type";
import { motion } from "framer-motion";

const generateVideos = () =>
  Array.from({ length: 10 }, (_, i) => ({
    title: `Video ${i + 1}`,
    thumbnail: "https://placehold.co/600x400",
  }));

const initialPlaylists = [
  { name: "React Tutorials", owner: "Mohammed", videos: generateVideos() },
  { name: "Gaming Highlights", owner: "Mohammed", videos: generateVideos() },
  { name: "Tech Reviews", owner: "Mohammed", videos: generateVideos() },
];

export default function PlaylistPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddPlaylist = () => {
    if (newPlaylistName.trim()) {
      const updatedPlaylists = [...playlists];
      if (editIndex !== null) {
        updatedPlaylists[editIndex].name = newPlaylistName;
        setPlaylists(updatedPlaylists);
      } else {
        const newPlaylist = {
          name: newPlaylistName,
          owner: "Mohammed",
          videos: generateVideos(),
        };
        setPlaylists((prev) => [...prev, newPlaylist]);
      }
      setNewPlaylistName("");
      setEditIndex(null);
      setDialogOpen(false);
    }
  };

  const handleDeletePlaylist = (index) => {
    const updated = [...playlists];
    updated.splice(index, 1);
    setPlaylists(updated);
  };

  const handleEditPlaylist = (index) => {
    setNewPlaylistName(playlists[index].name);
    setEditIndex(index);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: darkMode ? "#121212" : "#f9f9f9", minHeight: "100vh" }}>
      {!isMobile && (
        <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0, zIndex: 1 }}>
          <Sidebar />
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
              bgcolor: darkMode ? "#121212" : "#fff",
              color: darkMode ? "#fff" : "#000",
            },
          }}
        >
          <Box sx={{ width: SIDEBAR_WIDTH }}>
            <Sidebar />
          </Box>
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, width: "100%", position: "relative" }}>
        {isMobile && (
          <AppBar
            position="sticky"
            sx={{ bgcolor: darkMode ? "#1e1e1e" : "#f5f5f5", boxShadow: "none", height: "56px", zIndex: 1100 }}
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
                      overflow: "visible",
                      position: "relative",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1, flexWrap: "wrap" }}>
                      <Typography variant="h5" fontWeight="bold" color={darkMode ? "#fff" : "#000"}>
                        {playlist.name}
                      </Typography>
                      <Button size="small" onClick={() => handleEditPlaylist(i)} variant="outlined">
                        تعديل
                      </Button>
                      <Button size="small" color="error" onClick={() => handleDeletePlaylist(i)} variant="outlined">
                        حذف
                      </Button>
                      <Button size="small" variant="contained">
                        عرض الكل
                      </Button>
                    </Box>

                    <Typography variant="subtitle2" mb={2} color={darkMode ? "#aaa" : "#555"}>
                      Created by: {playlist.owner}
                    </Typography>

                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <motion.div
                        style={{ display: "flex", gap: 16 }}
                        animate={{ x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      >
                        {playlist.videos.map((video, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ rotateY: 5, scale: 1.08 }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <Card
                              sx={{
                                minWidth: 240,
                                height: 320,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                borderRadius: 3,
                                boxShadow: 6,
                                transition: "all 0.4s ease",
                                bgcolor: darkMode ? "#2c2c2c" : "#fafafa",
                                zIndex: 0,
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={video.thumbnail}
                                alt={video.title}
                                sx={{ height: 180 }}
                              />
                              <CardContent>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                  color={darkMode ? "#fff" : "#000"}
                                >
                                  {video.title}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button size="small" color="error">
                                  حذف
                                </Button>
                              </CardActions>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Fab
            onClick={() => setDialogOpen(true)}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              bgcolor: darkMode ? "#673ab7" : "#1976d2",
              color: "#fff",
              "&:hover": { bgcolor: darkMode ? "#5e35b1" : "#1565c0" },
              display: "flex",
              zIndex: 2000,
            }}
          >
            <AddIcon />
          </Fab>
        </Box>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>{editIndex !== null ? "تعديل اسم Playlist" : "إضافة Playlist جديدة"}</DialogTitle>
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
            <Button onClick={handleAddPlaylist}>{editIndex !== null ? "حفظ" : "إضافة"}</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
