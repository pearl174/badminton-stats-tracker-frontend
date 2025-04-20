import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/friends/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(res.data.friends);
    } catch (err) {
      console.error("Error fetching friends:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (username) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/friends/delete", { username }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(prev => prev.filter(f => f.username !== username));
    } catch (err) {
      console.error("Error deleting friend:", err);
    }
  };

  if (loading) {
    return <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>Your Friends</Typography>
        <Button variant="contained" onClick={() => navigate("/sendrequest")}>
          Send Friend Request
        </Button>
      </Box>

      {friends.length === 0 ? (
        <Typography>No friends found.</Typography>
      ) : (
        friends.map(friend => (
          <Paper key={friend._id} sx={{ p: 2, display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar src={friend.profilePic} sx={{ mr: 2 }} />
            <Typography sx={{ flexGrow: 1 }}>{friend.username}</Typography>
            <Button variant="outlined" color="error" onClick={() => handleDelete(friend.username)}>
              Remove
            </Button>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default FriendsList;