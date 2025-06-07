"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/image-upload";
import { useToast } from "@/hooks/use-toast";
import { useExperiences } from "@/hooks/useExperiences";
import { ExperienceCreateInput } from "@/models/Experience";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const { experiences, loading, createExperience, updateExperience } =
    useExperiences();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [experience, setExperience] = useState<ExperienceCreateInput>({
    title: "",
    description: "",
    images: [],
  });

  const isEditing = id !== "new";

  useEffect(() => {
    if (isEditing && experiences.length > 0) {
      const existingExperience = experiences.find((e) => e.id === id);
      if (existingExperience) {
        setExperience(existingExperience);
      }
    }
  }, [isEditing, experiences, id]);

  const handleSubmit = async () => {
    if (
      !experience.title ||
      !experience.description ||
      !experience.images.length
    ) {
      toast({
        title: "Error",
        description:
          "Please fill in all required fields (title, description, and main image).",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      if (isEditing) {
        await updateExperience(id, experience);
        toast({
          title: "Success",
          description: "Experience updated successfully.",
        });
      } else {
        await createExperience(experience);
        toast({
          title: "Success",
          description: "Experience created successfully.",
        });
      }
      router.push("/admin/experiences");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          isEditing ? "update" : "create"
        } experience. Please try again.`,
      });
    } finally {
      setIsSubmitting(false);
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
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/experiences")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">
          {isEditing ? "Edit Experience" : "New Experience"}
        </h1>
      </div>

      <div className="space-y-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={experience.title}
              onChange={(e) =>
                setExperience({ ...experience, title: e.target.value })
              }
              placeholder="Enter experience title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={experience.description}
              onChange={(e) =>
                setExperience({
                  ...experience,
                  description: e.target.value,
                })
              }
              placeholder="Enter experience description"
              className="min-h-[100px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={experience.duration || ""}
              onChange={(e) =>
                setExperience({
                  ...experience,
                  duration: e.target.value,
                })
              }
              placeholder="e.g., 2 hours"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              id="schedule"
              value={experience.schedule || ""}
              onChange={(e) =>
                setExperience({
                  ...experience,
                  schedule: e.target.value,
                })
              }
              placeholder="e.g., Monday to Friday, 9 AM - 5 PM"
            />
          </div>
        </div>

        <div>
          <Label className="block mb-2">Pricing (Optional)</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="groupPrice">Group Price (TND)</Label>
              <Input
                id="groupPrice"
                type="number"
                value={experience.pricing?.groupPrice || ""}
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    pricing: {
                      ...experience.pricing,
                      groupPrice: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    },
                  })
                }
                placeholder="Enter group price"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="privatePrice">Private Price (TND)</Label>
              <Input
                id="privatePrice"
                type="number"
                value={experience.pricing?.privatePrice || ""}
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    pricing: {
                      ...experience.pricing,
                      privatePrice: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    },
                  })
                }
                placeholder="Enter private price"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minGroupSize">Min Group Size</Label>
              <Input
                id="minGroupSize"
                type="number"
                value={experience.pricing?.minGroupSize || ""}
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    pricing: {
                      ...experience.pricing,
                      minGroupSize: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    },
                  })
                }
                placeholder="Enter minimum group size"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxGroupSize">Max Group Size</Label>
              <Input
                id="maxGroupSize"
                type="number"
                value={experience.pricing?.maxGroupSize || ""}
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    pricing: {
                      ...experience.pricing,
                      maxGroupSize: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    },
                  })
                }
                placeholder="Enter maximum group size"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="block mb-2">Artisan Information (Optional)</Label>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="artisanName">Name</Label>
              <Input
                id="artisanName"
                value={experience.artisan?.name || ""}
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    artisan: {
                      ...experience.artisan,
                      name: e.target.value,
                    },
                  })
                }
                placeholder="Enter artisan name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="artisanBio">Bio</Label>
              <Textarea
                id="artisanBio"
                value={experience.artisan?.bio || ""}
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    artisan: {
                      ...experience.artisan,
                      bio: e.target.value,
                    },
                  })
                }
                placeholder="Enter artisan bio"
                className="min-h-[100px]"
              />
            </div>
            <div>
              <ImageUpload
                value={experience.artisan?.image || ""}
                onChange={(value) =>
                  setExperience({
                    ...experience,
                    artisan: {
                      ...experience.artisan,
                      image: value,
                    },
                  })
                }
                label="Artisan Photo (Optional)"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="block mb-2">Experience Images *</Label>
          <ImageUpload
            value={experience.images[0] || ""}
            onChange={(value) =>
              setExperience({
                ...experience,
                images: [value],
              })
            }
            label="Main Image"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/experiences")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#008067] hover:bg-[#006a55]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Saving..." : "Creating..."}
              </>
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Create Experience"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
