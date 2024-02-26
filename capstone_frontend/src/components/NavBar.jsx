import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (event) => {
    event.preventDefault();
    const isDarkMode = event.target.checked;
    console.log("Dark mode enabled:", isDarkMode);
    return isDarkMode;
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
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="account of current user"
            onClick={handleClick}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <List>
          <ListItem button onClick={toggleMenu}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Products
            </Link>
          </ListItem>
          <ListItem button onClick={toggleMenu}>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </ListItem>
          <ListItem button onClick={toggleMenu}>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Signup
            </Link>
          </ListItem>
        </List>
        <Box sx={{ mt: "auto", p: 2 }}>
          <Typography variant="h6">Theme</Typography>
          <Switch onChange={handleThemeChange} />
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
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
