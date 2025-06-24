import React from "react";
import { Box, CircularProgress } from "@mui/material";

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300, // عشان يكون فوق كل شيء
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default FullScreenLoader;
