// src/pages/SignUp.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SignUp Form Submitted:", form);
    // Here you’d send a POST request to the backend
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} bgcolor="background.paper" boxShadow={3} borderRadius={2}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Create Your Account
        </Typography>
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;