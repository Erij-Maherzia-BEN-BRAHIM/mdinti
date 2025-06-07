"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useExperiences } from "@/hooks/useExperiences";
import { Experience } from "@/models/Experience";

export default function ExperiencesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { experiences, loading, deleteExperience } = useExperiences();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter experiences based on search query
  const filteredExperiences = experiences.filter(
    (experience) =>
      experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (experience.artisan?.name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  // Delete experience
  const handleDeleteExperience = async () => {
    if (!currentExperience) return;
    try {
      setIsDeleting(true);
      await deleteExperience(currentExperience.id);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Success",
        description: "The experience has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete experience. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experiences</h1>
          <p className="text-muted-foreground">Manage unique experiences</p>
        </div>
        <Button 
          className="bg-[#008067] hover:bg-[#006a55]"
          onClick={() => router.push("/admin/experiences/new")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search experiences by title or artisan name..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Experience</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Artisan</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExperiences.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-6"
                >
                  {searchQuery ? "No experiences found matching your search" : "No experiences added yet"}
                </TableCell>
              </TableRow>
            ) : (
              filteredExperiences.map((experience) => (
                <TableRow key={experience.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={experience.images[0] || "/placeholder.svg"}
                          alt={experience.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {experience.title}
                    </div>
                  </TableCell>
                  <TableCell>{experience.duration || "-"}</TableCell>
                  <TableCell>{experience.artisan?.name || "-"}</TableCell>
                  <TableCell>
                    {experience.pricing?.groupPrice ? `${experience.pricing.groupPrice} TND` : "-"}
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
                          onClick={() => router.push(`/admin/experiences/${experience.id}`)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setCurrentExperience(experience);
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

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this experience? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {currentExperience && (
            <div className="flex items-center gap-4 py-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={currentExperience.images[0] || "/placeholder.svg"}
                  alt={currentExperience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{currentExperience.title}</p>
                <p className="text-sm text-muted-foreground">
                  {currentExperience.artisan?.name || "No artisan assigned"}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteExperience}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 