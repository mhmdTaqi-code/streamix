// File: src/pages/Register.jsx
import React from "react";
import { Box, Typography, TextField, Button, Grid, Paper, Link, Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/streamix-logo.png"; // تأكد من وجود صورة الشعار

export default function Register() {
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
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: "100%", backdropFilter: "blur(6px)" }}>
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
          <Grid item xs={12} sm={6}>
            <TextField label="First Name" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Last Name" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type="password" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Confirm Password" type="password" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Already have an account?{' '}
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
