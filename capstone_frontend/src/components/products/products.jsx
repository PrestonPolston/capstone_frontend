import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../api/metalApi";
import { decodeBase64Image } from "../../app/encode_decode";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slice/cartSlice";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const GetAllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const { data: productsData } = useGetProductsQuery();

  const handleAddToCart = (product, quantity) => {
    try {
      dispatch(addToCart({ product, quantity }));
      console.log(`${quantity}, ${product.name} added to cart successfully!`);
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
                boxShadow: "0 4px 8px rgba(0, 0, 0, .8)",
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
                  <Select
                    value={quantities[product.id] || 1}
                    onChange={(e) => updateQuantity(product.id, e.target.value)}
                    style={{ margin: "10px 0", width: "75px", height: "30px" }}
                    MenuProps={{
                      PaperProps: { style: { maxHeight: 160, width: "auto" } },
                    }}
                  >
                    {[...Array(product.quantity).keys()].map((value) => (
                      <MenuItem key={value + 1} value={value + 1}>
                        {value + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleAddToCart(product, quantities[product.id] || 1)
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
