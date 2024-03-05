import React, { useState } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useCreateUserInformationMutation } from "../../../api/metalApi";

const UserAddress = ({ handleNext }) => {
  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [createInformation, { isLoading, isError }] =
    useCreateUserInformationMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextButtonClick = async () => {
    try {
      const storedUserId = localStorage.getItem("userId");
      const userData = { ...addressData };
      await createInformation({ userId: storedUserId, userData });
      handleNext();
    } catch (error) {
      console.error("Error creating user information:", error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Card variant="outlined" sx={{ marginTop: 4, padding: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              User Address
            </Typography>
            <TextField
              required
              fullWidth
              name="address"
              label="Address"
              value={addressData.address}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              name="city"
              label="City"
              value={addressData.city}
              onChange={handleChange}
            />
            <TextField
              required
              name="state"
              label="State"
              value={addressData.state}
              onChange={handleChange}
            />
            <TextField
              name="postalCode"
              label="Postal Code"
              value={addressData.postalCode}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              name="country"
              label="Country"
              value={addressData.country}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              onClick={handleNextButtonClick}
              disabled={isLoading}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserAddress;
