import React, { useState } from "react";
import { decodeBase64Image } from "../../app/encode_decode";
import { useGetProductQuery } from "../../api/metalApi";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import InfoTab from "./TabSingleProduct";

const SingleProduct = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { id } = useParams();
  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
  } = useGetProductQuery(id);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (product) => {
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {productLoading && <p>Loading product data...</p>}
      {productError && <p>Error loading product data.</p>}
      {productData && (
        <div style={{ width: "100%", marginBottom: 20 }}>
          <Card
            style={{
              width: "60%",
              margin: "0 auto",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <CardMedia
              component="img"
              height="450"
              image={decodeBase64Image(productData.image)}
              alt={productData.name}
              style={{
                width: "300px",
                height: "300px",
                margin: "0 auto",
                marginBottom: "10px",
              }}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {productData.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Price: ${productData.price}
              </Typography>
              <Select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ margin: "10px 0" }}
              >
                {[...Array(productData.quantity).keys()].map((value) => (
                  <MenuItem key={value + 1} value={value + 1}>
                    {value + 1}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(productData)}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      <InfoTab
        productData={productData}
        showReviewForm={showReviewForm}
        setShowReviewForm={setShowReviewForm}
      />
    </div>
  );
};

export default SingleProduct;
