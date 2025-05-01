import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, CircularProgress, Button } from "@mui/material";
// import axios from "axios";
import API from "../api";

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await API.get("/friends/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.friendRequests);
    } catch (err) {
      console.error("Error fetching friend requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (username, accept) => {
    const token = localStorage.getItem("token");
    const endpoint = accept
      ? "/friends/accept"
      : "/friends/reject";
  
    try {
      await API.post(
        endpoint,
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(prev => prev.filter(r => r.username !== username));
    } catch (err) {
      console.error("Error responding to request:", err);
    }
  };
  

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>Friend Requests</Typography>
      {requests.length === 0 ? (
        <Typography>No pending requests.</Typography>
      ) : (
        requests.map(req => (
          <Paper key={req._id} sx={{ p: 2, display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar src={req.profilePic} sx={{ mr: 2 }} />
            <Typography sx={{ flexGrow: 1 }}>{req.username}</Typography>
            <Button variant="contained" sx={{ mr: 1 }} onClick={() => handleRespond(req.username, true)}>Accept</Button>
            <Button variant="outlined" color="error" onClick={() => handleRespond(req.username, false)}>Reject</Button>

          </Paper>
        ))
      )}
    </Box>
  );
};

export default FriendRequests;