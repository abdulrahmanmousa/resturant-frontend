"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/apiInstance";
import moment from "moment";
import Layout from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Utensils, Calendar, Users, Clock, Table } from "lucide-react";
import PageLoading from "@/components/PageLoading";
import { toast } from "sonner";

export default function UserReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewDialog, setReviewDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reviewData, setReviewData] = useState({
    comment: "",
    rate: 1,
  });

  // Fetch user reservations
  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/reservations/user", {
        headers: { token },
      })
      .then((response) => {
        setReservations(response.data.reservations);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching reservations:",
          error.response?.data || error.message
        );
        setLoading(false);
      });
  }, []);

  const handleReviewSubmit = () => {
    const token = localStorage.getItem("token");
    const payload = {
      reservationId: selectedReservation._id,
      comment: reviewData.comment,
      rate: reviewData.rate,
    };

    api
      .post("/reviews/create", payload, {
        headers: { token },
      })
      .then(() => {
        setReviewDialog(false);
        setReviewData({ comment: "", rate: 1 });
        toast.success("Review submitted successfully!");
      })
      .catch((error) => {
        console.error(
          "Error submitting review:",
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.message || "Failed to submit review."
        );
      });
  };

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
        <h1 className="text-3xl font-bold mb-6">My Reservations</h1>
        {reservations.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-40">
              <p className="text-center text-gray-500">
                No reservations found.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation._id}
                reservation={reservation}
                onReview={() => {
                  setSelectedReservation(reservation);
                  setReviewDialog(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your review..."
              value={reviewData.comment}
              onChange={(e) =>
                setReviewData((prev) => ({ ...prev, comment: e.target.value }))
              }
            />
            <Input
              type="number"
              min={1}
              max={5}
              value={reviewData.rate}
              onChange={(e) =>
                setReviewData((prev) => ({ ...prev, rate: e.target.value }))
              }
              placeholder="Rate (1-5)"
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setReviewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleReviewSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
function ReservationCard({ reservation, onReview }) {
  const cardStyles = {
    reserved: "bg-green-200",
    canceled: "bg-red-200",
    completed: "bg-blue-200",
    default: "bg-gray-50",
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className={cardStyles[reservation.status] || cardStyles.default}
      >
        <CardTitle className="flex justify-between items-center">
          <span>{moment(reservation.date).format("MMM D")}</span>
          <StatusBadge status={reservation.status} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Restaurant Section */}
        <div className="flex items-center space-x-4">
          {reservation.restaurantId?.profileImage?.secure_url && (
            <img
              src={reservation.restaurantId.profileImage.secure_url}
              alt={`${reservation.restaurantId.name} Profile`}
              className="w-16 h-16 rounded-full object-cover border"
            />
          )}
          <div>
            <h2 className="text-lg font-semibold">
              {reservation.restaurantId?.name || "Unknown Restaurant"}
            </h2>
            <p className="text-sm text-gray-500">
              {reservation.restaurantId?.address || "Address not available"}
            </p>
          </div>
        </div>
        {/* Reservation Details */}
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span>{moment(reservation.date).format("MMMM Do, YYYY")}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>{reservation.time}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Table className="w-5 h-5 text-gray-500" />
          <span>Table No. {reservation.tableId.tableNumber}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-gray-500" />
          <span>Capacity: {reservation.tableId.capacity}</span>
        </div>
        {/* Review Button */}
        {reservation.status === "completed" && !reservation?.reviewId && (
          <Button onClick={onReview} className="mt-4">
            Write a Review
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }) {
  const statusStyles = {
    reserved: "bg-green-100 text-green-800 hover:bg-green-200 capitalize",
    canceled: "bg-red-100 text-red-800 hover:bg-red-200 capitalize",
    completed: "bg-blue-100 text-blue-800 hover:bg-blue-200 capitalize",
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200 capitalize",
  };

  return (
    <Badge className={statusStyles[status] || statusStyles.default}>
      {status}
    </Badge>
  );
}
