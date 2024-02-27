import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import GetAllProducts from "./components/products";
import GetAllUsers from "./components/GetUser";
import Login from "./components/login";
import NavBar from "./components/NavBar";
import Register from "./components/register";
import AccountInfo from "./components/accountInfo";
import SingleProduct from "./components/SingleProduct";
import { useSelector } from "react-redux";
import CartIcon from "./components/CartIcon";
import Cart from "./components/Cart";

function App() {
  const darkMode = useSelector((state) => state.theme.darkTheme);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#9c27b0" : "#1976d2",
      },
      background: {
        default: darkMode ? "#222" : "#fff",
      },
      text: {
        primary: darkMode ? "#fff" : "#111111",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
    spacing: 8,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          paddingTop: "64px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/users" element={<GetAllUsers />} />
          <Route path="/" element={<GetAllProducts />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accountinfo" element={<AccountInfo />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <CartIcon />
      </div>
    </ThemeProvider>
  );
}

export default App;
