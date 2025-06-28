import React from "react";
import { IconButton, Box } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("themeMode", newMode ? "dark" : "light");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
      <IconButton
        onClick={toggleTheme}
        sx={{ color: darkMode ? "#ffc107" : "#555" }}
      >
        {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Box>
  );
}
