// File: src/pages/Register.jsx
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Link,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../assets/1.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRegisterHook from "../Hooks/Auth/register-hook";
import FullScreenLoader from "../components/Loading";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/reducers/themeReducer";
import { motion } from "framer-motion";

export default function Register() {
  const {
    name,
    email,
    password,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePassword,
    onSubmit,
  } = useRegisterHook();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const darkMode = mode === "dark";

  const handleSubmit = async () => {
    const success = await onSubmit();
    if (success) {
      navigate("/login", { state: { justRegistered: true } });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        bgcolor: darkMode ? "#0e0e0e" : "#f0f0f0",
      }}
    >
      {loading && <FullScreenLoader />}

      <Paper
        component={motion.div}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
          bgcolor: darkMode ? "#1a1a1a" : "#fff",
          boxShadow: darkMode
            ? "0px 0px 30px rgba(255,255,255,0.06)"
            : "0px 0px 10px rgba(0,0,0,0.1)",
          zIndex: 1,
        }}
      >
        <ToastContainer position="top-center" />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Avatar src={logo} sx={{ width: 64, height: 64, mb: 1 }} />
          <Tooltip title={darkMode ? "الوضع الفاتح" : "الوضع الداكن"}>
            <IconButton onClick={() => dispatch(toggleTheme())}>
              {darkMode ? (
                <Brightness7 sx={{ color: "#f1c40f" }} />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
          sx={{ color: darkMode ? "#f5f5f5" : "#000" }}
        >
          Create your account
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TextField
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            onChange={onChangeName}
            sx={{
              input: { color: darkMode ? "#fff" : "#000" },
              label: { color: darkMode ? "#bbb" : "#000" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#888" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#aaa" : "#000",
                },
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={onChangeEmail}
            sx={{
              input: { color: darkMode ? "#fff" : "#000" },
              label: { color: darkMode ? "#bbb" : "#000" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#888" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#aaa" : "#000",
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
            sx={{
              input: { color: darkMode ? "#fff" : "#000" },
              label: { color: darkMode ? "#bbb" : "#000" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#888" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#aaa" : "#000",
                },
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
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
            Already have an account?{" "}
            <Link component={RouterLink} to="/login">
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
