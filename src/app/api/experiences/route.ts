import { NextResponse } from "next/server";
import { ExperienceService } from "@/services/ExperienceService";
import { ExperienceCreateInput } from "@/models/Experience";

const experienceService = new ExperienceService();

export async function GET() {
  try {
    const experiences = await experienceService.getAllExperiences();
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: ExperienceCreateInput = await request.json();
    const experience = await experienceService.createExperience(data);
    return NextResponse.json(experience);
  } catch (error) {
    console.error("Failed to create experience:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
} 