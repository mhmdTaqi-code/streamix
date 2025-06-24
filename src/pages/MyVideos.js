// File: src/pages/MyVideos.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Divider
} from "@mui/material";
import { motion } from "framer-motion";
import PersonIcon from '@mui/icons-material/Person';

const dummyVideos = [
  {
    id: 1,
    title: "My First Stream",
    thumbnail: "https://placehold.co/600x400",
    views: 123,
  },
  {
    id: 2,
    title: "React Tutorial",
    thumbnail: "https://placehold.co/600x400",
    views: 200,
  },
  {
    id: 3,
    title: "My MUI Components",
    thumbnail: "https://placehold.co/600x400",
    views: 76,
  },
];

export default function MyVideos() {
  return (
    <Box sx={{ px: 2, py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          My Videos
        </Typography>
      </Box>

      <Divider sx={{ width: '100%', maxWidth: 900, mb: 4 }} />

      <Grid container spacing={3} justifyContent="center">
        {dummyVideos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={video.thumbnail}
                  alt={video.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.views} views
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">Edit</Button>
                  <Button size="small" color="error">Delete</Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
