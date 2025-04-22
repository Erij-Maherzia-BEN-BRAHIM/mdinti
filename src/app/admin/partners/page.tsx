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
  Globe,
} from "lucide-react";
import Image from "next/image";
import { ImageUpload } from "@/components/image-upload";
import { useToast } from "@/hooks/use-toast";

// Sample data
const initialPartners = [
  {
    id: 1,
    name: "UNESCO",
    type: "International Organization",
    website: "https://unesco.org",
    description:
      "United Nations Educational, Scientific and Cultural Organization",
    logo: "/placeholder.svg?height=80&width=160&text=UNESCO",
  },
  {
    id: 2,
    name: "Tunisian Heritage Society",
    type: "Non-Profit Organization",
    website: "https://example.com/ths",
    description:
      "Local organization dedicated to preserving Tunisian cultural heritage",
    logo: "/placeholder.svg?height=80&width=160&text=THS",
  },
  {
    id: 3,
    name: "Artisans Association",
    type: "Trade Association",
    website: "https://example.com/artisans",
    description: "Association of traditional craftspeople from the Médina",
    logo: "/placeholder.svg?height=80&width=160&text=Artisans",
  },
  {
    id: 4,
    name: "Ministry of Culture",
    type: "Government",
    website: "https://culture.gov.tn",
    description: "Tunisian Ministry of Cultural Affairs",
    logo: "/placeholder.svg?height=80&width=160&text=MinCulture",
  },
];

export default function PartnersPage() {
  const { toast } = useToast();
  const [partners, setPartners] = useState(initialPartners);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState<any>(null);
  const [newPartner, setNewPartner] = useState({
    name: "",
    type: "",
    website: "",
    description: "",
    logo: "/placeholder.svg?height=80&width=160&text=New",
  });

  // Filter partners based on search query
  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new partner
  const handleAddPartner = () => {
    setPartners([...partners, { id: partners.length + 1, ...newPartner }]);
    setNewPartner({
      name: "",
      type: "",
      website: "",
      description: "",
      logo: "/placeholder.svg?height=80&width=160&text=New",
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Partner added",
      description: "The new partner has been added successfully.",
    });
  };

  // Edit partner
  const handleEditPartner = () => {
    setPartners(
      partners.map((partner) =>
        partner.id === currentPartner.id ? currentPartner : partner
      )
    );
    setIsEditDialogOpen(false);
    toast({
      title: "Partner updated",
      description: "The partner information has been updated successfully.",
    });
  };

  // Delete partner
  const handleDeletePartner = () => {
    setPartners(partners.filter((partner) => partner.id !== currentPartner.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Partner deleted",
      description: "The partner has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Partners</h1>
          <p className="text-muted-foreground">Manage organization partners</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#008067] hover:bg-[#006a55]">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Partner</DialogTitle>
              <DialogDescription>
                Add a new partner organization.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Organization Name</Label>
                    <Input
                      id="name"
                      value={newPartner.name}
                      onChange={(e) =>
                        setNewPartner({ ...newPartner, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Organization Type</Label>
                    <Input
                      id="type"
                      value={newPartner.type}
                      onChange={(e) =>
                        setNewPartner({ ...newPartner, type: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={newPartner.website}
                      onChange={(e) =>
                        setNewPartner({
                          ...newPartner,
                          website: e.target.value,
                        })
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newPartner.description}
                      onChange={(e) =>
                        setNewPartner({
                          ...newPartner,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <ImageUpload
                    value={newPartner.logo}
                    onChange={(value) =>
                      setNewPartner({ ...newPartner, logo: value })
                    }
                    label="Organization Logo"
                    aspectRatio="landscape"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddPartner}>Add Partner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search partners..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Website</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPartners.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-6"
                >
                  No partners found
                </TableCell>
              </TableRow>
            ) : (
              filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-20 overflow-hidden">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          width={80}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      {partner.name}
                    </div>
                  </TableCell>
                  <TableCell>{partner.type}</TableCell>
                  <TableCell>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <Globe className="h-3 w-3" />
                      Website
                    </a>
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
                            setCurrentPartner(partner);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setCurrentPartner(partner);
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Partner</DialogTitle>
            <DialogDescription>
              Make changes to the partner information.
            </DialogDescription>
          </DialogHeader>
          {currentPartner && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Organization Name</Label>
                    <Input
                      id="edit-name"
                      value={currentPartner.name}
                      onChange={(e) =>
                        setCurrentPartner({
                          ...currentPartner,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-type">Organization Type</Label>
                    <Input
                      id="edit-type"
                      value={currentPartner.type}
                      onChange={(e) =>
                        setCurrentPartner({
                          ...currentPartner,
                          type: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-website">Website</Label>
                    <Input
                      id="edit-website"
                      value={currentPartner.website}
                      onChange={(e) =>
                        setCurrentPartner({
                          ...currentPartner,
                          website: e.target.value,
                        })
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={currentPartner.description}
                      onChange={(e) =>
                        setCurrentPartner({
                          ...currentPartner,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <ImageUpload
                    value={currentPartner.logo}
                    onChange={(value) =>
                      setCurrentPartner({ ...currentPartner, logo: value })
                    }
                    label="Organization Logo"
                    aspectRatio="landscape"
                  />
                </div>
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
            <Button onClick={handleEditPartner}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this partner? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          {currentPartner && (
            <div className="flex items-center gap-4 py-4">
              <div className="relative h-12 w-24 overflow-hidden">
                <Image
                  src={currentPartner.logo || "/placeholder.svg"}
                  alt={currentPartner.name}
                  width={96}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-medium">{currentPartner.name}</p>
                <p className="text-sm text-muted-foreground">
                  {currentPartner.type}
                </p>
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
            <Button variant="destructive" onClick={handleDeletePartner}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
