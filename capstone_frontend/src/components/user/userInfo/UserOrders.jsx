import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrdersComponent = () => {
  const orders = useSelector((state) => state.userOrders.orders);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{`${user.firstName}'s Orders`}</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNavigateBack}
        >
          Back
        </Button>
      </div>
      {orders.map((order) => (
        <Card key={order.id} style={{ marginBottom: 10 }}>
          <CardContent>
            <Typography variant="h6">
              Order Number: {order.orderNumber}
            </Typography>
            <Typography variant="body1">
              Total Price: ${order.totalPrice}
            </Typography>
            <Typography variant="body2">
              Date & Time: {new Date(order.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2">Products:</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersComponent;
