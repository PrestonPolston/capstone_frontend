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
import { Menu, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../slice/themeSlice";
import { useLogoutUserMutation } from "../api/metalApi";
import { decodeBase64Image } from "../app/encode_decode";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const user = useSelector((state) => state.user?.user || state.user);
  const productList = useSelector((state) => state.products.productList);
  const [logoutUser] = useLogoutUserMutation();

  const userPreferences = useSelector(
    (state) => state.userPreferences?.userPreferences || state.userPreferences
  );

  const profilePic = userPreferences?.profilePic;

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

  const handleLogout = async () => {
    try {
      await logoutUser();
      handleClose();
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("userPreferences");
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("userOrders");
      sessionStorage.removeItem("userReview");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const productListArray =
    typeof productList === "object" && Array.isArray(productList)
      ? productList
      : [];
  const classes = Array.from(
    new Set(productListArray.map((product) => product.class))
  );

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
          {user.id ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="account of current user"
              onClick={handleClick}
            >
              {profilePic ? (
                <img
                  src={decodeBase64Image(profilePic)}
                  alt="Profile"
                  style={{ borderRadius: "50%", width: 40, height: 40 }}
                />
              ) : (
                <AccountCircle />
              )}
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
          {classes.map((classItem) => (
            <ListItem key={classItem} button onClick={toggleMenu}>
              <Link
                to={`/products/${classItem}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {classItem}
              </Link>
            </ListItem>
          ))}
          <ListItem
            button
            onClick={toggleMenu}
            style={{ display: user.id ? "block" : "none" }}
          >
            <Link
              to="/userInfo"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              User Info
            </Link>
          </ListItem>
          <ListItem
            button
            onClick={toggleMenu}
            style={{ display: user.id ? "block" : "none" }}
          >
            <Link
              to="/updateLogin"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Update Login Info
            </Link>
          </ListItem>
          <ListItem
            button
            onClick={toggleMenu}
            style={{ display: user.id ? "block" : "none" }}
          >
            <Link
              to="/editpreferences"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Edit Preferences
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
