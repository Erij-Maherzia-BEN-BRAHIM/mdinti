export interface Partner {
  id: string;
  name: string;
  type: string;
  website: string;
  description: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export type PartnerCreateInput = Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>;
export type PartnerUpdateInput = Partial<PartnerCreateInput>; 