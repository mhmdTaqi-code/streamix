import React from "react";
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box, Badge, Avatar } from "@mui/material";
import { Search, Notifications, AccountCircle } from "@mui/icons-material";

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1c1c1c", px: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Browse
        </Typography>

        <Box sx={{ position: "relative", flex: 1, mx: 4 }}>
          <Search sx={{ position: "absolute", top: "50%", left: 8, transform: "translateY(-50%)", color: "gray" }} />
          <InputBase
            placeholder="Search Everything"
            sx={{
              width: "100%",
              bgcolor: "#2c2c2c",
              color: "white",
              px: 4,
              py: 1,
              borderRadius: 2,
            }}
          />
        </Box>

        <Box>
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
