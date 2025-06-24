import React from "react";
import { Box, Typography, Card, CardMedia, CardContent, Chip, Avatar } from "@mui/material";

const channels = [
  { game: "Call of Duty", image: "https://i.imgur.com/WfJXj8V.jpg" },
  { game: "Garena of Valor", image: "https://i.imgur.com/E1rxy4E.jpg" },
  { game: "Call of Duty", image: "https://i.imgur.com/WfJXj8V.jpg" },
  { game: "Garena Free Fire", image: "https://i.imgur.com/Zj5V8Gb.jpg" },
];

export default function LiveChannels() {
  return (
    <Box sx={{ px: 2, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ color: "white" }}>Live channels</Typography>
        <Chip label="Popular" size="small" sx={{ bgcolor: "#2c2c2c", color: "white" }} />
      </Box>
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
        {channels.map((channel, index) => (
          <Card key={index} sx={{ minWidth: 240, bgcolor: "#1e1e1e", color: "white", borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={channel.image}
              alt={channel.game}
            />
            <CardContent>
              <Chip label="Live" color="error" size="small" sx={{ mb: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{channel.game}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Avatar sx={{ width: 20, height: 20, mr: 1 }} />
                <Typography variant="caption" color="gray">4.2K watching</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
