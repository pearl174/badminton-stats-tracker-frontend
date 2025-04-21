import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/friends/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFriends(res.data.friends);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching friends:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Your Friends
        </Typography>
        <Button variant="contained" onClick={() => navigate("/sendrequest")}>
          Send Friend Request
        </Button>
      </Box>

      {friends.length === 0 ? (
        <Typography>No friends found.</Typography>
      ) : (
        friends.map((friend) => (
          <Paper
            key={friend._id}
            sx={{ p: 2, display: "flex", alignItems: "center", mb: 2 }}
          >
            <Avatar src={friend.profilePic} sx={{ mr: 2 }} />
            <Typography sx={{ flexGrow: 1 }}>{friend.username}</Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate(`/play/${friend.username}`)}
            >
              Play Match
            </Button>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default FriendsList;