import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = ({ loggedIn, setLoggedIn, profilePic }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
          Badmintify
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {loggedIn ? (
            <>
              <Avatar src={profilePic} alt="profile" />
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;