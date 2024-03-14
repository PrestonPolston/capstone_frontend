import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import manageUserOrdersStorage from "../../../app/sessionStorage/userOrdersStorage";
import { decodeBase64Image } from "../../../app/encode_decode";

const OrdersComponent = () => {
  const userOrders = useSelector((state) => {
    if (state.userOrders > 0) {
      return state.userOrders;
    } else {
      return manageUserOrdersStorage.retrieveFromSessionStorage("userOrders");
    }
  });

  const productList = useSelector((state) => state.products.productList);

  const fetchedUserData = useSelector(
    (state) => state.user?.user || state.user
  );

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
        <h2>{`${fetchedUserData?.firstName}'s Orders`}</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNavigateBack}
        >
          Back
        </Button>
      </div>
      {userOrders && userOrders.length > 0 ? (
        userOrders.map((order) => (
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
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {order.products.map((productOrder) => {
                  const product = productList.find(
                    (p) => p.id === productOrder.id
                  );
                  if (product) {
                    return (
                      <div key={product.id} style={{ margin: 10 }}>
                        <img
                          src={decodeBase64Image(product.image)}
                          alt={product.name}
                          style={{ width: 50, height: 50 }}
                        />
                        <Typography>{product.name}</Typography>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No orders found.</Typography>
      )}
    </div>
  );
};

export default OrdersComponent;
