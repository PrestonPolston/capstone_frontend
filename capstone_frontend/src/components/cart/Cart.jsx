import { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { decodeBase64Image } from "../../app/encode_decode";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../../slice/cartSlice";
import { updateQuantity } from "../../slice/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleRemoveFromCart = (itemId) => {
    console.log(itemId);
    dispatch(removeFromCart({ id: itemId }));
  };

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (itemId, quantityStr) => {
    const quantity = parseInt(quantityStr, 10);
    dispatch(updateQuantity({ id: itemId, quantity: quantity }));
  };

  useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "0 20px",
        }}
      >
        <Typography variant="h4" style={{ margin: "0 auto" }}>
          Your Cart
        </Typography>

        <Button variant="contained" color="primary" onClick={handleBack}>
          Back
        </Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <Card
              key={item.product.id}
              style={{ width: "45%", margin: "10px", display: "flex" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={decodeBase64Image(item.product.image)}
                alt={item.product.name}
                style={{ maxWidth: "100px", margin: "auto" }}
              />
              <CardContent
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" component="div">
                  {item.product.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Price: ${item.product.price}
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Select
                    value={quantities[item.product.id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(item.product.id, e.target.value)
                    }
                    style={{ margin: "10px 0" }}
                  >
                    {[...Array(10).keys()].map((value) => (
                      <MenuItem key={value + 1} value={value + 1}>
                        {value + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveFromCart(item.product.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
    </div>
  );
};

export default Cart;