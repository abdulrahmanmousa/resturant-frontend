import PageLoading from "@/components/PageLoading";
import { useEffect, useState } from "react";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User, Calendar, Clock, Utensils } from "lucide-react";
import Layout from "@/components/layout/layout";
import api from "@/lib/apiInstance";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const restaurantId = JSON.parse(localStorage.getItem("user")).restaurant;

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get(
        `/reservations/restaurant/${restaurantId}`,
        {
          headers: {
            restaurantId: restaurantId,
            token: localStorage.getItem("token"),
          },
        },
      );
      setReservations(response.data.reservations);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching reservations:",
        error.response?.data || error.message,
      );
      setLoading(false);
    }
  };

  const updateStatus = async (reservationId, newStatus) => {
    try {
      await api.patch(
        `/reservations/status/${reservationId}`,
        { status: newStatus },
        {
          headers: {
            restaurantId: restaurantId,
            token: localStorage.getItem("token"),
          },
        },
      );
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === reservationId
            ? { ...reservation, status: newStatus }
            : reservation,
        ),
      );
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message,
      );
      alert("Failed to update status. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "reserved":
        return "bg-green-500";
      case "canceled":
        return "bg-red-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-100";
    }
  };

  if (loading) {
    return (
      <Layout>
        <PageLoading />
      </Layout>
    );
  }

  const cardStyles = {
    reserved: "bg-green-100",
    canceled: "bg-red-100",
    completed: "bg-gray-50",
  };
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Reservation Management</h1>
        {reservations.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">
            No reservations found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <Card key={reservation._id} className="overflow-hidden">
                <CardHeader className={cardStyles[reservation.status]}>
                  <CardTitle className="flex justify-between items-center">
                    <span>Table #{reservation.tableId.tableNumber}</span>
                    <Badge className={getStatusColor(reservation.status)}>
                      {reservation.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{reservation.userId.name}</p>
                        <p className="text-sm text-gray-500">
                          {reservation.userId.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <p>{moment(reservation.date).format("MMMM Do, YYYY")}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <p>{reservation.time}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Utensils className="w-5 h-5 text-gray-500" />
                      <p>Capacity: {reservation.tableId.capacity}</p>
                    </div>
                    {reservation.mealId?.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-medium">Meals:</p>
                        {reservation.mealId.map((meal) => (
                          <p key={meal._id} className="text-sm">
                            {meal?.meal?.name} (x{meal.quantity})
                          </p>
                        ))}
                      </div>
                    )}
                    {reservation.status !== "completed" &&
                      reservation.status !== "canceled" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full">
                              Update Status{" "}
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            {reservation.status !== "cancelled" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  updateStatus(reservation._id, "canceled")
                                }
                              >
                                Cancel Reservation
                              </DropdownMenuItem>
                            )}
                            {reservation.status === "reserved" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  updateStatus(reservation._id, "completed")
                                }
                              >
                                Mark as Completed
                              </DropdownMenuItem>
                            )}
                            {reservation.status !== "reserved" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  updateStatus(reservation._id, "reserved")
                                }
                              >
                                Restore to Reserved
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
