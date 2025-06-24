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
  Avatar
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../assets/streamix-logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRegisterHook from "../Hooks/Auth/register-hook";
import FullScreenLoader from "../components/Loading";

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

  const handleSubmit = async () => {
    const success = await onSubmit();
    if (success) {
      navigate("/home"); // توجيه إلى صفحة home
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(to right,rgb(255, 255, 255),rgb(248, 248, 248))",
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
{loading ? <FullScreenLoader /> : null}
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: "100%" }}>
        <ToastContainer position="top-right" />
        <Box textAlign="center" mb={2}>
          <Avatar
            src={logo}
            alt="Streamix Logo"
            sx={{ width: 64, height: 64, mx: "auto", mb: 1 }}
          />
          <Typography variant="h5" fontWeight="bold">
            Join Streamix
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={onChangeName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={onChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login">
                Login here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
