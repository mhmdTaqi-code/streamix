"use client";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Favorite, Star, MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";

const StreamingPlatform = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  // State لتتبع التبويب النشط
  const [activeTab, setActiveTab] = useState("Home");

  const featuredClips = [
    {
      id: 1,
      title: "Apex Legends",
      duration: "0:17",
      views: "3.7K views",
      timeAgo: "16 days ago",
      thumbnail:
        "https://images.hdqwalls.com/download/4k-apex-legends-2020-ja-1080x1920.jpg",
      game: "Apex Legends",
    },
    {
      id: 2,
      title: "Apex Legends",
      duration: "0:22",
      views: "5K views",
      timeAgo: "Last month",
      thumbnail:
        "https://th.bing.com/th/id/OIP.nlNekhEFxv3Nb4eSCyt7vAHaHa?rs=1&pid=ImgDetMain",
      game: "Apex Legends",
    },
    {
      id: 3,
      title: "Dead By Daylight",
      duration: "0:30",
      views: "3.5K views",
      timeAgo: "Last month",
      thumbnail:
        "https://th.bing.com/th?id=OIF.%2f3TegopozdTaC8ihDW88dw&rs=1&pid=ImgDetMain",
      game: "Apex Legends",
    },
    {
      id: 4,
      title: "Resident Evil 4",
      duration: "0:30",
      views: "4.9K views",
      timeAgo: "2 months ago",
      thumbnail:
        "https://th.bing.com/th/id/OIP.ugfc5BQeUowMAftRrK0zjgHaHa?rs=1&pid=ImgDetMain",
      game: "Apex Legends",
    },
    {
      id: 5,
      title: "The Last Of Us",
      duration: "0:23",
      views: "2.7K views",
      timeAgo: "2 months ago",
      thumbnail:
        "https://www.gamers.de/wp-content/uploads/2020/08/The-Last-of-Us-Part-II.jpg",
      game: "Apex Legends",
    },
  ];

  const recentCategories = [
    {
      id: 1,
      name: "Fortnite",
      image:
        "https://th.bing.com/th/id/R.6a7d3933077e4de243268f380d8091db?rik=0i0mj6r7JJRuPA&pid=ImgRaw&r=0",
    },
    {
      id: 2,
      name: "Tom Clancy's Rainbow Six Siege",
      image:
        "https://th.bing.com/th/id/OIP.Esr-3THoEMujmVwk-W80jQHaFj?rs=1&pid=ImgDetMain",
    },
  ];

  //التنقل بين الكمبونت عند الضغط علئ زر
  const navItems = ["Home", "About", "Videos", "Chat"];

  const navigate = useNavigate();

  const onsubmit = (Name) => {
    switch (Name) {
      case "Chat":
        return navigate("/LiveUi");
      case "About":
        return navigate("/profile/About");
      case "Home":
        return navigate("/home");
      case "Videos":
        return navigate("/profile/video");
      default:
        return console.log("Page not found");
    }
  };

  // وظيفة للتبديل بين التبويبات
  const handleTabChange = (tabName: string, Name) => {
    setActiveTab(tabName);
    onsubmit(Name);
  };

  // مكون المحتوى الرئيسي (نفس المحتوى لجميع التبويبات)
  const MainContent = () => (
    <>
      {/* Featured Clips Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Featured Clips
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: "#adadb8",
              color: "white",
              textTransform: "none",
            }}
          >
            Show All
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "#2f2f35",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#adadb8",
              borderRadius: 4,
            },
          }}
        >
          {featuredClips.map((clip) => (
            <Card
              key={clip.id}
              sx={{
                minWidth: { xs: 250, sm: 280 },
                bgcolor: "#18181b",
                color: "white",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.2s",
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={clip.thumbnail}
                  alt={clip.title}
                />
                <Chip
                  label={clip.duration}
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    bgcolor: "rgba(0,0,0,0.8)",
                    color: "white",
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                  {clip.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#adadb8", display: "block" }}
                >
                  ImperialHal__
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#adadb8", display: "block" }}
                >
                  Clipped by imperialhal__
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#adadb8" }}>
                    {clip.views}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#adadb8" }}>
                    {clip.timeAgo}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Recently Streamed Categories */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          ImperialHal__'s recently streamed Categories
        </Typography>
        <Grid container spacing={2}>
          {recentCategories.map((category) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={category.id}>
              <Paper
                sx={{
                  bgcolor: "#18181b",
                  color: "white",
                  cursor: "pointer",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "transform 0.2s",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={category.image}
                  alt={category.name}
                />
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );

  return (
    <Box
      sx={{
        bgcolor: "#0f0f23",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          bgcolor: "#18181b",
          boxShadow: "none",
          borderBottom: "1px solid #2f2f35",
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Avatar
              src="/placeholder.svg?height=40&width=40"
              sx={{
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                mr: 2,
                border: "2px solid #ff0000",
              }}
            />
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant={isSmall ? "body1" : "h6"}
                  sx={{ fontWeight: "bold" }}
                >
                  ImperialHal__
                </Typography>
                <Box
                  sx={{
                    bgcolor: "#ff0000",
                    color: "white",
                    px: 1,
                    py: 0.25,
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  LIVE
                </Box>
              </Box>
              {!isSmall && (
                <Typography variant="body2" sx={{ color: "#adadb8" }}>
                  2.1M followers
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<Favorite />}
              sx={{
                bgcolor: "#9147ff",
                "&:hover": { bgcolor: "#7c3aed" },
                display: { xs: "none", sm: "flex" },
              }}
            >
              Follow
            </Button>
            <Button
              variant="outlined"
              startIcon={<Star />}
              sx={{
                borderColor: "#adadb8",
                color: "white",
                display: { xs: "none", sm: "flex" },
              }}
            >
              Subscribe
            </Button>
            <IconButton sx={{ color: "white" }}>
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Navigation */}
        <Box
          sx={{
            borderBottom: "1px solid #2f2f35",
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 4 },
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                onClick={() => handleTabChange(item, item)}
                sx={{
                  color: activeTab === item ? "#9147ff" : "#adadb8",
                  textTransform: "none",
                  minWidth: "auto",
                  px: 0,
                  py: 2,
                  borderBottom:
                    activeTab === item ? "2px solid #9147ff" : "none",
                  borderRadius: 0,
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "white",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Box>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* عرض نفس المحتوى لجميع التبويبات */}
        <MainContent />
      </Container>
    </Box>
  );
};
export default StreamingPlatform;
