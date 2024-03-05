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
import {
  amber,
  blue,
  green,
  red,
  teal,
  deepPurple,
  grey,
  pink,
  lime,
  orange,
} from "@mui/material/colors";

const colorOptions = [
  { color: amber[500], label: "Amber" },
  { color: blue[500], label: "Blue" },
  { color: green[500], label: "Green" },
  { color: red[500], label: "Red" },
  { color: teal[500], label: "Teal" },
  { color: deepPurple[500], label: "Purple" },
  { color: grey[500], label: "Grey" },
  { color: pink[500], label: "Pink" },
  { color: lime[500], label: "Lime" },
  { color: orange[500], label: "Orange" },
];

const UserPreferences = ({ handleNext }) => {
  const [preferencesData, setPreferencesData] = useState({
    profilePic: "",
    primaryColor: amber[500],
    secondaryColor: blue[500],
  });

  const [createPreferences, { isLoading, isError }] =
    useCreateUserPreferencesMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPreferencesData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      encodeImageToBase64(file);
      setPreferencesData((prevData) => ({
        ...prevData,
        profilePic: file.name,
      }));
    }
  };

  const handleSavePreferences = async () => {
    try {
      await createPreferences({
        userId: localStorage.getItem("userId"),
        preferencesData,
      });
      localStorage.removeItem("userId");
      handleNext();
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
          <Box mt={2}>
            <TextField
              fullWidth
              name="primaryColor"
              label="Primary Color"
              value={preferencesData.primaryColor}
              onChange={handleChange}
              select
            >
              {colorOptions.map((option) => (
                <MenuItem
                  key={option.color}
                  value={option.color}
                  sx={{ backgroundColor: option.color }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              name="secondaryColor"
              label="Secondary Color"
              value={preferencesData.secondaryColor}
              onChange={handleChange}
              select
            >
              {colorOptions.map((option) => (
                <MenuItem
                  key={option.color}
                  value={option.color}
                  sx={{ backgroundColor: option.color }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button
            variant="contained"
            onClick={handleSavePreferences}
            disabled={isLoading}
            mt={2}
          >
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserPreferences;
