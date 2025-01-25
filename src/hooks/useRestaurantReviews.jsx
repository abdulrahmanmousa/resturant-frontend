import api from "@/lib/apiInstance";
import { useQuery } from "@tanstack/react-query";

async function fetchReviews(restaurantId, { page, limit }) {
  const response = await api.get(
    `/reviews/restaurant/${restaurantId}?page=${page}&limit=${limit}`,
  );
  return response;
}

export function useRestaurantReviews(restaurantId, { page, limit }) {
  return useQuery({
    queryKey: ["restaurantReviews", restaurantId, page, limit],
    queryFn: () => fetchReviews(restaurantId, { page, limit }),
    keepPreviousData: true,
    retry: 1,
  });
}
