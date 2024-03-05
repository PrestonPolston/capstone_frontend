import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useGetUserQuery } from "../../../api/metalApi";
import { useSelector } from "react-redux";

const Review = () => {
  const userId = localStorage.getItem("userId");
  const userData = useGetUserQuery(userId);

  const cartData = useSelector((state) => state.cart);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  useEffect(() => {
    if (userData) {
      setAddress(userData.address);
      setPayment(userData.payment);
    }
  }, [userData]);

  const totalPrice = cartData
    ? cartData.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    : 0;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cartData.map((item) => (
          <ListItem key={item.product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={item.product.name}
              secondary={`Quantity: ${item.quantity} - ${item.product.description}`}
            />
            <Typography variant="body2">${item.product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment Details
          </Typography>
          <Typography gutterBottom>{payment}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
