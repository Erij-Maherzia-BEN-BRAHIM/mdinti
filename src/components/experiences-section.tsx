"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useExperiences } from "@/hooks/useExperiences";
import { cn } from "@/lib/utils";
import { BookingCreateInput } from "@/models/Experience";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";

export function ExperiencesSection() {
  const { experiences, createBooking } = useExperiences();
  const { toast } = useToast();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null
  );
  const [date, setDate] = useState<Date>();
  const [participants, setParticipants] = useState(1);
  const [notes, setNotes] = useState("");
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    if (!selectedExperience || !date) {
      toast({
        title: "Error",
        description: "Please select an experience and a date",
      });
      return;
    }

    if (!guestInfo.name || !guestInfo.email || !guestInfo.phone) {
      toast({
        title: "Error",
        description: "Please fill in all contact fields",
      });
      return;
    }

    try {
      setIsBooking(true);
      const bookingData: BookingCreateInput = {
        experienceId: selectedExperience,
        date: date ? new Date(date) : new Date(),
        time: format(date || new Date(), "HH:mm"),
        numberOfPeople: participants,
        notes,
        guestInfo,
        isPrivate: false,
        totalPrice: 0, // This will be calculated on the server
      };
      await createBooking(bookingData);
      toast({
        title: "Success",
        description: "Booking completed successfully",
      });
      // Reset form
      setSelectedExperience(null);
      setDate(undefined);
      setParticipants(1);
      setNotes("");
      setGuestInfo({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Error",
        description: "Error during booking",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Experiences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative">
                <img
                  src={experience.images[0]}
                  alt={experience.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {experience.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {experience.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  {experience.duration && (
                    <span className="text-sm text-gray-500">
                      {experience.duration}
                    </span>
                  )}
                  {experience.pricing?.groupPrice && (
                    <span className="text-lg font-semibold">
                      {experience.pricing.groupPrice}TND
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => setSelectedExperience(experience.id)}
                  className="w-full"
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Dialog */}
        {selectedExperience && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Book an Experience</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedExperience(null)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date
                          ? format(date, "PPP", { locale: enUS })
                          : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Number of Participants
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={participants}
                    onChange={(e) => setParticipants(parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={guestInfo.name}
                    onChange={(e) =>
                      setGuestInfo({ ...guestInfo, name: e.target.value })
                    }
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={guestInfo.email}
                    onChange={(e) =>
                      setGuestInfo({ ...guestInfo, email: e.target.value })
                    }
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    value={guestInfo.phone}
                    onChange={(e) =>
                      setGuestInfo({ ...guestInfo, phone: e.target.value })
                    }
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Notes
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional information..."
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedExperience(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleBooking} disabled={isBooking}>
                    {isBooking ? "Booking in progress..." : "Confirm"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
