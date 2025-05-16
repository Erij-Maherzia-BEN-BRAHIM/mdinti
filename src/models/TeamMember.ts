export interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  image: string;
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

export interface TeamMemberCreateInput {
  name: string;
  position: string;
  email: string;
  image: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface TeamMemberUpdateInput {
  name?: string;
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