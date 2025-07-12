// ProfilePage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CssBaseline,
  Drawer,
  useMediaQuery
} from "@mui/material";
import imgprofile from "../assets/profile.png"
import Sidebar from "../components/Home/Sidebar";
import { SIDEBAR_WIDTH } from "../redux/type";
import FullScreenLoader from "../components/Loading";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const usernameFromQuery = searchParams.get("username");
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const localUsername = localStorage.getItem("username");
    const username = usernameFromQuery || localUsername;

    if (!username) {
      setError("You must log in first.");
      setIsLoading(false);
      return;
    }

    axiosInstance
      .get(`/profile/${username}/`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [usernameFromQuery]);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: darkMode ? "#121212" : "#fff",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

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
              width: 240,
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

      <Box sx={{ flexGrow: 1, width: "100%", minHeight: "100vh", p: 3 }}>
        {isLoading && <FullScreenLoader darkMode={darkMode} />}

        <Typography variant="h4" gutterBottom fontWeight="bold">
          Profile
        </Typography>

        {error && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body1" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          </Box>
        )}

        {user && (
          <Card
            sx={{
              maxWidth: 800,
              mx: "auto",
              bgcolor: darkMode ? "#1e1e1e" : "#fff",
              boxShadow: 3,
              borderRadius: 3,
              mt: 3,
            }}
          >
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                  <Avatar
                    src={
                      user.user.profile_picture ||
                      imgprofile
                    }
                    alt={user.user.username}
                    sx={{ width: 120, height: 120 }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 1, color: darkMode ? "#aaa" : "#888", fontStyle: "italic" }}
                  >
                    @{user.user.username}
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 2, color: darkMode ? "#ccc" : "#444" }}>
                    {user.bio || "No bio available."}
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 2, color: darkMode ? "#ccc" : "#666" }}>
                    Followers: {user.followers_count}
                  </Typography>
              <Typography
  variant="body1"
  sx={{
    color: darkMode ? "#ccc" : "#666",
    cursor: "pointer",
    "&:hover": { color: darkMode ? "#fff" : "#000" },
  }}
  onClick={() => navigate(`/FollowingPage?username=${user.user.username}`)}
>
  Following: {user.following_count}
</Typography>


                </Grid>
              </Grid>

              {user.followers?.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" sx={{ mb: 2, color: darkMode ? "#fff" : "#000" }}>
                    Followers
                  </Typography>
                  <List>
                    {user.followers.map((follower, index) => (
                      <ListItem
                        button
                        key={index}
                        onClick={() =>
                          navigate(`/profile?username=${follower.username}`)
                        }
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={
                              follower.profile_picture || imgprofile
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={follower.username}
                          primaryTypographyProps={{
                            sx: {    cursor: "pointer", color: darkMode ? "#eee" : "#111" },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
