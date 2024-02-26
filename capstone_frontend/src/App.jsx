import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import GetAllProducts from "./components/products";
import GetAllUsers from "./components/GetUser";
import Login from "./components/login";
import NavBar from "./components/NavBar";
import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import Register from "./components/register";
import AccountInfo from "./components/accountInfo";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: blueGrey[700],
    },
  },
});

function App() {
  const [theme, setTheme] = useState("light");

  const handleThemeChangeApp = (isDarkMode) => {
    const newTheme = isDarkMode ? "dark" : "light";
    console.log("Theme changed to:", newTheme);
    setTheme(newTheme);
  };

  return (
    <div>
      <div>
        <NavBar onThemeChange={handleThemeChangeApp} />
      </div>
      <Routes>
        <Route path="/users" element={<GetAllUsers />} />
        <Route path="/" element={<GetAllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accountinfo" element={<AccountInfo />} />
      </Routes>
    </div>
  );
}

export default App;
