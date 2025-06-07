import { NextResponse } from "next/server";
import { ExperienceService } from "@/services/ExperienceService";
import { BookingCreateInput } from "@/models/Experience";

const experienceService = new ExperienceService();

export async function POST(request: Request) {
  try {
    const data: BookingCreateInput = await request.json();
    const booking = await experienceService.createBooking(data);
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Failed to create booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    
    if (email) {
      const bookings = await experienceService.getBookingsByEmail(email);
      return NextResponse.json(bookings);
    }

    return NextResponse.json(
      { error: "Email parameter is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
} 