import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Avatar } from "@mui/material";

const recommended = [
  {
    title: "Warzone Highlights",
    image: "https://i.imgur.com/BY0n7Zx.jpg",
    streamer: "AvaDrex"
  },
  {
    title: "Epic LoL Battles",
    image: "https://i.imgur.com/4EZbn4V.jpg",
    streamer: "GamerQueen"
  },
  {
    title: "Best Snipes 2024",
    image: "https://i.imgur.com/Nfzkfvl.jpg",
    streamer: "SniperWolf"
  },
  {
    title: "Underrated Gems",
    image: "https://i.imgur.com/s0kYIgh.jpg",
    streamer: "ChadMaster"
  }
];

export default function RecommendedVideos() {
  return (
    <Box sx={{ px: 2, mb: 4 }}>
      <Typography variant="h6" sx={{ color: "white", mb: 2 }}>Recommended for You</Typography>
      <Grid container spacing={2}>
        {recommended.map((video, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ bgcolor: "#1e1e1e", color: "white", borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={video.image}
                alt={video.title}
              />
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{video.title}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                  <Typography variant="caption" color="gray">{video.streamer}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
