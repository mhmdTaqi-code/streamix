"use client";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  AppBar,
  Switch,
  Paper,
  CardMedia,
  Toolbar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Favorite, Star, MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";

import {
  Twitter,
  Instagram,
  EmojiEvents,
  Launch,
  MoreHoriz,
  CheckCircle,
} from "@mui/icons-material";

export default function SilkyProfile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const socialCards = [
    {
      title: "Instagram",
      subtitle: "INSTAGRAM",
      gradient:
        "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
    },

    {
      title: "Twitter",
      subtitle: "TWITTER",
      gradient: "linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)",
    },
    {
      title: "Donate",
      subtitle: "DONATIONS",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    },
    {
      title: "Youtube",
      subtitle: "YOUTUBE",
      gradient: "linear-gradient(135deg, #FF0000 0%, #cc0000 100%)",
    },
  ];

  const navItems = ["Home", "About", "Videos", "Chat"];
  const [activeTab, setActiveTab] = useState("Home");

  const navigate = useNavigate();

  const onsubmit = (Name) => {
    switch (Name) {
      case "Chat":
        return navigate("/LiveUi");
      case "About":
        return navigate("/profile/About");
      case "Home":
        return navigate("/Profile");
      case "Videos":
        return navigate("/profile/video");
      default:
        return console.log("Page not found");
    }
  };

  const handleTabChange = (tabName: string, Name) => {
    setActiveTab(tabName);
    onsubmit(Name);
  };

  return (
    <>
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

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#1a1a1a",
          color: "white",
          py: 4,
          px: 2,
        }}
      >
        <Container maxWidth="xl">
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={12} lg={8}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: "bold", mr: 1 }}
                  >
                    Silky
                  </Typography>
                  <CheckCircle sx={{ color: "#1976d2", fontSize: 28 }} />
                </Box>
                <Typography variant="body1" sx={{ mb: 1, color: "#b0b0b0" }}>
                  <Box
                    component="span"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    878K
                  </Box>{" "}
                  followers •{" "}
                  <Box component="span" sx={{ color: "#9c27b0" }}>
                    FaZe
                  </Box>
                </Typography>
                <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                  Hi, I'm Silky. Any business inquiries contact me at
                  Youngsilkmgmt@gmail.com
                </Typography>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: isMobile ? "flex-start" : "flex-end",
                  }}
                >
                  <Button
                    startIcon={<Twitter />}
                    sx={{ color: "white", "&:hover": { color: "white" } }}
                  >
                    Twitter
                  </Button>
                  <Button
                    startIcon={<Instagram />}
                    sx={{ color: "white", "&:hover": { color: "white" } }}
                  >
                    Instagram
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Main Grid */}
          <Grid container spacing={3}>
            {/* Social Media Cards */}
            {socialCards.map((card, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: 70,
                    width: 300,
                    background: card.gradient,
                    border: "none",
                    borderRadius: 2,
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      transition: "transform 0.3s ease",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 0,
                      height: "100%",
                      position: "relative",
                      "&:last-child": { pb: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.2)",
                      }}
                    />
                    <Box
                      alt={card.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.7,
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ fontWeight: "bold", mb: 0.5 }}
                      >
                        {card.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {card.subtitle}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Donation Info */}
          <Card
            sx={{
              backgroundColor: "#2d2d2d",
              border: "1px solid #404040",
              borderRadius: 2,
              mt: 3,
            }}
          >
            <CardContent>
              <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                All donations go towards improving the stream and giving back to
                my viewers/subs! All donations are final and cannot be refunded.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
