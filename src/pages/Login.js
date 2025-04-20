// src/pages/Login.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn, setProfilePic }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const token = res.data.token;
      const profilePic = res.data.profilePic;

      localStorage.setItem("token", token); // store JWT for future use
      setLoggedIn(true);
      setProfilePic(profilePic || "");
      navigate("/dashboard"); // redirect to dashboard instead of home
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";
      setError(msg);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} bgcolor="background.paper" boxShadow={3} borderRadius={2}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;