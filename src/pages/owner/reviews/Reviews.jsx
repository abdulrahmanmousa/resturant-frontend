import React, { useState, useEffect } from "react";
import api from "../../../lib/apiInstance"; // Your API instance
import Layout from "../../../components/layout/layout";

// export default function Reviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Reviews for the Owner
//   useEffect(() => {
//     api
//       .get("/reviews", {
//         headers: {
//           token: localStorage.getItem("token"), // Include token in headers
//         },
//       })
//       .then((response) => {
//         setReviews(response.data.reviews); // Assuming `reviews` is the key in the response
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(
//           "Error fetching reviews:",
//           error.response?.data || error.message
//         );
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading reviews...</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Owner Reviews</h1>

//       {/* Review List */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
//         {reviews.length === 0 ? (
//           <p>No reviews found for your restaurant(s).</p>
//         ) : (
//           <ul className="space-y-4">
//             {reviews.map((review) => (
//               <li key={review._id} className="p-4 border rounded shadow">
//                 <h3 className="font-bold text-lg">
//                   Reservation ID: {review.reservationId}
//                 </h3>
//                 <p className="text-gray-600">Comment: {review.comment}</p>
//                 <p className="text-gray-600">Rate: {review.rate}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reservationId: "",
    comment: "",
    rate: 0,
  });
  const [editReview, setEditReview] = useState(null); // For updating reviews
  const [loading, setLoading] = useState(true);

  // Fetch Reviews
  useEffect(() => {
    api
      .get("/reviews")
      .then((response) => {
        setReviews(response.data.reviews); // Assuming `reviews` is the key in the response
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching reviews:",
          error.response?.data || error.message
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
          error.response?.data || error.message
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
            review._id === reviewId ? { ...review, rate: newRate } : review
          )
        );
        setEditReview(null); // Clear edit state
        alert("Review updated successfully!");
      })
      .catch((error) => {
        console.error(
          "Error updating review:",
          error.response?.data || error.message
        );
        alert("Failed to update review. Please try again.");
      });
  };

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Reviews</h1>

        {/* Add New Review */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
          <form onSubmit={handleAddReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Reservation ID
              </label>
              <input
                type="text"
                name="reservationId"
                value={newReview.reservationId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Comment</label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium">Rate</label>
              <input
                type="number"
                name="rate"
                value={newReview.rate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min="1"
                max="5"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Review
            </button>
          </form>
        </div>

        {/* Review List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review._id} className="p-4 border rounded shadow">
                  <h3 className="font-bold text-lg">
                    Reservation ID: {review.reservationId}
                  </h3>
                  <p>{review.comment}</p>
                  <p className="text-gray-600">Rate: {review.rate}</p>
                  <button
                    onClick={() => setEditReview(review)}
                    className="text-blue-500 mr-4"
                  >
                    Edit Rate
                  </button>
                  {editReview?._id === review._id && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateReview(review._id, editReview.rate);
                      }}
                      className="mt-4"
                    >
                      <input
                        type="number"
                        name="rate"
                        value={editReview.rate}
                        onChange={(e) =>
                          setEditReview({ ...editReview, rate: e.target.value })
                        }
                        className="border p-2 mb-2 w-full"
                        placeholder="Edit rate"
                        min="1"
                        max="5"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
