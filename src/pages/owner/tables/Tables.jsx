import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import Layout from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import PageLoading from "../../../components/PageLoading";
import { toast } from "sonner";

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTable, setNewTable] = useState({ tableNumber: "", capacity: "" });
  const [editingTable, setEditingTable] = useState(null);
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

    fetchTables();
  }, [restaurantId]);

  const fetchTables = async () => {
    try {
      const response = await api.get(`/tables/restaurant/${restaurantId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.data && response.data.data) {
        setTables(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
      toast.error("Failed to fetch tables. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTable = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/tables/create",
        { ...newTable, restaurantId },
        { headers: { token: localStorage.getItem("token") } },
      );
      if (response.data && response.data.data) {
        fetchTables();
        setNewTable({ tableNumber: "", capacity: "" });
        setIsAddDialogOpen(false);
        toast.success("Table added successfully!");
      }
    } catch (error) {
      console.error("Error adding table:", error);
      toast.error("Failed to add table. Please try again.");
    }
  };

  const handleUpdateTable = async (e) => {
    e.preventDefault();
    if (!editingTable) return;

    try {
      const response = await api.put(
        `/tables/update/${editingTable._id}`,
        {
          tableNumber: editingTable.tableNumber,
          capacity: editingTable.capacity,
        },
        { headers: { token: localStorage.getItem("token") } },
      );
      setIsEditDialogOpen(false);
      toast.success("Table updated successfully!");
      fetchTables();
    } catch (error) {
      console.error("Error updating table:", error);
      toast.error("Failed to update table. Please try again.");
    }
  };

  const handleDeleteTable = async (tableId) => {
    if (!window.confirm("Are you sure you want to delete this table?")) return;

    try {
      await api.delete(`/tables/delete/${tableId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setTables(tables.filter((table) => table._id !== tableId));
      toast.success("Table deleted successfully!");
    } catch (error) {
      console.error("Error deleting table:", error);
      toast.error("Failed to delete table. Please try again.");
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
          <h1 className="text-3xl font-bold">Manage Tables</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-500">
                <Plus className="mr-2 h-4 w-4" /> Add New Table
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Table</DialogTitle>
                <DialogDescription>
                  Enter the details for the new table.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTable}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tableNumber" className="text-right">
                      Table Number
                    </Label>
                    <Input
                      id="tableNumber"
                      value={newTable.tableNumber}
                      onChange={(e) =>
                        setNewTable({
                          ...newTable,
                          tableNumber: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right">
                      Capacity
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newTable.capacity}
                      onChange={(e) =>
                        setNewTable({ ...newTable, capacity: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className={"bg-red-500"}>
                    Add Table
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <Card key={table._id}>
              <CardHeader>
                <CardTitle>Table {table.tableNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Capacity: {table.capacity}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingTable(table);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteTable(table._id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Table</DialogTitle>
              <DialogDescription>
                Update the details for this table.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateTable}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editTableNumber" className="text-right">
                    Table Number
                  </Label>
                  <Input
                    id="editTableNumber"
                    value={editingTable?.tableNumber || ""}
                    onChange={(e) =>
                      setEditingTable(
                        editingTable
                          ? { ...editingTable, tableNumber: e.target.value }
                          : null,
                      )
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editCapacity" className="text-right">
                    Capacity
                  </Label>
                  <Input
                    id="editCapacity"
                    type="number"
                    value={editingTable?.capacity || ""}
                    onChange={(e) =>
                      setEditingTable(
                        editingTable
                          ? {
                              ...editingTable,
                              capacity: Number(e.target.value),
                            }
                          : null,
                      )
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className={"bg-red-500"}>
                  Update Table
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
