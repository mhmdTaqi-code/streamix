// File: src/pages/Login.jsx
import React from "react";
import FullScreenLoader from "../components/Loading";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/streamix-logo.png";
import { ToastContainer } from "react-toastify";
import useLoginHook from "../Hooks/Auth/login-hook";

export default function Login() {
  const {
    email,
    password,loading,
    onChangeEmail,
    onChangePassword,
    onSubmit, 
  } = useLoginHook();

  return (
    <Box
      sx={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(to right, #fff, #f8f8f8)",
        animation: "gradientAnimation 15s ease infinite",
      }}
    >
      <style>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
{loading ? <FullScreenLoader /> : null}

      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%", textAlign: "center" }}>
        <ToastContainer position="top-center" />
        <Avatar src={logo} sx={{ width: 64, height: 64, mx: "auto", mb: 1 }} />
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Welcome to Streamix
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          onChange={onChangeEmail}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={onChangePassword}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={onSubmit}>
          Login
        </Button>
<Button
  variant="outlined"
  color="secondary"
  fullWidth
  sx={{ mt: 2 }}
  onClick={() => {
    // ✅ حذف بيانات تسجيل الدخول السابقة (إن وجدت)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.setItem("isGuest", "true"); // وضع حالة الضيف
    window.location.href = "/home";
  }}
>
  دخول كـ ضيف
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
