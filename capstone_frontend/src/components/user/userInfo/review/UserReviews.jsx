import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useUpdateReviewMutation } from "../../../../api/metalApi";
import { setUserReview } from "../../../../slice/userReviews";
import { useNavigate } from "react-router-dom";

const GetReviewByUser = () => {
  const userPreferences = useSelector(
    (state) => state.userPreferences.userPreferences
  );
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const userReviews = useSelector((state) => state.userReview.userReview) || [];
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [ratingValue, setRatingValue] = useState(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewContent, setReviewContent] = useState("");
  const [productId, setProductId] = useState();

  const dispatch = useDispatch();
  const [updateReviewMutation] = useUpdateReviewMutation();

  const handleDeleteReview = (reviewId) => {
    console.log("Delete review:", reviewId);
  };

  const handleEditReview = (reviewId) => {
    setSelectedReviewId(reviewId);
    const reviewToEdit = userReviews.find((review) => review.id === reviewId);
    setReviewContent(reviewToEdit.content);
    setRatingValue(reviewToEdit.rating);
    setProductId(reviewToEdit.productId);
  };

  const handleCloseEditForm = () => {
    setSelectedReviewId(null);
    setReviewContent("");
  };

  const handleUpdateReview = async () => {
    try {
      console.log(
        "Updated review content:",
        ratingValue,
        reviewContent,
        productId
      );
      const response = await updateReviewMutation({
        productId,
        reviewId: selectedReviewId,
        reviewData: {
          content: reviewContent,
          rating: ratingValue,
        },
      });
      console.log("Update Review API response:", response);
      dispatch(setUserReview(response.data));
      handleCloseEditForm();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleGoBack = () => {
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
        <div>
          <Typography variant="h4">{`${user.firstName}'s Reviews`}</Typography>
          {/* You can modify typography as needed for user's first name */}
        </div>
        <Button variant="contained" onClick={handleGoBack}>
          Back
        </Button>
      </div>

      {userReviews.length === 0 && (
        <Typography variant="h6" align="center">
          No reviews from this user.
        </Typography>
      )}

      {Array.isArray(userReviews) &&
        userReviews.map((review) => (
          <Card key={review.id} style={{ marginBottom: 10 }}>
            <CardContent style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "auto" }}>
                <Typography variant="h5">
                  Rating:
                  <Rating name="read-only" value={review.rating} readOnly />
                </Typography>
                <Typography variant="body1">{review.content}</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteReview(review.id)}
                  style={{ marginBottom: 5 }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditReview(review.id)}
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

      <Modal
        open={selectedReviewId !== null}
        onClose={handleCloseEditForm}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            padding: "1rem",
          }}
        >
          <Typography variant="h5">
            Edit Review:
            <Rating
              name="edit-rating"
              value={ratingValue}
              onChange={(event, newValue) => setRatingValue(newValue)}
            />
          </Typography>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Edit your review here"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateReview}
          >
            Update Review
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseEditForm}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default GetReviewByUser;
