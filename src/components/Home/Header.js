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
import { useSelector } from "react-redux";

export default function Header({ searchOnly }) {
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

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
          sx={{
            color: darkMode ? "#fff" : "#000",
            display: { xs: "none", sm: "block" },
            fontWeight: "bold",
          }}
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
            color: darkMode ? "#ccc" : "#888",
            fontSize: 20,
          }}
        />
        <InputBase
          placeholder="Search Everything"
          sx={{
            width: "100%",
            bgcolor: darkMode ? "#2a2a2a" : "#eeeeee",
            color: darkMode ? "#fff" : "#000",
            pl: 4,
            py: 0.8,
            borderRadius: 2,
            fontSize: 14,
            border: `1px solid ${darkMode ? "#444" : "#e0e0e0"}`,
          }}
        />
      </Box>

      {/* (Optional future additions like notifications/account) */}
      {/* <IconButton sx={{ color: darkMode ? "#fff" : "#000" }}>
        <Badge badgeContent={1} color="error">
          <Notifications />
        </Badge>
      </IconButton> */}
    </Box>
  );
}
