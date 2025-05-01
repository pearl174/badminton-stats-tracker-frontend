import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import API from "../api";

const PlayMatch = () => {
  const { friendUsername } = useParams();
  const [timer, setTimer] = useState(0);
  const [matchId, setMatchId] = useState(null);
  const [finalScore, setFinalScore] = useState("");
  const [winner, setWinner] = useState("");
  const [error, setError] = useState(null);
  const [ending, setEnding] = useState(false);
  const navigate = useNavigate();

  const currentUsername = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    API
      .post(
        "/match/create",
        { opponentUsername: friendUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setMatchId(res.data.match._id);
      })
      .catch((err) => {
        const msg =
          err.response?.data?.msg ||
          "Error starting match. Make sure you are friends!";
        setError(msg);
      });
  }, [friendUsername, token]);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 60000); // every minute
    return () => clearInterval(interval);
  }, []);

  const handleEndMatch = async () => {
    if (!finalScore || !winner) {
      setError("Please provide final score and winner username");
      return;
    }

    setEnding(true);

    try {
      await API.post(
        "/match/end",
        {
          matchId,
          finalScore,
          winnerUsername: winner,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.msg || "Failed to end match. Try again.";
      setError(msg);
      setEnding(false);
    }
  };

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!matchId) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Match vs {friendUsername}
      </Typography>

      <Typography sx={{ mb: 2 }}>
        Match duration: {timer} minute{timer !== 1 ? "s" : ""}
      </Typography>

      <TextField
        label="Final Score"
        fullWidth
        value={finalScore}
        onChange={(e) => setFinalScore(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="winner-select-label">Winner</InputLabel>
        <Select
          labelId="winner-select-label"
          value={winner}
          label="Winner"
          onChange={(e) => setWinner(e.target.value)}
        >
          <MenuItem value={friendUsername}>{friendUsername}</MenuItem>
          <MenuItem value={currentUsername}>You ({currentUsername})</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleEndMatch}
        disabled={ending}
      >
        {ending ? "Ending..." : "End Match"}
      </Button>
    </Box>
  );
};

export default PlayMatch;