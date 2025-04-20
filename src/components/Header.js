import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";

const Header = ({ loggedIn, profilePic }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Badmintify</Typography>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {loggedIn ? (
            <Avatar src={profilePic} alt="profile" />
          ) : (
            <>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Sign Up</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
