import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import Layout from "@/components/layout/layout.jsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import api from "@/lib/apiInstance";
import { toast } from "sonner";
import PageLoading from "../../../components/PageLoading";

export default function OwnerMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMeal, setNewMeal] = useState({
    name: "",
    desc: "",
    price: "",
    image: null,
  });
  const [editingMeal, setEditingMeal] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const restaurantId = user?.restaurant;

  useEffect(() => {
    if (!restaurantId) {
      console.error("Restaurant ID is missing.");
      setLoading(false);
      return;
    }

    fetchMeals();
  }, [restaurantId]);

  const fetchMeals = async () => {
    try {
      const response = await api.get(`/meals/restaurant/${restaurantId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.data && response.data.meals) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
      toast.error("Failed to fetch meals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeal = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newMeal.name);
    formData.append("desc", newMeal.desc);
    formData.append("price", newMeal.price);
    formData.append("restaurantId", restaurantId);
    if (newMeal.image) {
      formData.append("image", newMeal.image);
    }

    try {
      const response = await api.post("/meals/create", formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data && response.data.meal) {
        setMeals([...meals, response.data.meal]);
        setNewMeal({ name: "", desc: "", price: "", image: null });
        setIsAddDialogOpen(false);
        toast.success("Meal added successfully!");
      }
    } catch (error) {
      console.error("Error adding meal:", error);
      toast.error("Failed to add meal. Please try again.");
    }
  };

  const handleUpdateMeal = async (e) => {
    e.preventDefault();
    if (!editingMeal) return;

    const formData = new FormData();
    formData.append("name", editingMeal.name);
    formData.append("desc", editingMeal.desc);
    formData.append("price", editingMeal.price.toString());
    if (editingMeal.image && typeof editingMeal.image !== "string") {
      formData.append("image", editingMeal.image);
    }

    try {
      const response = await api.put(
        `/meals/update/${editingMeal._id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.data && response.data.meal) {
        setMeals(
          meals.map((meal) =>
            meal._id === editingMeal._id
              ? { ...meal, ...response.data.meal }
              : meal,
          ),
        );
        setIsEditDialogOpen(false);
        toast.success("Meal updated successfully!");
      }
    } catch (error) {
      console.error("Error updating meal:", error);
      toast.error("Failed to update meal. Please try again.");
    }
  };

  const handleDeleteMeal = async (mealId) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) return;

    try {
      await api.delete(`/meals/delete/${mealId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setMeals(meals.filter((meal) => meal._id !== mealId));
      toast.success("Meal deleted successfully!");
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("Failed to delete meal. Please try again.");
    }
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
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Meals</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Meal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Meal</DialogTitle>
                <DialogDescription>
                  Enter the details for the new meal.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddMeal}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newMeal.name}
                      onChange={(e) =>
                        setNewMeal({ ...newMeal, name: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="desc" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="desc"
                      value={newMeal.desc}
                      onChange={(e) =>
                        setNewMeal({ ...newMeal, desc: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newMeal.price}
                      onChange={(e) =>
                        setNewMeal({ ...newMeal, price: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      onChange={(e) =>
                        setNewMeal({
                          ...newMeal,
                          image: e.target.files?.[0] || null,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Meal</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <Card key={meal._id}>
              <CardHeader>
                <CardTitle>{meal.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-4">
                  <img
                    src={meal.image?.secure_url || "/placeholder.svg"}
                    alt={meal.name}
                    fill
                    className="object-cover rounded-md aspect-square"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-2">{meal.desc}</p>
                <p className="font-semibold">Price: ${meal.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingMeal(meal);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteMeal(meal._id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Meal</DialogTitle>
              <DialogDescription>
                Update the details for this meal.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateMeal}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="editName"
                    value={editingMeal?.name || ""}
                    onChange={(e) =>
                      setEditingMeal(
                        editingMeal
                          ? { ...editingMeal, name: e.target.value }
                          : null,
                      )
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editDesc" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="editDesc"
                    value={editingMeal?.desc || ""}
                    onChange={(e) =>
                      setEditingMeal(
                        editingMeal
                          ? { ...editingMeal, desc: e.target.value }
                          : null,
                      )
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editPrice" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="editPrice"
                    type="number"
                    value={editingMeal?.price || ""}
                    onChange={(e) =>
                      setEditingMeal(
                        editingMeal
                          ? { ...editingMeal, price: Number(e.target.value) }
                          : null,
                      )
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editImage" className="text-right">
                    Image
                  </Label>
                  <Input
                    id="editImage"
                    type="file"
                    onChange={(e) =>
                      setEditingMeal(
                        editingMeal
                          ? {
                              ...editingMeal,
                              image: e.target.files?.[0] || editingMeal.image,
                            }
                          : null,
                      )
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Update Meal</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
