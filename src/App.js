import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { ThemeModeProvider } from "./theme/ThemeContext";

function App() {
  const dummyLoggedIn = false;
  const dummyProfilePic = "https://i.pravatar.cc/40";

  return (
    <ThemeModeProvider>
      <Header loggedIn={dummyLoggedIn} profilePic={dummyProfilePic} />
      <Home />
    </ThemeModeProvider>
  );
}

export default App;