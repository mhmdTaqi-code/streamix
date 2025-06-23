import React from "react";
import { Box, Typography, Card, CardMedia, CardContent, Chip, Avatar } from "@mui/material";
import { motion } from "framer-motion";

const channels = [
  { game: "Call of Duty", image: "https://i.imgur.com/WfJXj8V.jpg" },
  { game: "Garena of Valor", image: "https://i.imgur.com/E1rxy4E.jpg" },
  { game: "Call of Duty", image: "https://i.imgur.com/WfJXj8V.jpg" },
  { game: "Garena Free Fire", image: "https://i.imgur.com/Zj5V8Gb.jpg" },
];

export default function LiveChannels() {
  // نكرر القائمة مرتين حتى تبين مستمرة
  const extendedChannels = [...channels, ...channels];

  return (
    <Box sx={{ px: 2, mb: 4, overflow: "hidden" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ color: "#000" }}>Live channels</Typography>
        <Chip label="Popular" size="small" sx={{ bgcolor: "#eaeaea", color: "#000" }} />
      </Box>

      {/* شريط متحرك */}
      <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <motion.div
          style={{ display: "flex", gap: 16 }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {extendedChannels.map((channel, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 240,
                bgcolor: "#fafafa",
                color: "#000",
                borderRadius: 2,
                boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={channel.image}
                alt={channel.game}
              />
              <CardContent>
                <Chip label="Live" color="error" size="small" sx={{ mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {channel.game}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Avatar sx={{ width: 20, height: 20, mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    4.2K watching
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}
