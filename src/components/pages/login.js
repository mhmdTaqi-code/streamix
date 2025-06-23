// File: src/pages/Login.jsx
import React from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

export default function Login() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Welcome Back
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
      </Paper>
    </Box>
  );
}

// File: src/pages/Register.jsx
import React from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";

export default function Register() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: "100%" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Create Account
        </Typography>
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
        </Grid>
      </Paper>
    </Box>
  );
}
