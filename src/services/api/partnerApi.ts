import { Partner, PartnerCreateInput, PartnerUpdateInput } from '@/models/Partner';

const API_BASE_URL = '/api/partners';

export const partnerApi = {
  // Create a new partner
  async createPartner(data: PartnerCreateInput): Promise<Partner> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create partner');
    }

    return response.json();
  },

  // Get all partners
  async getAllPartners(): Promise<Partner[]> {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch partners');
    }

    return response.json();
  },

  // Get a single partner by ID
  async getPartner(id: string): Promise<Partner> {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch partner');
    }

    return response.json();
  },

  // Update a partner
  async updatePartner(id: string, data: PartnerUpdateInput): Promise<Partner> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update partner');
    }

    return response.json();
  },

  // Delete a partner
  async deletePartner(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete partner');
    }
  },
}; 