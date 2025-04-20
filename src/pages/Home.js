import React from "react";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3">Welcome to Badmintify!</Typography>
      <Typography variant="h6" mt={2}>
        Track your badminton matches, stats, and progress.
      </Typography>
    </Box>
  );
};

export default Home;
