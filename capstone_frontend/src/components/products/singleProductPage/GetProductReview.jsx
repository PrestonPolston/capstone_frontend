import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Modal,
  Paper,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ReviewForm from "./ReviewForm";
import { useGetReviewQuery } from "../../../api/metalApi";

const GetProductReview = ({ productId }) => {
  const {
    data: reviews,
    error: reviewsError,
    isLoading: reviewsLoading,
  } = useGetReviewQuery({ productId });

  const [open, setOpen] = useState(false);

  const handleReviewForm = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
    handleClose();
  };

  return (
    <div>
      <div>
        <Button variant="contained" onClick={handleReviewForm}>
          Write A Review
        </Button>
      </div>

      {reviewsLoading && <p>Loading reviews...</p>}
      {reviewsError && <p>Error loading reviews.</p>}
      {reviews && (
        <div style={{ width: "100%", marginTop: 20 }}>
          {reviews.map((review) => (
            <Card
              key={review.id}
              style={{
                marginBottom: 10,
                width: "100%",
                backgroundColor: "primary",
              }}
            >
              <CardContent>
                <Typography variant="body1">{review.content}</Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <Typography variant="subtitle2">Rating: </Typography>
                  {Array.from({ length: review.rating }, (_, index) => (
                    <StarIcon key={index} style={{ color: "#FFD700" }} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal open={open} onClose={handleClose} disableBackdropClick>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Write a Review</Typography>
          <Paper>
            <Box p={2}>
              <ReviewForm
                productId={productId}
                onClose={handleClose}
                onReviewSubmit={handleReviewSubmit}
              />
            </Box>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};

export default GetProductReview;
