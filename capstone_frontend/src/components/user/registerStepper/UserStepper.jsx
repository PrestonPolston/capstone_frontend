import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Register from "./register";
import UserAddress from "./UserAddress";
import UserPreferences from "./userPreferences";
import { useNavigate } from "react-router-dom";

const steps = ["Register", "User Information", "User Preferences"];

const UserStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleFinish = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ width: "100%", marginBottom: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {activeStep === 0 && (
          <Register handleNext={handleNext}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Register>
        )}
        {activeStep === 1 && (
          <UserAddress handleNext={handleNext}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </UserAddress>
        )}
        {activeStep === 2 && (
          <UserPreferences handleNext={handleFinish}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFinish}
              >
                Finish
              </Button>
            </Box>
          </UserPreferences>
        )}
      </Box>
    </Box>
  );
};

export default UserStepper;
