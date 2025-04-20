import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

const SendFriendRequest = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/friends/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users); // Expects [{ username, _id, profilePic }]
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSend = async () => {
    if (!selectedUser) return;

    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/friends/send",
        { username: selectedUser.username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus({ type: "success", msg: "Friend request sent!" });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.msg || "Failed to send request";
      setStatus({ type: "error", msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
        Send Friend Request
      </Typography>

      {status.msg && (
        <Alert severity={status.type} sx={{ mb: 2 }}>
          {status.msg}
        </Alert>
      )}

      <Autocomplete
        options={users}
        getOptionLabel={(option) => option.username}
        onChange={(e, val) => setSelectedUser(val)}
        renderInput={(params) => <TextField {...params} label="Search Users" />}
        sx={{ mb: 2, width: 300 }}
      />

      <Button
        variant="contained"
        onClick={handleSend}
        disabled={!selectedUser || loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Send Request"}
      </Button>
    </Box>
  );
};

export default SendFriendRequest;