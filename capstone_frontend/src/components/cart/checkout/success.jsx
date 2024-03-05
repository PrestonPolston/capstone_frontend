import * as React from "react";
import Typography from "@mui/material/Typography";

const Success = ({ orderNumber }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Successfully Placed
      </Typography>
      <Typography gutterBottom>
        Your order has been successfully placed. Order Number: {orderNumber}
      </Typography>
    </>
  );
};

export default Success;
