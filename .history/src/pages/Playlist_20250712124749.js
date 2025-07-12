import  { useState, useEffect } from "react";
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
  Drawer,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Add as AddIcon, Menu  } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Home/Sidebar";
import { SIDEBAR_WIDTH } from "../redux/type";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";

const getToken = () => localStorage.getItem("accessToken");
const getUsername = () => localStorage.getItem("username") || "Unknown";
const getSavedPlaylists = () => {
  try {
    const data = localStorage.getItem("playlists");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const savePlaylistsToLocalStorage = (playlists) => {
  localStorage.setItem("playlists", JSON.stringify(playlists));
};

const api = axiosInstance.create({
  baseURL: "https://dev1hunter.pythonanywhere.com/live/api/",
});

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();

  useEffect(() => {
    const localData = getSavedPlaylists();
    if (localData.length > 0) setPlaylists(localData);
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await api.get("playlists/", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setPlaylists(response.data);
      savePlaylistsToLocalStorage(response.data);
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
        const updated = [...playlists, response.data];
        setPlaylists(updated);
        savePlaylistsToLocalStorage(updated);
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
      const updated = playlists.map((playlist) =>
        playlist.id === id
          ? { ...playlist, name: response.data.name }
          : playlist
      );
      setPlaylists(updated);
      savePlaylistsToLocalStorage(updated);
      toast.success("تم التعديل بنجاح");
    } catch (error) {
      toast.error("فشل في التعديل");
    }
  };

  const confirmDeletePlaylist = (id) => {
    setSelectedPlaylistId(id);
    setDeleteConfirmOpen(true);
  };

  const deletePlaylist = async () => {
    try {
      await api.delete(`playlists/${selectedPlaylistId}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const updated = playlists.filter(
        (playlist) => playlist.id !== selectedPlaylistId
      );
      setPlaylists(updated);
      savePlaylistsToLocalStorage(updated);
      toast.success("تم الحذف بنجاح");
    } catch (error) {
      toast.error("فشل في الحذف");
    } finally {
      setDeleteConfirmOpen(false);
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
        <Box sx={{ px: 2, py: 4 }}>
          {playlists.length === 0 ? (
            <Typography align="center" color={darkMode ? "#ccc" : "#555"}>
              لا توجد قوائم تشغيل
            </Typography>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {playlists.map((playlist, i) => (
                <Grid item xs={12} key={playlist.id}>
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
                          onClick={() => confirmDeletePlaylist(playlist.id)}
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

                      <Grid container spacing={2} mt={2}>
                        {playlist.items?.map((item) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={item.id}
                            onClick={() =>
                              navigate(`/live/${item.stream.youtube_id}`)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <Card
                              sx={{
                                bgcolor: darkMode ? "#222" : "#fff",
                                color: darkMode ? "#fff" : "#000",
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="140"
                                image={
                                  item.stream.thumbnail ||
                                  "https://via.placeholder.com/320x180.png?text=No+Thumbnail"
                                }
                                alt={item.stream.title}
                              />
                              <CardContent>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight={600}
                                >
                                  {item.stream.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color={darkMode ? "#ccc" : "text.secondary"}
                                >
                                  التصنيف:{" "}
                                  {item.stream.category_name || "غير محدد"}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}

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

          <Dialog
            open={deleteConfirmOpen}
            onClose={() => setDeleteConfirmOpen(false)}
          >
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogContent>
              <Typography>هل أنت متأكد أنك تريد حذف هذه القائمة؟</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmOpen(false)}>إلغاء</Button>
              <Button onClick={deletePlaylist} color="error">
                حذف
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}
