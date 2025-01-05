import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import api from "../../lib/apiInstance";

export default function TableAvailability() {
  const { id: restaurantId } = useParams();
  return <></>;
}
