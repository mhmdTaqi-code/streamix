import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Avatar } from "@mui/material";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

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
      <Typography variant="h6" sx={{ color: "#000", mb: 2 }}>
        Recommended for You
      </Typography>
      <Grid container spacing={2}>
        {recommended.map((video, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Tilt glareEnable={true} glareMaxOpacity={0.15} scale={1.05}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    bgcolor: "#fafafa",
                    color: "#000",
                    borderRadius: 2,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.image}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {video.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                      <Typography variant="caption" color="text.secondary">
                        {video.streamer}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Tilt>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
