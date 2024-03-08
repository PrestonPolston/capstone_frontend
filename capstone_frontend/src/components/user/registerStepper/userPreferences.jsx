import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useCreateUserPreferencesMutation } from "../../../api/metalApi";
import { encodeImageToBase64 } from "../../../app/encode_decode";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
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

const UserPreferences = ({ handleNext, handleFinish }) => {
  const [primaryColor, setPrimaryColor] = useState(null);
  const [primaryShade, setPrimaryShade] = useState(500);
  const [secondaryColor, setSecondaryColor] = useState(null);
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

  const [preferencesData, setPreferencesData] = useState({
    profilePic: "",
    primaryColor: null,
    secondaryColor: null,
  });

  const handlePrimaryColorChange = (color) => {
    setPrimaryColor((prevColor) => (prevColor === color ? null : color));
  };

  const handleSecondaryColorChange = (color) => {
    setSecondaryColor((prevColor) => (prevColor === color ? null : color));
  };

  const handlePrimaryShadeChange = (event, newValue) => {
    setPrimaryShade(newValue);
  };
  const handleSecondaryShadeChange = (event, newValue) => {
    setSecondaryShade(newValue);
  };

  const [createPreferences, { isLoading, isError }] =
    useCreateUserPreferencesMutation();

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
  const handleSavePreferences = async () => {
    const primaryColorToSave = primaryColor || null;
    const secondaryColorToSave = secondaryColor || null;

    try {
      const response = await createPreferences({
        userId: localStorage.getItem("userId"),
        preferencesData: {
          primaryColor: primaryColorToSave,
          secondaryColor: secondaryColorToSave,
          profilePic: preferencesData.profilePic || null,
        },
      });

      if (response) {
        console.log(response);
        localStorage.removeItem("userId");
        handleFinish();
      }
    } catch (error) {
      console.error("Error saving user preferences:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto" }}>
      <Card variant="outlined">
        <CardContent>
          <h2>User Preferences</h2>
          <TextField
            fullWidth
            type="file"
            name="profilePic"
            label="Profile Picture"
            InputLabelProps={{ shrink: true }}
            onChange={handleFileChange}
          />
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
                  sx={{ backgroundColor: option.color, width: 50, height: 50 }}
                  onClick={() => handlePrimaryColorChange(option.color)}
                />
              </Grid>
            ))}
          </Grid>
          <h3>Secondary Color Selection:</h3>
          <Button
            variant="contained"
            sx={{ backgroundColor: secondaryColor, width: 50, height: 50 }}
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
                  sx={{ backgroundColor: option.color, width: 50, height: 50 }}
                  onClick={() => handleSecondaryColorChange(option.color)}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            onClick={handleSavePreferences}
            disabled={isLoading}
            mt={5}
          >
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserPreferences;
