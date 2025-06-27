import React, { useState, useEffect } from "react";
import { Box, Typography, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ searchOnly }) {
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";
  const navigate = useNavigate();
  const location = useLocation();

  const getInitialQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  };

  const [query, setQuery] = useState(getInitialQuery());

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== "") {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      } else {
        navigate("/home");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 1,
      }}
    >
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
    </Box>
  );
}
