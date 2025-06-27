// File: src/pages/Login.jsx
import React, { useEffect } from "react";
import FullScreenLoader from "../components/Loading";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/streamix-logo.png";
import { ToastContainer } from "react-toastify";
import useLoginHook from "../Hooks/Auth/login-hook";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/reducers/themeReducer";
import { motion } from "framer-motion";

export default function Login() {
  const {
    email,
    password,
    loading,
    onChangeEmail,
    onChangePassword,
    onSubmit,
  } = useLoginHook();

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js";
    script2.async = true;
    script2.onload = () => {
      if (window.VANTA) {
        window.VANTA.GLOBE({
          el: "#vanta-bg",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x201d20,
          color2: 0x2f2a2a,
          backgroundColor: darkMode ? 0x111111 : 0xe1e1e1,
        });
      }
    };
    document.body.appendChild(script2);
  }, [darkMode]);

  return (
    <Box
      id="vanta-bg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {loading && <FullScreenLoader />}

      <Paper
        component={motion.div}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
          bgcolor: darkMode ? "#1c1c1c" : "#fff",
          boxShadow: darkMode
            ? "0px 0px 25px rgba(255,255,255,0.05)"
            : "0px 0px 10px rgba(0,0,0,0.1)",
          zIndex: 1,
        }}
      >
        <ToastContainer position="top-center" />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Avatar src={logo} sx={{ width: 64, height: 64, mb: 1 }} />
          <Tooltip title={darkMode ? "الوضع الفاتح" : "الوضع الداكن"}>
            <IconButton onClick={() => dispatch(toggleTheme())}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
          sx={{ color: darkMode ? "#fff" : "#000" }}
        >
          Welcome to Streamix
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={onChangeEmail}
            InputLabelProps={{ style: { color: darkMode ? '#ccc' : '#555' } }}
            sx={{
              input: { color: darkMode ? "#fff" : "#000" },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: darkMode ? '#555' : '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: darkMode ? '#888' : '#000',
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={onChangePassword}
            InputLabelProps={{ style: { color: darkMode ? '#ccc' : '#555' } }}
            sx={{
              input: { color: darkMode ? "#fff" : "#000" },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: darkMode ? '#555' : '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: darkMode ? '#888' : '#000',
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={onSubmit}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("username");
              localStorage.setItem("isGuest", "true");
              window.location.href = "/home";
            }}
          >
            دخول كـ ضيف
          </Button>
          <Typography
            variant="body2"
            align="center"
            mt={2}
            sx={{ color: darkMode ? "#ccc" : "#444" }}
          >
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register">
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
