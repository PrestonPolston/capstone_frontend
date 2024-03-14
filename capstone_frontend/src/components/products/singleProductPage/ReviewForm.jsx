import React, { useState } from "react";
import { Dialog, TextField, Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useCreateReviewMutation } from "../../../api/metalApi";

const ReviewForm = ({ productId, onClose }) => {
  const [rating, setRating] = useState(null);
  const userId = localStorage.getItem("userId");
  const [addReview] = useCreateReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.elements["review-content"].value;

    const reviewData = {
      content: content,
      rating: rating,
      userId: Number(userId),
    };

    try {
      const response = await addReview({ productId, reviewData });
      const newReview = response.data;

      console.log("Review submitted successfully", newReview);
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div style={{ padding: 20 }}>
          <Typography component="legend">Your Rating:</Typography>
          <Rating
            name="product-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
          <TextField
            label="Write your review"
            name="review-content"
            autoFocus
            multiline
            fullWidth
            style={{ marginTop: 10 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
          >
            Submit Review
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default ReviewForm;
