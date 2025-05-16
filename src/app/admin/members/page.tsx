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
import {
  PlusCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { ImageUpload } from "@/components/image-upload";
import { useToast } from "@/hooks/use-toast";
import { useMembers } from "@/hooks/useMembers";
import { MemberCreateInput, MemberUpdateInput } from "@/models/Member";

export default function MembersPage() {
  const { toast } = useToast();
  const { members, isLoadingMembers, createMember, updateMember, deleteMember } = useMembers();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<any>(null);
  const [newMember, setNewMember] = useState<MemberCreateInput>({
    name: "",
    position: "",
    email: "",
    image: "/placeholder.svg?height=160&width=160&text=New",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      website: "",
    },
  });

  // Filter members based on search query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new member
  const handleAddMember = async () => {
    try {
      await createMember(newMember);
      setNewMember({
        name: "",
        position: "",
        email: "",
        image: "/placeholder.svg?height=160&width=160&text=New",
        socialMedia: {
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
          website: "",
        },
      });
      setIsAddDialogOpen(false);
      toast({
        title: "Member added",
        description: "The new member has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member. Please try again.",
      });
    }
  };

  // Edit member
  const handleEditMember = async () => {
    try {
      await updateMember(currentMember.id, currentMember);
      setIsEditDialogOpen(false);
      toast({
        title: "Member updated",
        description: "The member information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update member. Please try again.",
      });
    }
  };

  // Delete member
  const handleDeleteMember = async () => {
    try {
      await deleteMember(currentMember.id);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Member deleted",
        description: "The member has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete member. Please try again.",
      });
    }
  };

  // Render social media icons
  const renderSocialIcons = (socialMedia: any) => {
    return (
      <div className="flex space-x-1">
        {socialMedia.facebook && (
          <a
            href={socialMedia.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Facebook className="h-4 w-4" />
          </a>
        )}
        {socialMedia.twitter && (
          <a
            href={socialMedia.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Twitter className="h-4 w-4" />
          </a>
        )}
        {socialMedia.instagram && (
          <a
            href={socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Instagram className="h-4 w-4" />
          </a>
        )}
        {socialMedia.linkedin && (
          <a
            href={socialMedia.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
        {socialMedia.website && (
          <a
            href={socialMedia.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
          </a>
        )}
      </div>
    );
  };

  if (isLoadingMembers) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading members...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">Manage organization members</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#008067] hover:bg-[#006a55]">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>
                Add a new member to the organization.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) =>
                        setNewMember({ ...newMember, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={newMember.position}
                      onChange={(e) =>
                        setNewMember({ ...newMember, position: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newMember.email}
                      onChange={(e) =>
                        setNewMember({ ...newMember, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <ImageUpload
                    value={newMember.image}
                    onChange={(value) =>
                      setNewMember({ ...newMember, image: value })
                    }
                    label="Profile Photo"
                  />
                </div>
              </div>

              <div>
                <Label className="block mb-2">Social Media</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Facebook className="h-4 w-4 mr-2" />
                      <Label htmlFor="facebook">Facebook</Label>
                    </div>
                    <Input
                      id="facebook"
                      value={newMember.socialMedia.facebook}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          socialMedia: {
                            ...newMember.socialMedia,
                            facebook: e.target.value,
                          },
                        })
                      }
                      placeholder="https://facebook.com/username"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Twitter className="h-4 w-4 mr-2" />
                      <Label htmlFor="twitter">Twitter</Label>
                    </div>
                    <Input
                      id="twitter"
                      value={newMember.socialMedia.twitter}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          socialMedia: {
                            ...newMember.socialMedia,
                            twitter: e.target.value,
                          },
                        })
                      }
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Instagram className="h-4 w-4 mr-2" />
                      <Label htmlFor="instagram">Instagram</Label>
                    </div>
                    <Input
                      id="instagram"
                      value={newMember.socialMedia.instagram}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          socialMedia: {
                            ...newMember.socialMedia,
                            instagram: e.target.value,
                          },
                        })
                      }
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Linkedin className="h-4 w-4 mr-2" />
                      <Label htmlFor="linkedin">LinkedIn</Label>
                    </div>
                    <Input
                      id="linkedin"
                      value={newMember.socialMedia.linkedin}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          socialMedia: {
                            ...newMember.socialMedia,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      <Label htmlFor="website">Personal Website</Label>
                    </div>
                    <Input
                      id="website"
                      value={newMember.socialMedia.website}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          socialMedia: {
                            ...newMember.socialMedia,
                            website: e.target.value,
                          },
                        })
                      }
                      placeholder="https://example.com"
                    />
                  </div>
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
              <Button onClick={handleAddMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search members..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Social</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-6"
                >
                  No members found
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {member.name}
                    </div>
                  </TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{renderSocialIcons(member.socialMedia)}</TableCell>
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
                            setCurrentMember(member);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setCurrentMember(member);
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
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Make changes to the member information.
            </DialogDescription>
          </DialogHeader>
          {currentMember && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      value={currentMember.name}
                      onChange={(e) =>
                        setCurrentMember({
                          ...currentMember,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-position">Position</Label>
                    <Input
                      id="edit-position"
                      value={currentMember.position}
                      onChange={(e) =>
                        setCurrentMember({
                          ...currentMember,
                          position: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={currentMember.email}
                      onChange={(e) =>
                        setCurrentMember({
                          ...currentMember,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <ImageUpload
                    value={currentMember.image}
                    onChange={(value) =>
                      setCurrentMember({ ...currentMember, image: value })
                    }
                    label="Profile Photo"
                  />
                </div>
              </div>

              <div>
                <Label className="block mb-2">Social Media</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Facebook className="h-4 w-4 mr-2" />
                      <Label htmlFor="edit-facebook">Facebook</Label>
                    </div>
                    <Input
                      id="edit-facebook"
                      value={currentMember.socialMedia.facebook}
                      onChange={(e) =>
                        setCurrentMember({
                          ...currentMember,
                          socialMedia: {
                            ...currentMember.socialMedia,
                            facebook: e.target.value,
                          },
                        })
                      }
                      placeholder="https://facebook.com/username"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Twitter className="h-4 w-4 mr-2" />
                      <Label htmlFor="edit-twitter">Twitter</Label>
                    </div>
                    <Input
                      id="edit-twitter"
                      value={currentMember.socialMedia.twitter}
                      onChange={(e) =>
                        setCurrentMember({
                          ...currentMember,
                          socialMedia: {
                            ...currentMember.socialMedia,
                            twitter: e.target.value,
                          },
                        })
                      }
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Instagram className="h-4 w-4 mr-2" />
                      <Label htmlFor="edit-instagram">Instagram</Label>
                    </div>
                    <Input
                      id="edit-instagram"
                      value={currentMember.socialMedia.instagram}
                      onChange={(e) =>
                        setCurrentMember({
                          ...currentMember,
                          socialMedia: {
                            ...currentMember.socialMedia,
                            instagram: e.target.value,
                          },
                        })
                      }
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Linkedin className="h-4 w-4 mr-2" />
                      <Label htmlFor="edit-linkedin">LinkedIn</Label>
                    </div>
                    <Input
                      id="edit-linkedin"
                      value={currentMember.socialMedia.linkedin}
                      onChange={(e) =>
                        setCurrentMember({
                          ...currentMember,
                          socialMedia: {
                            ...currentMember.socialMedia,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      <Label htmlFor="edit-website">Personal Website</Label>
                    </div>
                    <Input
                      id="edit-website"
                      value={currentMember.socialMedia.website}
                      onChange={(e) =>
                        setCurrentMember({
                          ...currentMember,
                          socialMedia: {
                            ...currentMember.socialMedia,
                            website: e.target.value,
                          },
                        })
                      }
                      placeholder="https://example.com"
                    />
                  </div>
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
            <Button onClick={handleEditMember}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this member? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {currentMember && (
            <div className="flex items-center gap-4 py-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={currentMember.image || "/placeholder.svg"}
                  alt={currentMember.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{currentMember.name}</p>
                <p className="text-sm text-muted-foreground">
                  {currentMember.position}
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
            <Button variant="destructive" onClick={handleDeleteMember}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
