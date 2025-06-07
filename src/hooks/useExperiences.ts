import { useState, useEffect } from "react";
import { Experience, ExperienceCreateInput, ExperienceUpdateInput, Booking, BookingCreateInput, BookingUpdateInput } from "@/models/Experience";

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experiences');
      if (!response.ok) {
        throw new Error('Failed to fetch experiences');
      }
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  const createExperience = async (data: ExperienceCreateInput) => {
    try {
      const response = await fetch('/api/experiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create experience');
      }

      const newExperience = await response.json();
      setExperiences((prev) => [...prev, newExperience]);
      return newExperience;
    } catch (err) {
      setError("Failed to create experience");
      console.error(err);
      throw err;
    }
  };

  const updateExperience = async (id: string, data: ExperienceUpdateInput) => {
    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update experience');
      }

      const updatedExperience = await response.json();
      setExperiences((prev) =>
        prev.map((exp) => (exp.id === id ? updatedExperience : exp))
      );
      return updatedExperience;
    } catch (err) {
      setError("Failed to update experience");
      console.error(err);
      throw err;
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete experience');
      }

      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      setError("Failed to delete experience");
      console.error(err);
      throw err;
    }
  };

  const createBooking = async (data: BookingCreateInput): Promise<Booking> => {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create booking');
    }

    return response.json();
  };

  const getBookingsByUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/bookings/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user bookings');
      }
      return await response.json();
    } catch (err) {
      setError("Failed to fetch user bookings");
      console.error(err);
      throw err;
    }
  };

  const getBookingsByExperience = async (experienceId: string) => {
    try {
      const response = await fetch(`/api/bookings/experience/${experienceId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch experience bookings');
      }
      return await response.json();
    } catch (err) {
      setError("Failed to fetch experience bookings");
      console.error(err);
      throw err;
    }
  };

  const updateBooking = async (id: string, data: BookingUpdateInput) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking');
      }

      return response.json();
    } catch (err) {
      setError("Failed to update booking");
      console.error(err);
      throw err;
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
    } catch (err) {
      setError("Failed to cancel booking");
      console.error(err);
      throw err;
    }
  };

  return {
    experiences,
    loading,
    error,
    fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
    createBooking,
    getBookingsByUser,
    getBookingsByExperience,
    updateBooking,
    cancelBooking,
  };
} 