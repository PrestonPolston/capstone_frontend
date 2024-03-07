import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Grid,
  Slider,
} from "@mui/material";
import { TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import {
  encodeImageToBase64,
  decodeBase64Image,
} from "../../../app/encode_decode";
import { setUserPreferences } from "../../../slice/userPreferencesSlice";
import { useDispatch } from "react-redux";
import {
  amber,
  indigo,
  blue,
  lightBlue,
  cyan,
  green,
  lightGreen,
  lime,
  yellow,
  red,
  teal,
  deepPurple,
  grey,
  pink,
  orange,
  deepOrange,
  brown,
  blueGrey,
} from "@mui/material/colors";
import { useUpdateUserPreferencesMutation } from "../../../api/metalApi";

const EditUserPreferences = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [value, setValue] = useState(0);
  const [primaryColor, setPrimaryColor] = useState(blue);
  const [primaryShade, setPrimaryShade] = useState(500);
  const [secondaryColor, setSecondaryColor] = useState(blue);
  const [secondaryShade, setSecondaryShade] = useState(500);

  const primaryColorOptions = [
    { color: amber[primaryShade], label: "Amber", key: "amber" },
    { color: indigo[primaryShade], label: "Indigo", key: "indigo" },
    { color: blue[primaryShade], label: "Blue", key: "blue" },
    { color: lightBlue[primaryShade], label: "Light Blue", key: "lightBlue" },
    { color: cyan[primaryShade], label: "Cyan", key: "cyan" },
    { color: green[primaryShade], label: "Green", key: "green" },
    {
      color: lightGreen[primaryShade],
      label: "Light Green",
      key: "lightGreen",
    },
    { color: lime[primaryShade], label: "Lime", key: "lime" },
    { color: yellow[primaryShade], label: "Yellow", key: "yellow" },
    { color: red[primaryShade], label: "Red", key: "red" },
    { color: teal[primaryShade], label: "Teal", key: "teal" },
    {
      color: deepPurple[primaryShade],
      label: "Deep Purple",
      key: "deepPurple",
    },
    { color: grey[primaryShade], label: "Grey", key: "grey" },
    { color: pink[primaryShade], label: "Pink", key: "pink" },
    { color: orange[primaryShade], label: "Orange", key: "orange" },
    {
      color: deepOrange[primaryShade],
      label: "Deep Orange",
      key: "deepOrange",
    },
    { color: brown[primaryShade], label: "Brown", key: "brown" },
    { color: blueGrey[primaryShade], label: "Blue Grey", key: "blueGrey" },
  ];

  const secondaryColorOptions = [
    { color: amber[secondaryShade], label: "Amber", key: "amber" },
    { color: indigo[secondaryShade], label: "Indigo", key: "indigo" },
    { color: blue[secondaryShade], label: "Blue", key: "blue" },
    { color: lightBlue[secondaryShade], label: "Light Blue", key: "lightBlue" },
    { color: cyan[secondaryShade], label: "Cyan", key: "cyan" },
    { color: green[secondaryShade], label: "Green", key: "green" },
    {
      color: lightGreen[secondaryShade],
      label: "Light Green",
      key: "lightGreen",
    },
    { color: lime[secondaryShade], label: "Lime", key: "lime" },
    { color: yellow[secondaryShade], label: "Yellow", key: "yellow" },
    { color: red[secondaryShade], label: "Red", key: "red" },
    { color: teal[secondaryShade], label: "Teal", key: "teal" },
    {
      color: deepPurple[secondaryShade],
      label: "Deep Purple",
      key: "deepPurple",
    },
    { color: grey[secondaryShade], label: "Grey", key: "grey" },
    { color: pink[secondaryShade], label: "Pink", key: "pink" },
    { color: orange[secondaryShade], label: "Orange", key: "orange" },
    {
      color: deepOrange[secondaryShade],
      label: "Deep Orange",
      key: "deepOrange",
    },
    { color: brown[secondaryShade], label: "Brown", key: "brown" },
    { color: blueGrey[secondaryShade], label: "Blue Grey", key: "blueGrey" },
  ];

  const userPreferences = useSelector(
    (state) => state.userPreferences.userPreferences
  );

  const [preferencesData, setPreferencesData] = useState({
    profilePic: userPreferences.profilePic,
    primaryColor: userPreferences.primaryColor,
    secondaryColor: userPreferences.secondaryColor,
  });

  const handlePrimaryColorChange = (color) => {
    setPrimaryColor(color);
  };

  const handleSecondaryColorChange = (color) => {
    setSecondaryColor(color);
  };

  const handlePrimaryShadeChange = (event, newValue) => {
    setPrimaryShade(newValue);
  };

  const handleSecondaryShadeChange = (event, newValue) => {
    setSecondaryShade(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const CustomTabPanel = ({ children, value, index }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );

  const [updateUserPreferences] = useUpdateUserPreferencesMutation();
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64Image = await encodeImageToBase64(file);
      setPreferencesData((prevData) => ({
        ...prevData,
        profilePic: base64Image,
      }));
    }
  };
  const dispatch = useDispatch();
  const handleUpload = () => {
    updateUserPreferences({
      userId: userPreferences.userId,
      preferencesData: {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        profilePic: preferencesData.profilePic,
      },
    })
      .then((response) => {
        console.log("User preferences updated successfully");
        if (response) {
          alert("User preferences updated successfully");
          dispatch(
            setUserPreferences({
              userId: userPreferences.userId,
              primaryColor: primaryColor,
              secondaryColor: secondaryColor,
              profilePic: preferencesData.profilePic,
            })
          );
        }
      })
      .catch((error) => {
        console.error("Error updating user preferences:", error);
        alert("Failed to update user preferences");
      });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            width: "70%",
            textAlign: "center",
            padding: "20px",
            margin: "auto",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Profile Picture" />
                <Tab label="Primary Color" />
                <Tab label="Secondary Color" />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Typography variant="h5">Profile Picture</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {userPreferences.profilePic ? (
                  <Avatar
                    alt="Profile Picture"
                    src={decodeBase64Image(userPreferences.profilePic)}
                    sx={{ width: 150, height: 150 }}
                  />
                ) : (
                  <AccountCircle style={{ fontSize: 150 }} />
                )}
                <TextField
                  fullWidth
                  type="file"
                  name="profilePic"
                  label={selectedFile ? selectedFile.name : "Profile Picture"}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleFileChange}
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    style={{ width: 150, height: 150 }}
                  />
                )}
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <Box>
                <h3>Primary Color Selection:</h3>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: primaryColor, width: 50, height: 50 }}
                />
                <Slider
                  value={primaryShade}
                  min={100}
                  max={900}
                  step={100}
                  onChange={handlePrimaryShadeChange}
                />
                <Grid container spacing={0}>
                  {primaryColorOptions.map((option) => (
                    <Grid item key={option.key}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: option.color,
                          width: 50,
                          height: 50,
                        }}
                        onClick={() => handlePrimaryColorChange(option.color)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Box>
                <h3>Secondary Color Selection:</h3>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: secondaryColor,
                    width: 50,
                    height: 50,
                  }}
                />
                <Slider
                  value={secondaryShade}
                  min={100}
                  max={900}
                  step={100}
                  onChange={handleSecondaryShadeChange}
                />
                <Grid container spacing={0}>
                  {secondaryColorOptions.map((option) => (
                    <Grid item key={option.key}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: option.color,
                          width: 50,
                          height: 50,
                        }}
                        onClick={() => handleSecondaryColorChange(option.color)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </CustomTabPanel>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button variant="contained" onClick={handleUpload}>
                Save Preferences
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default EditUserPreferences;
