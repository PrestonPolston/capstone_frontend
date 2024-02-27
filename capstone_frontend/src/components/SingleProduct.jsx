import React from "react";
import { decodeBase64Image } from "../app/encode_decode";
import { useGetProductQuery } from "../api/metalApi";
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
import { useParams, useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: productData, error, isLoading } = useGetProductQuery(id);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    console.log(`Added 1 ${product.name} to cart`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: "45%", margin: 10 }}>
        {productData && (
          <>
            <CardMedia
              component="img"
              height="450"
              image={decodeBase64Image(productData.image)}
              alt={productData.name}
            />
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h6" component="div">
                {productData.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Price: ${productData.price}
              </Typography>
              <IconButton>
                <RemoveIcon />
              </IconButton>
              <TextField
                type="number"
                value={1}
                InputProps={{ style: { height: 30, width: 80 } }}
              />
              <IconButton>
                <AddIcon />
              </IconButton>
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
          </>
        )}
      </Card>
    </div>
  );
};

export default SingleProduct;
