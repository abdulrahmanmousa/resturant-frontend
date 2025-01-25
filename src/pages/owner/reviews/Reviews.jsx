import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect } from "react";
import api from "../../../lib/apiInstance"; // Your API instance
import Layout from "../../../components/layout/layout";
import useAuthStore from "../../../store/auth-store";
import PageLoading from "../../../components/PageLoading";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reservationId: "",
    comment: "",
    rate: 0,
  });
  const [replyToReview, setReplyToReview] = useState(null); // For updating reviews
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  // Fetch Reviews
  useEffect(() => {
    api
      .get("/reviews/restaurant/" + user?.restaurant)
      .then((response) => {
        console.log(response.data);
        setReviews(response.data.data); // Assuming `reviews` is the key in the response
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching reviews:",
          error.response?.data || error.message,
        );
        setLoading(false);
      });
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  // Add Review
  const handleAddReview = (e) => {
    e.preventDefault();

    api
      .post("/reviews/create", newReview, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setReviews([...reviews, response.data.review]); // Add the new review to the list
        setNewReview({ reservationId: "", comment: "", rate: 0 }); // Reset the form
        alert("Review added successfully!");
      })
      .catch((error) => {
        console.error(
          "Error adding review:",
          error.response?.data || error.message,
        );
        alert("Failed to add review. Please try again.");
      });
  };

  // Update Review (Rate Only)
  const handleUpdateReview = (reviewId, newRate) => {
    api
      .put(`/reviews/update/${reviewId}`, { rate: newRate })
      .then((response) => {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId ? { ...review, rate: newRate } : review,
          ),
        );
        setReplyToReview(null); // Clear edit state
        alert("Review updated successfully!");
      })
      .catch((error) => {
        console.error(
          "Error updating review:",
          error.response?.data || error.message,
        );
        alert("Failed to update review. Please try again.");
      });
  };
  console.log(reviews);

  if (loading) {
    return (
      <Layout>
        <PageLoading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Reviews</h1>

        <div>
          {reviews?.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            <ul className="space-y-4">
              {reviews?.map((review) => (
                <ReviewCard
                  review={review}
                  setReplyToReview={setReplyToReview}
                  replyToReview={replyToReview}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const ReviewCard = ({ review, setReplyToReview, replyToReview }) => {
  return (
    <div className="bg-white py-6 border-b">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.userId.name}`}
          />
          <AvatarFallback>{review.userId.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-800">{review.userId.name}</p>
          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < review.rate
                ? "text-red-500 fill-current"
                : "text-gray-300 stroke-current"
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700">{review.comment}</p>
      <div className="mt-4 text-sm text-gray-500">
        Reservation: {review.reservationId.date} at {review.reservationId.time}
      </div>
      <button
        onClick={() => setReplyToReview(review)}
        className="text-red-500 mt-4"
      >
        Reply
      </button>
      {replyToReview?._id === review._id && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateReview(review._id, replyToReview.rate);
          }}
          className="mt-4"
        >
          <textarea
            name="reply"
            value={replyToReview.reply}
            onChange={(e) =>
              setReplyToReview({ ...replyToReview, reply: e.target.value })
            }
            className="border p-2 mb-2 w-full"
            placeholder="Reply to review..."
            required
          />
          <button
            type="button"
            onClick={() => setReplyToReview(null)}
            className="bg-white border  px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reply
          </button>
        </form>
      )}
    </div>
  );
};
