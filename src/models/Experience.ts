export interface Experience {
  id: string;
  title: string;
  description: string;
  images: string[];
  duration?: string;
  schedule?: string;
  pricing?: {
    groupPrice?: number;
    privatePrice?: number;
    minGroupSize?: number;
    maxGroupSize?: number;
  };
  artisan?: {
    name?: string;
    bio?: string;
    image?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ExperienceCreateInput {
  title: string;
  description: string;
  images: string[];
  duration?: string;
  schedule?: string;
  pricing?: {
    groupPrice?: number;
    privatePrice?: number;
    minGroupSize?: number;
    maxGroupSize?: number;
  };
  artisan?: {
    name?: string;
    bio?: string;
    image?: string;
  };
}

export interface ExperienceUpdateInput {
  title?: string;
  description?: string;
  images?: string[];
  duration?: string;
  schedule?: string;
  pricing?: {
    groupPrice?: number;
    privatePrice?: number;
    minGroupSize?: number;
    maxGroupSize?: number;
  };
  artisan?: {
    name?: string;
    bio?: string;
    image?: string;
  };
}

export interface Booking {
  id: string;
  experienceId: string;
  guestInfo: {
    name: string;
    email: string;
    phone: string;
  };
  date: Date;
  time: string;
  numberOfPeople: number;
  isPrivate: boolean;
  totalPrice: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingCreateInput {
  experienceId: string;
  guestInfo: {
    name: string;
    email: string;
    phone: string;
  };
  date: Date;
  time: string;
  numberOfPeople: number;
  isPrivate: boolean;
  totalPrice: number;
  notes?: string;
}

export interface BookingUpdateInput {
  guestInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  date?: Date;
  time?: string;
  numberOfPeople?: number;
  isPrivate?: boolean;
  totalPrice?: number;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
} 