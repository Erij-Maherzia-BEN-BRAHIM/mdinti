import { NextResponse } from "next/server";
import { ExperienceService } from "@/services/ExperienceService";
import { BookingUpdateInput } from "@/models/Experience";

const experienceService = new ExperienceService();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data: BookingUpdateInput = await request.json();
    const booking = await experienceService.updateBooking(params.id, data);
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Failed to update booking:", error);
    return NextResponse.json(
      { message: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await experienceService.cancelBooking(params.id);
    return NextResponse.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    return NextResponse.json(
      { message: "Failed to cancel booking" },
      { status: 500 }
    );
  }
} 