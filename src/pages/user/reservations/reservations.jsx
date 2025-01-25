"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/apiInstance";
import moment from "moment";
import Layout from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Calendar, Users, Clock } from "lucide-react";
import PageLoading from "@/components/PageLoading";
import { Table } from "lucide-react";

export default function UserReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

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
          error.response?.data || error.message,
        );
        setLoading(false);
      });
  }, []);

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
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

function ReservationCard({ reservation }) {
  const cardStyles = {
    reserved: "bg-green-200",
    canceled: "bg-red-200",
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
        {reservation.mealId?.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-gray-500" />
              <span className="font-semibold">Meals:</span>
            </div>
            <ul className="list-disc list-inside pl-5 space-y-1">
              {reservation.mealId.map((meal) => (
                <li key={meal._id}>
                  {meal.meal.name} (x{meal.quantity})
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }) {
  const statusStyles = {
    reserved: "bg-green-100 text-green-800 hover:bg-green-200 capitalize",
    canceled: "bg-red-100 text-red-800 hover:bg-red-200 capitalize",
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200 capitalize",
  };

  return (
    <Badge className={statusStyles[status] || statusStyles.default}>
      {status}
    </Badge>
  );
}
