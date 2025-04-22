"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PlusCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Sample data
const initialActivities = [
  {
    id: 1,
    title: "Heritage Preservation",
    category: "Restoration",
    status: "Active",
    startDate: "2023-01-15",
    description:
      "Restoring historic buildings and monuments to their former glory while maintaining authenticity.",
  },
  {
    id: 2,
    title: "Economic Development",
    category: "Business",
    status: "Active",
    startDate: "2023-03-10",
    description:
      "Supporting local artisans and businesses to thrive in the modern economy while preserving traditional crafts.",
  },
  {
    id: 3,
    title: "Cultural Events",
    category: "Events",
    status: "Upcoming",
    startDate: "2023-07-22",
    description:
      "Organizing festivals, exhibitions, and workshops to celebrate and share the rich culture of the Médina.",
  },
  {
    id: 4,
    title: "Education Programs",
    category: "Education",
    status: "Completed",
    startDate: "2022-11-05",
    description:
      "Teaching younger generations about the importance of cultural heritage and traditional knowledge.",
  },
  {
    id: 5,
    title: "Sustainable Tourism",
    category: "Tourism",
    status: "Active",
    startDate: "2023-02-18",
    description:
      "Promoting responsible tourism that benefits local communities while protecting historic sites.",
  },
  {
    id: 6,
    title: "Community Engagement",
    category: "Community",
    status: "Planning",
    startDate: "2023-08-30",
    description:
      "Involving residents in decision-making processes and empowering them to take ownership of their heritage.",
  },
];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState(initialActivities);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const [newActivity, setNewActivity] = useState({
    title: "",
    category: "",
    status: "Planning",
    startDate: new Date().toISOString().split("T")[0],
    description: "",
  });

  // Filter activities based on search query
  const filteredActivities = activities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new activity
  const handleAddActivity = () => {
    setActivities([
      ...activities,
      { id: activities.length + 1, ...newActivity },
    ]);
    setNewActivity({
      title: "",
      category: "",
      status: "Planning",
      startDate: new Date().toISOString().split("T")[0],
      description: "",
    });
    setIsAddDialogOpen(false);
  };

  // Edit activity
  const handleEditActivity = () => {
    setActivities(
      activities.map((activity) =>
        activity.id === currentActivity.id ? currentActivity : activity
      )
    );
    setIsEditDialogOpen(false);
  };

  // Delete activity
  const handleDeleteActivity = () => {
    setActivities(
      activities.filter((activity) => activity.id !== currentActivity.id)
    );
    setIsDeleteDialogOpen(false);
  };

  // Get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "Completed":
        return <Badge className="bg-blue-500">{status}</Badge>;
      case "Upcoming":
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case "Planning":
        return <Badge className="bg-purple-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
          <p className="text-muted-foreground">
            Manage organization activities and projects
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#008067] hover:bg-[#006a55]">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Activity</DialogTitle>
              <DialogDescription>
                Add a new activity or project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newActivity.title}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newActivity.category}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, category: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newActivity.status}
                  onValueChange={(value) =>
                    setNewActivity({ ...newActivity, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newActivity.startDate}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newActivity.description}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddActivity}>Add Activity</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search activities..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-6"
                >
                  No activities found
                </TableCell>
              </TableRow>
            ) : (
              filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">
                    {activity.title}
                  </TableCell>
                  <TableCell>{activity.category}</TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {activity.startDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentActivity(activity);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setCurrentActivity(activity);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
            <DialogDescription>
              Make changes to the activity information.
            </DialogDescription>
          </DialogHeader>
          {currentActivity && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={currentActivity.title}
                  onChange={(e) =>
                    setCurrentActivity({
                      ...currentActivity,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={currentActivity.category}
                  onChange={(e) =>
                    setCurrentActivity({
                      ...currentActivity,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={currentActivity.status}
                  onValueChange={(value) =>
                    setCurrentActivity({ ...currentActivity, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={currentActivity.startDate}
                  onChange={(e) =>
                    setCurrentActivity({
                      ...currentActivity,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentActivity.description}
                  onChange={(e) =>
                    setCurrentActivity({
                      ...currentActivity,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditActivity}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this activity? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          {currentActivity && (
            <div className="py-4">
              <div className="space-y-1">
                <p className="font-medium">{currentActivity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {currentActivity.category}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {currentActivity.status === "Active" && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                  {currentActivity.status === "Upcoming" && (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                  {currentActivity.status === "Planning" && (
                    <Clock className="h-4 w-4 text-purple-500" />
                  )}
                  {currentActivity.status === "Completed" && (
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  )}
                  <span>{currentActivity.status}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteActivity}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
