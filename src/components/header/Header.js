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
        justifyContent:"space-between",
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor:"black",
        gap: 1,
        margin:"auto",
        left:"31%",
        height:"50px",
           '@media (max-width:600px)': {
         width: "100%",
         position:"absolute",
        },
        

      }}
    >
      {/* Browse Title (hidden on small screens) */}
      {!searchOnly && (
        <Typography
          variant="h6"
          sx={{ color: "white", display: { xs: "none", sm: "block" },position:"absolute",left:"21%", }}
        >
          Browse
        </Typography>
      )}

      {/* Search Bar */}
      <Box sx={{ position: "relative", flex: 1 }}>
      
        <InputBase
          placeholder="Search Everything"
          sx={{
            left:"28%",
            marginTop:"3px",
            bgcolor: "#2c2c2c",
            color: "white",
            pl: 4,
            width:"50%",
            px:2,
            marginLeft:"2px",
            py: 0.3,
            borderRadius: 2,
            fontSize: 14,
          }}
        />
      </Box>

      {/* Icons (hidden on small screens) */}
      {!searchOnly && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1}}>
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
