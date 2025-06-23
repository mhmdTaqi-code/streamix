// Header.jsx
import React from "react";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Badge,
} from "@mui/material";
import {
  Search,
  Notifications,
  AccountCircle,
} from "@mui/icons-material";

export default function Header({ searchOnly }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 1,
      }}
    >
      {/* Browse Title (hidden on small screens) */}
      {!searchOnly && (
        <Typography
          variant="h6"
          sx={{ color: "white", display: { xs: "none", sm: "block" } }}
        >
          Browse
        </Typography>
      )}

      {/* Search Bar */}
      <Box sx={{ position: "relative", flex: 1 }}>
        <Search
          sx={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            color: "gray",
            fontSize: 20,
          }}
        />
        <InputBase
          placeholder="Search Everything"
          sx={{
            width: "100%",
            bgcolor: "#2c2c2c",
            color: "white",
            pl: 4,
            py: 0.8,
            borderRadius: 2,
            fontSize: 14,
          }}
        />
      </Box>

      {/* Icons (hidden on small screens) */}
      {!searchOnly && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <AccountCircle />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
