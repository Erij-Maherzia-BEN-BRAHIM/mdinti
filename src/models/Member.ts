export interface Member {
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

export interface MemberCreateInput {
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

export interface MemberUpdateInput {
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