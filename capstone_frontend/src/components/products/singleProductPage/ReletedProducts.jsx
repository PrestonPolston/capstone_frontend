import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { decodeBase64Image } from "../../../app/encode_decode";
import { useGetProductsQuery } from "../../../api/metalApi";

const RelatedProducts = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const navigate = useNavigate();

  const handleMoreDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    if (products) {
      console.log("All Products:", products);
    }
  }, [products]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products.</p>;
  }

  return (
    <div>
      {products.map((product) => (
        <Card key={product.id} style={{ display: "flex" }}>
          <CardMedia
            component="img"
            height="100"
            width="100"
            image={decodeBase64Image(product.image)}
            alt={product.name}
            style={{ width: "100px", height: "100px", marginRight: "16px" }}
          />
          <CardContent
            style={{ display: "flex", alignItems: "flex-start", flex: "1" }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${product.price}
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleMoreDetails(product.id)}
              >
                More Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RelatedProducts;
