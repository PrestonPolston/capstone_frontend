import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetProductsQuery,
  useGetUserQuery,
  useAddToCartMutation,
} from "../api/metalApi";
import { decodeBase64Image } from "../app/encode_decode";
import { useDispatch } from "react-redux";
import { addToCart } from "../slice/cartSlice";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const GetAllProducts = () => {
  const dispatch = useDispatch();
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId");
  const {
    data: userResponse,
    error: userError,
    isLoading: userLoading,
  } = useGetUserQuery(userId);
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [addCart] = useAddToCartMutation();

  useEffect(() => {
    if (productsData) {
      const initialQuantities = Object.fromEntries(
        productsData.map((product) => [product.id, 1])
      );
      setQuantities(initialQuantities);
    }
  }, [productsData]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      console.log(userId);
      const response = await addToCart({ userId, productId, quantity });
      dispatch(addToCart(response.data));
      console.log("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleMoreDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const updateQuantity = (id, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {productsData && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {productsData.map((product) => (
            <Card
              key={product.id}
              style={{
                width: "45%",
                margin: 10,
                boxShadow: "0 4px 8px rgba(0, 0, 0, .6)",
              }}
            >
              <CardMedia
                component="img"
                height="450"
                image={decodeBase64Image(product.image)}
                alt={product.name}
              />
              <CardContent style={{ textAlign: "center" }}>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        Math.max(1, quantities[product.id] - 1)
                      )
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    type="number"
                    value={quantities[product.id] || 1}
                    onChange={(e) =>
                      updateQuantity(
                        product.id,
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    InputProps={{
                      inputProps: { min: 1 },
                      style: { height: 30, width: 60 },
                    }}
                  />
                  <IconButton
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        quantities[product.id] ? quantities[product.id] + 1 : 2
                      )
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleAddToCart(product.id, quantities[product.id] || 1)
                  }
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleMoreDetails(product.id)}
                >
                  More Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllProducts;
