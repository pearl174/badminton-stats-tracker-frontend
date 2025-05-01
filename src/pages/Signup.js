// src/pages/SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import API from "../api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await API.post("/api/auth/register", form); // adjust if different port
      setSuccess(res.data.msg);
      setTimeout(() => navigate("/"), 1500); // wait a bit before redirecting
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
          Create Your Account
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
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
            label="Email"
            name="email"
            type="email"
            value={form.email}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;