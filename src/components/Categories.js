import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const categories = [
  { title: "FPS", image: "https://i.imgur.com/BbZV3Aa.jpg" },
  { title: "MOBA", image: "https://i.imgur.com/LuK50Pj.jpg" },
  { title: "RPG", image: "https://i.imgur.com/2A2X3p5.jpg" },
  { title: "Strategy", image: "https://i.imgur.com/0A0JhKb.jpg" },
];

export default function Categories() {
  return (
    <Box sx={{ px: 2, mb: 4 }}>
      <Typography variant="h6" sx={{ color: "#000", mb: 2 }}>Categories</Typography>
      <Grid container spacing={2}>
        {categories.map((cat, index) => (
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
                    image={cat.image}
                    alt={cat.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {cat.title}
                    </Typography>
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
