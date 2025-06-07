import {
  Experience,
  ExperienceCreateInput,
  ExperienceUpdateInput,
  Booking,
  BookingCreateInput,
  BookingUpdateInput,
} from "@/models/Experience";
import { getDb } from "@/lib/db";
import { Collection, ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export class ExperienceService {
  private async getCollection(): Promise<Collection<Experience>> {
    const db = await getDb();
    return db.collection("experiences");
  }

  private async getBookingsCollection(): Promise<Collection<Booking>> {
    const db = await getDb();
    return db.collection("bookings");
  }

  private async sendEmail(to: string, subject: string, html: string) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || "noreply@mdinti.org",
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      throw new Error("Failed to send email");
    }
  }

  async getAllExperiences(): Promise<Experience[]> {
    try {
      const collection = await this.getCollection();
      const experiences = await collection.find().toArray();
      return experiences as Experience[];
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
      throw new Error("Failed to fetch experiences");
    }
  }

  async getExperience(id: string): Promise<Experience> {
    try {
      const collection = await this.getCollection();
      const experience = await collection.findOne({ id });
      if (!experience) {
        throw new Error("Experience not found");
      }
      return experience as Experience;
    } catch (error) {
      console.error("Failed to fetch experience:", error);
      throw new Error("Failed to fetch experience");
    }
  }

  async createExperience(data: ExperienceCreateInput): Promise<Experience> {
    try {
      const collection = await this.getCollection();
      const experience: Experience = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await collection.insertOne(experience);
      return experience;
    } catch (error) {
      console.error("Failed to create experience:", error);
      throw new Error("Failed to create experience");
    }
  }

  async updateExperience(
    id: string,
    data: ExperienceUpdateInput
  ): Promise<Experience> {
    try {
      const collection = await this.getCollection();
      const experience = await collection.findOne({ id });
      if (!experience) {
        throw new Error("Experience not found");
      }

      const { _id, ...updateData } = {
        ...experience,
        ...data,
        pricing: {
          ...experience.pricing,
          ...(data.pricing || {}),
        },
        artisan: {
          ...experience.artisan,
          ...(data.artisan || {}),
        },
        updatedAt: new Date(),
      };

      await collection.updateOne({ id }, { $set: updateData });

      return { ...experience, ...updateData } as Experience;
    } catch (error) {
      console.error("Failed to update experience:", error);
      throw new Error("Failed to update experience");
    }
  }

  async deleteExperience(id: string): Promise<void> {
    try {
      const collection = await this.getCollection();
      const experience = await collection.findOne({ id });
      if (!experience) {
        throw new Error("Experience not found");
      }

      await collection.deleteOne({ id });
    } catch (error) {
      console.error("Failed to delete experience:", error);
      throw new Error("Failed to delete experience");
    }
  }

  // Booking methods
  async createBooking(data: BookingCreateInput): Promise<Booking> {
    try {
      // Get experience details first to calculate price
      const experience = await this.getExperience(data.experienceId);

      // Calculate total price
      let totalPrice = 0;
      if (data.isPrivate) {
        // For private bookings, use private price if available, otherwise use group price
        totalPrice =
          (experience.pricing?.privatePrice ||
            experience.pricing?.groupPrice ||
            0) * data.numberOfPeople;
      } else {
        // For group bookings, use group price
        totalPrice =
          (experience.pricing?.groupPrice || 0) * data.numberOfPeople;
      }

      const collection = await this.getBookingsCollection();
      const now = new Date();

      // Ensure date is a Date object
      const bookingDate =
        data.date instanceof Date ? data.date : new Date(data.date);

      const booking: Booking = {
        id: new ObjectId().toString(),
        ...data,
        date: bookingDate,
        totalPrice,
        status: "pending",
        createdAt: now,
        updatedAt: now,
      };

      await collection.insertOne(booking);

      // Send email notification to admin
      await this.sendEmail(
        process.env.ADMIN_EMAIL || "admin@mdinti.org",
        "New Experience Booking",
        `
          <h2>New Booking Request</h2>
          <p><strong>Experience:</strong> ${experience.title}</p>
          <p><strong>Guest Name:</strong> ${data.guestInfo.name}</p>
          <p><strong>Email:</strong> ${data.guestInfo.email}</p>
          <p><strong>Phone:</strong> ${data.guestInfo.phone}</p>
          <p><strong>Date:</strong> ${bookingDate.toLocaleDateString()}</p>
          <p><strong>Number of People:</strong> ${data.numberOfPeople}</p>
          <p><strong>Type:</strong> ${data.isPrivate ? "Private" : "Group"}</p>
          <p><strong>Total Price:</strong> ${totalPrice} TND</p>
          ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
        `
      );

      // Send confirmation email to guest
      await this.sendEmail(
        data.guestInfo.email,
        "Booking Confirmation - mdinti",
        `
          <h2>Thank you for your booking!</h2>
          <p>We have received your booking request for ${experience.title}.</p>
          <p>Booking Details:</p>
          <ul>
            <li>Date: ${bookingDate.toLocaleDateString()}</li>
            <li>Number of People: ${data.numberOfPeople}</li>
            <li>Type: ${data.isPrivate ? "Private" : "Group"}</li>
            <li>Total Price: ${totalPrice} TND</li>
          </ul>
          <p>We will contact you shortly to confirm your booking.</p>
          <p>Best regards,<br>The mdinti Team</p>
        `
      );

      return booking;
    } catch (error) {
      console.error("Failed to create booking:", error);
      throw new Error("Failed to create booking");
    }
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    try {
      const collection = await this.getBookingsCollection();
      const bookings = await collection.find({ userId }).toArray();
      return bookings as Booking[];
    } catch (error) {
      console.error("Failed to fetch user bookings:", error);
      throw new Error("Failed to fetch user bookings");
    }
  }

  async getBookingsByExperience(experienceId: string): Promise<Booking[]> {
    try {
      const collection = await this.getBookingsCollection();
      const bookings = await collection.find({ experienceId }).toArray();
      return bookings as Booking[];
    } catch (error) {
      console.error("Failed to fetch experience bookings:", error);
      throw new Error("Failed to fetch experience bookings");
    }
  }

  async updateBooking(id: string, data: BookingUpdateInput): Promise<Booking> {
    try {
      const collection = await this.getBookingsCollection();
      const booking = await collection.findOne({ id });
      if (!booking) {
        throw new Error("Booking not found");
      }

      const updatedBooking = {
        ...booking,
        ...data,
        guestInfo: data.guestInfo
          ? {
              name: data.guestInfo.name || booking.guestInfo.name,
              email: data.guestInfo.email || booking.guestInfo.email,
              phone: data.guestInfo.phone || booking.guestInfo.phone,
            }
          : booking.guestInfo,
        updatedAt: new Date(),
      };

      await collection.updateOne({ id }, { $set: updatedBooking });

      return updatedBooking as Booking;
    } catch (error) {
      console.error("Failed to update booking:", error);
      throw new Error("Failed to update booking");
    }
  }

  async cancelBooking(id: string): Promise<void> {
    try {
      const collection = await this.getBookingsCollection();
      const booking = await collection.findOne({ id });
      if (!booking) {
        throw new Error("Booking not found");
      }

      await collection.updateOne(
        { id },
        {
          $set: {
            status: "cancelled",
            updatedAt: new Date(),
          },
        }
      );
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      throw new Error("Failed to cancel booking");
    }
  }

  async getBookingsByEmail(email: string): Promise<Booking[]> {
    try {
      const collection = await this.getBookingsCollection();
      const bookings = await collection
        .find({ "guestInfo.email": email })
        .toArray();
      return bookings as Booking[];
    } catch (error) {
      console.error("Failed to fetch bookings by email:", error);
      throw new Error("Failed to fetch bookings by email");
    }
  }
}
