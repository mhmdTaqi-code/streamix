import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const categories = [
  { title: "FPS", image: "https://i.imgur.com/BbZV3Aa.jpg" },
  { title: "MOBA", image: "https://i.imgur.com/LuK50Pj.jpg" },
  { title: "RPG", image: "https://i.imgur.com/2A2X3p5.jpg" },
  { title: "Strategy", image: "https://i.imgur.com/0A0JhKb.jpg" },
];

export default function Categories() {
  return (
    <Box sx={{ px: 2, mb: 4 }}>
      <Typography variant="h6" sx={{ color: "white", mb: 2 }}>Categories</Typography>
      <Grid container spacing={2}>
        {categories.map((cat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ bgcolor: "#1e1e1e", color: "white", borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={cat.image}
                alt={cat.title}
              />
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{cat.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
