import Loading from "../Loading";
import { useState } from "react";
import { useRestaurantReviews } from "@/hooks/useRestaurantReviews";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const RestaurantReviews = ({ restaurantId }) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isPending, error } = useRestaurantReviews(restaurantId, {
    page,
    limit,
  });

  if (isPending)
    return (
      <div>
        <h1 className="text-5xl font-semibold pt-20 pb-8 text-gray-800 w-full text-center">
          Reviews
        </h1>
        <Loading />
      </div>
    );
  if (error)
    return (
      <div>
        <h1 className="text-5xl font-semibold pt-20 pb-8 text-gray-800 w-full text-center">
          Reviews
        </h1>
        <p className="text-center">No reviews yet for this restaurant.</p>
      </div>
    );

  const reviews = data?.data?.data || [];
  const paginationInfo = data?.data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalReviews: 0,
    limit: 10,
  };
  const ratings = data?.data?.ratings || [];
  const avgRating = data?.data?.avgRating || 0;

  const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0);

  const ratingPercentages = [5, 4, 3, 2, 1].map((rating) => {
    const ratingData = ratings.find((r) => r._id === rating);
    return {
      label: rating,
      percentage: ratingData
        ? Math.round((ratingData.count / totalRatings) * 100)
        : 0,
    };
  });

  return (
    <div className="space-y-4 ">
      <h1 className="text-5xl font-semibold pt-20 pb-8 text-gray-800 w-full text-center">
        Reviews
      </h1>

      <div className="flex items-start space-x-8  pb-4">
        {/* Left Column: Overall Rating */}
        <div className="flex flex-col items-center mt-5 ">
          <h2 className="text-5xl font-bold text-gray-800">
            {avgRating.toFixed(1)}
          </h2>
          <div className="flex text-red-500 text-2xl mb-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={`w-6 h-6 ${
                  avgRating >= index + 1
                    ? "fill-current"
                    : avgRating >= index + 0.5
                      ? "fill-current text-red-300"
                      : "stroke-current fill-transparent"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            {paginationInfo.totalReviews} reviews
          </p>
        </div>
        {/* Right Column: Rating Bars */}
        <div className="flex-1 space-y-2">
          {ratingPercentages.map((rating) => (
            <div key={rating.label} className="flex items-center space-x-2">
              {/* Rating Number */}
              <p className="text-gray-700 font-semibold w-4 text-right">
                {rating.label}
              </p>

              {/* Progress Bar */}
              <div className="w-1/2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${rating.percentage}%` }}
                ></div>
              </div>

              {/* Percentage */}
              <p className="text-gray-500 text-sm w-8">{rating.percentage}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-gray-800">
          Customer Reviews
        </h3>
        {reviews.map((review) => (
          <div key={review._id} className="bg-white py-6 border-b">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.userId.name}`}
                />
                <AvatarFallback>{review.userId.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">
                  {review.userId.name}
                </p>
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
              Reservation: {review.reservationId.date} at{" "}
              {review.reservationId.time}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-600">
          Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
        </span>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === paginationInfo.totalPages}
          variant="outline"
          size="icon"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
export default RestaurantReviews;
