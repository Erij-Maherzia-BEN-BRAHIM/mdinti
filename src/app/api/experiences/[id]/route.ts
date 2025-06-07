import { NextResponse } from "next/server";
import { ExperienceService } from "@/services/ExperienceService";
import { ExperienceUpdateInput } from "@/models/Experience";

const experienceService = new ExperienceService();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const experience = await experienceService.getExperience(params.id);
    return NextResponse.json(experience);
  } catch (error) {
    console.error("Failed to fetch experience:", error);
    return NextResponse.json(
      { message: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data: ExperienceUpdateInput = await request.json();
    const experience = await experienceService.updateExperience(params.id, data);
    return NextResponse.json(experience);
  } catch (error) {
    console.error("Failed to update experience:", error);
    return NextResponse.json(
      { message: "Failed to update experience" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await experienceService.deleteExperience(params.id);
    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return NextResponse.json(
      { message: "Failed to delete experience" },
      { status: 500 }
    );
  }
} 