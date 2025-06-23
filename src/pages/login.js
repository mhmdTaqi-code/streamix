import React from "react";
import { Box, Typography, TextField, Button, Paper, Link, Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/streamix-logo.png"; // تأكد من وجود صورة الشعار

export default function Login() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right,rgb(255, 255, 255),rgb(248, 248, 248))",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 15s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%", textAlign: "center", backdropFilter: "blur(6px)" }}>
        <Avatar
          src={logo}
          alt="Streamix Logo"
          sx={{ width: 64, height: 64, mx: "auto", mb: 1 }}
        />
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Welcome to Streamix
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
        <Typography variant="body2" align="center" mt={2}>
          Don't have an account?{' '}
          <Link component={RouterLink} to="/register">
            Register here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}