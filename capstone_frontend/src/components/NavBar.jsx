import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import Switch from "@mui/material/Switch";
import { Menu, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../slice/themeSlice";
import { useLogoutUserMutation } from "../api/metalApi";

const NavBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const userId = localStorage.getItem("userId");
  const [logoutUser] = useLogoutUserMutation();
  const [id, setId] = useState(localStorage.getItem("userId"));

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setId(storedUserId);
  }, [location]);

  const handleLogout = async () => {
    try {
      const Id = localStorage.getItem("userId");
      await logoutUser({ Id });
      handleClose();
      localStorage.removeItem("userId");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <div sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              color="inherit"
              aria-label="search"
              sx={{ mr: 1 }}
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {userId ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="account of current user"
              onClick={handleClick}
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <div>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  marginRight: "1rem",
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign up
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <List>
          <ListItem button onClick={toggleMenu}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Products
            </Link>
          </ListItem>
        </List>
        <Box sx={{ mt: "auto", p: 2 }}>
          <Typography variant="h6">Theme</Typography>
          <Switch checked={darkTheme} onChange={handleThemeChange} />
        </Box>
      </Drawer>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ zIndex: 1500 }}
      >
        <MenuItem component={Link} to="/accountinfo" onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
