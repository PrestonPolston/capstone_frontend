import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import GetAllProducts from "./components/products";
import GetAllUsers from "./components/user/GetUser";
import Login from "./components/user/login";
import NavBar from "./components/NavBar";
import Register from "./components/user/registerStepper/register";
import AccountInfo from "./components/user/accountInfo";
import SingleProduct from "./components/singleProductPage/SingleProduct";
import UserStepper from "./components/user/registerStepper/UserStepper";
import { useSelector } from "react-redux";
import CartIcon from "./components/cart/CartIcon";
import Cart from "./components/cart/Cart";
import Checkout from "./components/cart/checkout/Checkout";
import { setUserPreferences } from "./slice/userPreferencesSlice"; // Import the action to set user preferences

function App() {
  const darkMode = useSelector((state) => state.theme.darkTheme);
  const userPreferences = useSelector(
    (state) => state.userPreferences.preferences
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: userPreferences.primaryColor || "#1976d2",
      },
      background: {
        default: darkMode ? "#222" : userPreferences.secondaryColor || "#fff",
      },
      text: {
        primary: darkMode ? "#fff" : "#111",
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
          <Route path="/register" element={<UserStepper />} />
          <Route path="/accountInfo" element={<AccountInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <CartIcon />
      </div>
    </ThemeProvider>
  );
}

export default App;
