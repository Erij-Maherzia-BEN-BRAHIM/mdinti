export type MemberCategory =
  | "Hostels"
  | "Guest Houses"
  | "Hotel"
  | "Librairy"
  | "Restaurant"
  | "Artisans"
  | "others";

export interface Member {
  id: string;
  name: string;
  category: MemberCategory;
  logo: string;
  owner: string;
  email: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberCreateInput {
  name: string;
  category: MemberCategory;
  logo: string;
  owner: string;
  email: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface MemberUpdateInput {
  name?: string;
  category?: MemberCategory;
  logo?: string;
  owner?: string;
  position?: string;
  email?: string;
  image?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
} 