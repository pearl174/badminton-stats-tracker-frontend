// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CalendarHeatmap.css";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Divider,
  LinearProgress,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PercentIcon from "@mui/icons-material/Percent";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import PeopleIcon from "@mui/icons-material/People";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  // Get user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Retrieved token from localStorage:", token ? "Token exists" : "No token found");
      
      if (!token) {
        console.warn("No token in localStorage, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        console.log("Sending request to profile API with token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { 
            "Authorization": `Bearer ${token}`
          },
        });
        console.log("Profile data received:", res.data);
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        console.error("Status code:", err.response?.status);
        setError("Failed to load profile data");
        setLoading(false);
        if (err.response?.status === 401) {
          console.warn("401 Unauthorized, clearing token and redirecting");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  // Generate dummy data for the heatmap
  const getActivityData = () => {
    
    // Convert map to array of objects with date and count
    return Object.entries(profile.activityLog).map(([date, count]) => ({
      date,
      count
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: "flex", 
      width: "100%", 
      minHeight: "calc(100vh - 64px)", 
      bgcolor: "#121212",
      p: 3
    }}>
      {/* Main Content Container */}
      <Box sx={{ 
        display: "flex", 
        flexDirection: {xs: "column", md: "row"},
        width: "100%", 
        gap: 3 
      }}>
        {/* Profile Section - Left */}
        <Box sx={{ 
          flex: {xs: "1 1 100%", md: "0 0 300px"},
          maxWidth: {xs: "100%", md: "300px"}
        }}>
          <Paper 
            elevation={3} 
            sx={{ 
              display: "flex", 
              flexDirection: "column",
              height: "100%",
              borderRadius: 2,
              overflow: "hidden"
            }}
          >
            {/* Profile Header with Background */}
            <Box 
              sx={{ 
                bgcolor: theme.palette.primary.dark,
                pt: 5,
                pb: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar 
                src={profile.profilePic || "/default-avatar.png"} 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: theme.shadows[3]
                }} 
              />
              
              <Typography variant="h5" sx={{ mt: 2, color: "white", fontWeight: 500 }}>
                {profile.username}
              </Typography>
              
              <Button 
                variant="contained" 
                startIcon={<EditIcon />} 
                size="small"
                sx={{ 
                  mt: 2, 
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    bgcolor: theme.palette.background.default,
                  }
                }}
                onClick={() => navigate("/edit-profile")}
              >
                EDIT PROFILE
              </Button>
            </Box>
            
            {/* Profile Info */}
            <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
              {profile.bio && (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
                    {profile.bio}
                  </Typography>
                  <Divider sx={{ width: "100%", my: 2 }} />
                </>
              )}
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                  Ranking: {profile.ranking || "Not Ranked"}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    fontWeight: 500 
                  }}
                >
                  <PeopleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  Friends: {profile.friends?.length || 0}
                </Typography>
              </Box>
              
              <Box sx={{ mt: "auto" }}>  
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    mt: 2,
                    borderRadius: 1,
                    py: 1
                  }}
                  onClick={() => navigate("/friends")}
                >
                  VIEW FRIENDS
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    mt: 2,
                    borderRadius: 1,
                    py: 1
                  }}
                  onClick={() => navigate("/requests")}
                >
                  VIEW FRIEND REQUESTS
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Stats Section - Right */}
        <Box sx={{ 
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          gap: 3
        }}>
          {/* Stats Cards */}
          <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 2,
            justifyContent: "space-between"
          }}>
            {/* Matches Played */}
            <Paper 
              elevation={3}
              sx={{ 
                flex: "1 1 200px", 
                minWidth: {xs: "45%", sm: "150px"},
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 2,
                minHeight: "150px"
              }}
            >
              <Box sx={{ 
                bgcolor: theme.palette.primary.dark, 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                p: 1.5,
                mb: 2
              }}>
                <SportsTennisIcon sx={{ fontSize: 30, color: "white" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {profile.matchesPlayed || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Matches Played
              </Typography>
            </Paper>
            
            {/* Matches Won */}
            <Paper 
              elevation={3}
              sx={{ 
                flex: "1 1 200px", 
                minWidth: {xs: "45%", sm: "150px"},
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 2,
                minHeight: "150px"
              }}
            >
              <Box sx={{ 
                bgcolor: theme.palette.success.dark, 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                p: 1.5,
                mb: 2
              }}>
                <EmojiEventsIcon sx={{ fontSize: 30, color: "white" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {profile.matchesWon || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Matches Won
              </Typography>
            </Paper>
            
            {/* Win Rate */}
            <Paper 
              elevation={3}
              sx={{ 
                flex: "1 1 200px", 
                minWidth: {xs: "45%", sm: "150px"},
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 2,
                minHeight: "150px"
              }}
            >
              <Box sx={{ 
                bgcolor: theme.palette.info.dark, 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                p: 1.5,
                mb: 2
              }}>
                <PercentIcon sx={{ fontSize: 30, color: "white" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {profile.winRate || 0}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Win Rate
              </Typography>
            </Paper>
            
            {/* Current Streak */}
            <Paper 
              elevation={3}
              sx={{ 
                flex: "1 1 200px", 
                minWidth: {xs: "45%", sm: "150px"},
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 2,
                minHeight: "150px"
              }}
            >
              <Box sx={{ 
                bgcolor: theme.palette.warning.dark, 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                p: 1.5,
                mb: 2
              }}>
                <WhatshotIcon sx={{ fontSize: 30, color: "white" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {profile.streak || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Current Streak
              </Typography>
            </Paper>
          </Box>
          
          {/* Performance Details */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, mb: 3 }}>
              Performance Details
            </Typography>
            <Box sx={{ display: "flex", flexDirection: {xs: "column", sm: "row"}, gap: 4 }}>
              <Box sx={{ flex: "1 1 50%" }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Win Rate
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={profile.winRate || 0} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        bgcolor: theme.palette.action.hover,
                        '& .MuiLinearProgress-bar': {
                          bgcolor: theme.palette.primary.main
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 40 }}>
                    <Typography variant="body2" color="text.secondary">
                      {profile.winRate || 0}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ flex: "1 1 50%" }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Average Match Duration: {profile.averageMatchDuration || 0} minutes
                </Typography>
                <Typography variant="body2">
                  Last Match: {profile.lastMatchDate ? new Date(profile.lastMatchDate).toLocaleDateString() : "No matches yet"}
                </Typography>
              </Box>
            </Box>
          </Paper>
          
          {/* Activity Heatmap */}
          <Paper 
        elevation={3} 
        sx={{ p: 3, borderRadius: 2 }}
        >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, mb: 3 }}>
            Activity Over the Year
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
            <CalendarHeatmap
            startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
            endDate={new Date()}
            values={getActivityData()}
            classForValue={(value) => {
                if (!value) return "color-empty";
                if (value.count >= 4) return "color-github-4";
                if (value.count >= 3) return "color-github-3";
                if (value.count >= 2) return "color-github-2";
                return "color-github-1";
            }}
            showMonthLabels={true}
            transformMonthLabels={(month) => {
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return monthNames[month];
            }}
            />
        </Box>
        </Paper>

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;